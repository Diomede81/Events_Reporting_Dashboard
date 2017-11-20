

/*d3.queue()
    .defer(d3.json,'/getdata/mozambique')
    .await(test);

function test(error,data){



    console.log(data);

    data.forEach(function(d){
        d.Year = d3.time.year(d.Year)

    });

    var dataset = crossfilter(data);

    var years = dataset.dimension(function(d){

        return  d['Value']
    });

    console.log(years);

    var min = d3.min(years);

    var max = d3.max(years);

    console.log(max);

    var povertygroup = years.group();

    console.log(povertygroup);

    var povertyLevelChart = dc.barChart("#poverty-level-row-chart");


    povertyLevelChart
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(800)
        .height(400)
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .dimension(years)
        .group(povertygroup)
        .elasticY(true)
        .x(d3.scale.linear().domain([min, max]));

    dc.renderAll()

}*/
queue()
    .defer(d3.json, "/statistics")
    .await(makeGraphs);

function makeGraphs(error, data) {
    console.log(data);
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    //Clean donorsUSProjects data
    var dateFormat = d3.time.format("%Y-%m-%d %H:%M");
    data.forEach(function (d) {
             d.date = dateFormat.parse(d.date);
             d.date.setDate(1);
             d.date.setHours(11)
    });

    console.log(data);

    //Create a Crossfilter instance
    var ndx = crossfilter(data);



    //Define Dimensions
    var dateDim = ndx.dimension(function (d) {

        return d["date"];

    });

    console.log(dateDim);
    var platformTypeDim = ndx.dimension(function (d) {
        return d["platform"];
    });

    console.log(platformTypeDim);
    var deviceTypeDim = ndx.dimension(function (d) {
        return d["device"];
    });

    maxDate = dateDim.top(1)[0]['date'];
    minDate = dateDim.bottom(1)[0]['date'];


    //Calculate metrics
    var totalVisitors = dateDim.group();
    console.log(totalVisitors);

    var visitorsByPlatform = platformTypeDim.group();



    console.log(visitorsByPlatform);

    var visitorsByDevice = deviceTypeDim.group();

    /*var countyGroup = countryDim.group();
    var valueGroup = figuresDim.group();
    console.log(valueGroup);*/


    var all = ndx.groupAll();

    //Define values (to be used in charts)


    //Charts
    var timeChart = dc.lineChart("#time-chart");
    var pieChart = dc.pieChart("#pie-chart");
    /*var numberProjectsND = dc.numberDisplay("#number-projects-nd");
    var selectField = dc.selectMenu('#menu-select');
    var selectField2 = dc.selectMenu('#menu-select2');*/


    /*selectField
        .dimension(resourceTypeDim)
        .group(indicatorGroup);

    selectField2
        .dimension(countryDim)
        .group(countyGroup);

    numberProjectsND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(all);*/


    timeChart
        .ordinalColors(["#C96A23"])
        .width(1200)
        .height(300)
        .margins({top: 30, right: 50, bottom: 30, left: 50})
        .dimension(dateDim)
        .group(totalVisitors)
        .renderArea(true)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .xAxisLabel("Year")
        .elasticX(true)
        .yAxis().ticks(6);

    console.log(data.length);

    pieChart
        .width(300)
        .height(300)
        .radius(150)
        .dimension(platformTypeDim)
        .group(visitorsByPlatform)
        .label(function(d){

            var label = d.key;

         return label + "(" + Math.ceil((d.value/data.length) * 100) + '%)'

        })
        .innerRadius(40)
        .transitionDuration(500)
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .colorDomain([-1750, 1644])
        .colorAccessor(function(d,i){return d.value;});


    /*resourceTypeChart
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(300)
        .height(250)
        .dimension(resourceTypeDim)
        .group(numProjectsByResourceType)
        .xAxis().ticks(4);

    povertyLevelChart
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(300)
        .height(250)
        .dimension(povertyLevelDim)
        .group(numProjectsByPovertyLevel)
        .xAxis().ticks(4);

    fundingStatusChart
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .height(220)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(fundingStatus)
        .group(numProjectsByFundingStatus);*/


    dc.renderAll();
}

