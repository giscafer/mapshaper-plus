# mapshaper-plus

Generate geojson files for [Apache ECharts (incubating)](https://github.com/apache/incubator-echarts) Map,base on mapshaper

基于[mapshaper](https://github.com/mbloch/mapshaper)对geojson地图数据的坐标信息进行压缩编码，并提供可直接生成压缩编码后的echarts map数据格式

通过`mapshaper-plus`可以直接将`shp`格式数据转换为压缩后的echarts数据

## Demo

https://giscafer.github.io/mapshaper-plus/

## Description

**介绍** ——[mapshaper](https://github.com/mbloch/mapshaper)可以将多种数据格式（Shapefile, GeoJSON, TopoJSON
和 Zip files）导入后，对地图的编辑和导出（Shapefile, GeoJSON, TopoJSON, DSV, SVG），功能强大和简单易用。

`mapshaper-plus`是在`mapshaper`基础上拓展对地图坐标信息的压缩编码，很大程度上减小了文件的代码行数和字节大小：譬如一个贵州省的数据，原始的`geojson`数据会在`30M`左右，但在对坐标信息压缩编码后，仅为`1.4M`。

**背景** ——在做echarts图表统计时，需要自制地图数据，但官方没有提供一个平台可以直接将`shp文件`转化为压缩后的`json`或`js`格式的地图文件，而`mapshaper`导出的json数据没有压缩，数据量过大。

使用可以访问[mapshaper-plus在线demo](http://giscafer.github.io/mapshaper-plus/)

## Screenshot

![导出压缩版的数据](https://raw.githubusercontent.com/giscafer/mapshaper-plus/master/images/echarts01.png)

## License

mapshaper is licensed under MPL 2.0. and mapshaper-plus is licensed under MIT.

> Blog [giscafer.com](http://giscafer.com) &nbsp;&middot;&nbsp;
> GitHub [@giscafer](https://github.com/giscafer) &nbsp;&middot;&nbsp;
> Weibo [@Nickbing Lao](https://weibo.com/laohoubin)

