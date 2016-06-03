/**
 * https://github.com/giscafer/mapshaper-plus
 * 对坐标数据进行加密
 * @author giscafer
 * @version 1.0
 * @date    2016-06-04T01:48:33+0800
 * 参考：https://github.com/ecomfe/echarts/blob/8eeb7e5abe207d0536c62ce1f4ddecc6adfdf85e/src/util/mapData/rawData/encode.js
 */
!(function(name, definition) {
    var hasDefine = typeof define === 'funciton',
        hasExports = typeof module !== 'undefined' && module.exports;
    if (hasDefine) {
        //AMD/CMD
        define(difinition);
    } else if (hasExports) {
        //Node.js
        module.exports = definition();
    } else {
        this[name] = definition();
    }
})('Encoder', function() {
    function Encoder(){}

    Encoder.prototype.convert2Echarts=function(rawStr,fileName,type){
        var results="";
        var json = JSON.parse(rawStr);
        // Meta tag
        json.UTF8Encoding = true;
        var features = json.features;
        if (!features) {
            return;
        }
        features.forEach(function (feature){
            var encodeOffsets = feature.geometry.encodeOffsets = [];
            var coordinates = feature.geometry.coordinates;
            if (feature.geometry.type === 'Polygon') {
                coordinates.forEach(function (coordinate, idx){
                    coordinates[idx] = encodePolygon(
                        coordinate, encodeOffsets[idx] = []
                    );
                });
            } else if(feature.geometry.type === 'MultiPolygon') {
                coordinates.forEach(function (polygon, idx1){
                    encodeOffsets[idx1] = [];
                    polygon.forEach(function (coordinate, idx2) {
                        coordinates[idx1][idx2] = encodePolygon(
                            coordinate, encodeOffsets[idx1][idx2] = []
                        );
                    });
                });
            }
        });
        if(type==='json'){
            results=JSON.stringify(json);
        }else{
            results=addEchartsJsWrapper(JSON.stringify(json),fileName);
        }
        return results;
    };
    function encodePolygon(coordinate, encodeOffsets) {
        var result = '';

        var prevX = quantize(coordinate[0][0]);
        var prevY = quantize(coordinate[0][1]);
        // Store the origin offset
        encodeOffsets[0] = prevX;
        encodeOffsets[1] = prevY;

        for (var i = 0; i < coordinate.length; i++) {
            var point = coordinate[i];
            result+=encode(point[0], prevX);
            result+=encode(point[1], prevY);

            prevX = quantize(point[0]);
            prevY = quantize(point[1]);
        }

        return result;
    }

    function addAMDWrapper(jsonStr) {
        return ['define(function() {',
                    '    return ' + jsonStr + ';',
                '});'].join('\n');
    }

    function addEchartsJsWrapper(jsonStr,fileName) {
        return ['(function (root, factory) {',
                    "   if (typeof define === 'function' && define.amd) {",
                    "       define(['exports', 'echarts'], factory);",
                    "   } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {",
                    "       factory(exports, require('echarts'));",
                    "   } else {",
                    "       factory({}, root.echarts);",
                    "   }",
                    " }(this, function (exports, echarts) {",
                    "       var log = function (msg) {",
                    "           if (typeof console !== 'undefined') {",
                    "               console && console.error && console.error(msg);",
                    "           }",
                    "       }",
                    " if (!echarts) {",
                    "       log('ECharts is not Loaded');",
                    "           return;",
                    "       }",
                    " if (!echarts.registerMap) {",
                    "       log('ECharts Map is not loaded')",
                    "       return;",
                    " }",
                    "  echarts.registerMap('"+fileName+"',"+ jsonStr,
                '  )}));'].join('\n');
    }

    function encode(val, prev){
        // Quantization
        val = quantize(val);
        // var tmp = val;
        // Delta
        val = val - prev;

        if (((val << 1) ^ (val >> 15)) + 64 === 8232) { 
            //WTF, 8232 will get syntax error in js code
            val--;
        }
        // ZigZag
        val = (val << 1) ^ (val >> 15);
        // add offset and get unicode
        return String.fromCharCode(val+64);
        // var tmp = {'tmp' : str};
        // try{
        //     eval("(" + JSON.stringify(tmp) + ")");
        // }catch(e) {
        //     console.log(val + 64);
        // }
    }

    function quantize(val) {
        return Math.ceil(val * 1024);
    }
    return new Encoder();
});

