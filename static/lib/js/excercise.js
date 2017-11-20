var myData = [ 10, 15, 20, 30, 45, 50, 40, 45 ,50 , 40 ];

var svgWidth = 500;
var svgHeight = 300;
var spacing= 2;

var svg = d3.select("body")
    .append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight);

var g = svg.append("g");


g.selectAll("rect")
    .data(myData)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 0)
    .attr("height", 0)

    .attr("x",function(d,i){
        return i * (svgWidth / myData.length);
    })
    .attr("y",function(d){return svgHeight - d * 5 })
    .attr("width",(svgWidth / myData.length) - spacing)
    .transition().duration(5000)
    .attr("height",function(d){return d* 5})
    .attr('fill',"blue");