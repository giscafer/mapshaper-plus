# mapshaper-plus
基于[mapshaper](https://github.com/mbloch/mapshaper)对geojson地图数据的坐标信息进行压缩编码，并提供可直接生成压缩编码后的echarts map数据格式


## Demo

http://giscafer.com/mapshaper-plus/

## Description

[mapshaper](https://github.com/mbloch/mapshaper)可以将多种数据格式（Shapefile, GeoJSON, TopoJSON
和 Zip files）的导入，对地图的编辑和导出（Shapefile, GeoJSON, TopoJSON, DSV, SVG），功能强大和简单易用。

本程序是在其基础上拓展了地图坐标信息的压缩编码，很大程度上节省文件代码空间和大小；譬如一个贵州省的数据，原始的`geojson`数据会在`30M`左右，在对坐标信息压缩编码后，就变仅有`1.4M`。

本demo是在做echarts图表时，官方没有提供一个平台可以直接将`shp文件`转化为压缩后的`json`或`js`格式的地图文件，个人需要更新地图数据使用而开发。

## Screenshot

![导出压缩版的数据](https://raw.githubusercontent.com/giscafer/mapshaper-plus/master/images/echarts01.png)

## License

mapshaper is licensed under MPL 2.0.



