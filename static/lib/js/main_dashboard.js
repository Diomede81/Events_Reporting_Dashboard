console.log(window.navigator.vendor);
var startdate;
var endDate;
var dateStartSet = sessionStorage.getItem('startDate');
var dateEndSet = sessionStorage.getItem('endDate');
var dataGlobal;

if(dateStartSet === null){

    startdate = Date.today().add(-6).months().toString('yyyy-M-d');
    endDate = Date.today().toString('yyyy-M-d')

} else{
     startdate = dateStartSet;
    endDate = dateEndSet;
}

function loadData(pieWidth,pieHeight,pieRadius,legendX,legendY,pieInnerRadius,width,height){

d3.queue()
    .defer(d3.json, "/statistics" + "?startDate=" + startdate + "&endDate=" + endDate )
    .await(function(error,data){
        cleanData(error,data);
    });

function cleanData(error,data){
    console.log(data);
    if (error) {
        console.error("There have been an error", error.statusText);
        $('#loader-overlay').hide();
        throw error;
    }

    array = [data[0].sitevisits,data[0].eventvisits,data[0].support,data[0].ratings];

    var dateFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");

    array.forEach(function(e){

        e.forEach(function (d) {

           if (d.date === null || d.date === undefined) {
                return null

            } else{
                d.date = dateFormat.parse(d.date);
                d.date.setDate(1);
                d.date.setHours(1);
            }
        })
    });
    $('#loader-overlay').hide();

    dataGlobal = data;

    loadGraphs(data,pieWidth,pieHeight,pieRadius,legendX,legendY,pieInnerRadius,width,height)
}
}



var pieWidth;
var pieHeight;
var pieRadius;
var legendX;
var legendY;
var pieInnerRadius;
var width;
var height;

function loadGraphs(data,pieWidth,pieHeight,pieRadius,legendX,legendY,pieInnerRadius,width,height){
    siteVisitsGraphs(data[0].sitevisits,pieWidth,pieHeight,pieRadius,legendX,legendY,pieInnerRadius,width,height);
    eventVisitsGraphs(data[0].eventvisits,pieWidth,pieHeight,pieRadius,legendX,legendY,pieInnerRadius,width,height);
    supportGraphs(data[0].support,pieWidth,pieHeight,pieRadius,legendX,legendY,pieInnerRadius,width,height);
    ratingsGraphs(data[0].ratings,pieWidth,pieHeight,pieRadius,legendX,legendY,pieInnerRadius,width,height);
    $('#loader-overlay').hide();
}


   if (window.innerWidth > 1200){

        width = (window.innerWidth * 80) / 100;
        height = (window.innerHeight * 50) / 100;

    } else{

        width = (window.innerWidth * 70) / 100;
        height = (window.innerHeight * 50) / 100;
    }



if (window.innerWidth > 1900){
   pieWidth = 700;
   pieHeight = 400;
   pieRadius = 200;
   legendX = 580;
   legendY = 159;
   pieInnerRadius = 40;
   }
   else if (window.innerWidth > 1300){
   pieWidth = 600;
   pieHeight = 400;
   pieRadius = 170;
   legendX = 480;
   legendY = 159;
   pieInnerRadius = 30;
} else{
    pieWidth = 500;
   pieHeight = 300;
   pieRadius = 150;
   legendX = 0;
   legendY = 159;
   pieInnerRadius = 10;
}

loadData(pieWidth,pieHeight,pieRadius,legendX,legendY,pieInnerRadius,width,height);

window.onresize = function(){
    /*Variables and statements responsible for graphs adaptive size based on browser window */

    if (window.innerWidth > 1300){

        width = (window.innerWidth * 80) / 100;
        height = (window.innerHeight * 50) / 100;

    } else{

        width = (window.innerWidth * 60) / 100;
        height = (window.innerHeight * 50) / 100;
    }




if (window.innerWidth > 1900){
   pieWidth = 700;
   pieHeight = 400;
   pieRadius = 200;
   legendX = 580;
   legendY = 159;
   pieInnerRadius = 40;
   }
   else if (window.innerWidth > 1300){
   pieWidth = 600;
   pieHeight = 400;
   pieRadius = 170;
   legendX = 480;
   legendY = 159;
   pieInnerRadius = 30;
} else{
    pieWidth = 500;
   pieHeight = 300;
   pieRadius = 150;
   legendX = 0;
   legendY = 159;
   pieInnerRadius = 10;
}
    $('#loader-overlay').show();
    loadGraphs(dataGlobal,pieWidth,pieHeight,pieRadius,legendX,legendY,pieInnerRadius,width,height);
};


/* Function responsible to handle graph related to Total amount of Site Visits*/

function siteVisitsGraphs(data, pieWidth,pieHeight,pieRadius,legendX,legendY,pieInnerRadius,width,height) {
    timeNow = new Date().getTime();

    var visitors = crossfilter(data);

    var visitorsDim = visitors.dimension(function (d) {
           return d.date

    });

    var platformTypeDim = visitors.dimension(function (d) {
           return d.platform
    });

    var deviceTypeDim = visitors.dimension(function (d) {

           return d.device

    });




    // variables that specify earliest and latest dates to utilize in timeline graph

    maxDate = visitorsDim.top(1)[0];
    minDate = visitorsDim.bottom(1)[0];

    //Group dimensions

    var totalVisitors = visitorsDim.group();

    var visitorsByPlatform = platformTypeDim.group();

    var visitorsByDevice = deviceTypeDim.group();

    var all = visitors.groupAll();


    //Charts
    var timelineChart = dc.lineChart("#time-chart");
    var pieChartPlatform = dc.pieChart("#pie-chart");
    var pieChartDevice = dc.pieChart('#pie-chart-devices');
    var visitorsCount = dc.dataCount('.dc-data-count');



    timelineChart
        .ordinalColors(["#C96A23"])
        .width(width)
        .height(height)
        .margins({top: 30, right: 50, bottom: 30, left: 50})
        .dimension(visitorsDim)
        .group(totalVisitors)
        .renderArea(true)
        .transitionDuration(500)
        .x(d3.time.scale().domain([maxDate, minDate]))
        .elasticY(true)
        .xAxisLabel("Months")
        .elasticX(true)
        .yAxis().ticks(6);


    pieChartPlatform
        .width(pieWidth)
        .height(pieHeight)
        .radius(pieRadius)
        .dimension(platformTypeDim)
        .group(visitorsByPlatform)
        .label(function(d){

         return platformLabel(d,visitorsByPlatform);
        })
        .innerRadius(pieInnerRadius)
        .transitionDuration(500)
        .ordinalColors(["#185A36", "#C1A780", "#C92223"])
        .colorDomain([-1750, 1644])
        .colorAccessor(function(d,i){return d.value;})
        .legend(dc.legend().x(legendX).y(legendY).itemHeight(20).gap(5).legendText(function(d){return platformLegend(d);}));


    pieChartDevice
        .width(pieWidth)
        .height(pieHeight)
        .radius(pieRadius)
        .dimension(deviceTypeDim)
        .group(visitorsByDevice)
        .label(function(d){

         return deviceLabel(d,visitorsByDevice);


        })
        .innerRadius(pieInnerRadius)
        .transitionDuration(500)
        .ordinalColors(["#185A36", "#C1A780", "#C92223"])
        .colorDomain([-1750, 1644])
        .colorAccessor(function(d,i){return d.value;})
        .legend(dc.legend().x(legendX).y(legendY).itemHeight(20).gap(5).legendText(function(d){return deviceLegend(d)}));

    visitorsCount
        .dimension(visitors)
        .group(all)
        .html ({some: "%filter-count for the range selected <a class='btn btn-default btn-xs' href='javascript:dc.filterAll(); dc.renderAll();'  role='button'>Reset filters</a>", all: "%total-count Total Site Visits"});


    dc.renderAll();

}



/*Function Responsible to handle graph related to amount of visits specific to Webcast Events*/

function eventVisitsGraphs(data,pieWidth,pieHeight,pieRadius,legendX,legendY,pieInnerRadius,width,height){

    var ndx = crossfilter(data);

       //Define Dimensions
    var visitorsDim = ndx.dimension(function (d) {

        return d.date;

    });

    var platformTypeDim = ndx.dimension(function (d) {
        return d.platform;
    });

    var deviceTypeDim = ndx.dimension(function (d) {
        return d.device;
    });

    var webcastDim = ndx.dimension(function(d){
        return d['event_title'];
    });

    // variables that specify earliest and latest dates to utilize in Timeline graph

    maxDate = visitorsDim.top(1)[0][1];
    minDate = visitorsDim.bottom(1)[0][1];

    //Calculate metrics
    var totalVisitors = visitorsDim.group();

    var visitorsByPlatform = platformTypeDim.group();

    var visitorsByDevice = deviceTypeDim.group();

    var webcastGroup = webcastDim.group();


    var all = ndx.groupAll();


    //Charts
    var timelineChart = dc.lineChart("#events-time-chart");
    var pieChartPlatform = dc.pieChart("#events-pie-chart");
    var pieChartDevice = dc.pieChart('#events-pie-chart-devices');
    var visitorsCount = dc.dataCount('.events-dc-data-count');
    var selectMenu = dc.selectMenu('#menu-select');
    var rowChart = dc.rowChart('#events-type-row-chart');


    selectMenu
        .dimension(webcastDim)
        .group(webcastGroup);

    timelineChart
        .ordinalColors(["#185A36", "#C1A780", "#C92223"])
        .width(width)
        .height(400)
        .margins({top: 30, right: 50, bottom: 30, left: 50})
        .dimension(visitorsDim)
        .group(totalVisitors)
        .renderArea(true)
        .transitionDuration(500)
        .x(d3.time.scale().domain([maxDate, minDate]))
        .elasticY(true)
        .xAxisLabel("2017")
        .elasticX(true)
        .yAxis().ticks(6);


    pieChartPlatform
        .width(pieWidth)
        .height(pieHeight)
        .radius(pieRadius)
        .dimension(platformTypeDim)
        .group(visitorsByPlatform)
        .label(function(d){

         return platformLabel(d,visitorsByPlatform);
        })
        .innerRadius(pieInnerRadius)
        .transitionDuration(500)
        .ordinalColors(["#185A36", "#C1A780", "#C92223"])
        .colorDomain([-1750, 1644])
        .colorAccessor(function(d,i){return d.value;})
        .legend(dc.legend().x(legendX).y(legendY).itemHeight(20).gap(5).legendText(function(d){return platformLegend(d);}));


    pieChartDevice
        .width(pieWidth)
        .height(pieHeight)
        .radius(pieRadius)
        .dimension(deviceTypeDim)
        .group(visitorsByDevice)
        .label(function(d){

         return deviceLabel(d,visitorsByDevice);


        })
        .innerRadius(pieInnerRadius)
        .transitionDuration(500)
        .ordinalColors(["#185A36", "#C1A780", "#C92223"])
        .colorDomain([-1750, 1644])
        .colorAccessor(function(d,i){return d.value;})
        .legend(dc.legend().x(legendX).y(legendY).itemHeight(20).gap(5).legendText(function(d){return deviceLegend(d)}));

    rowChart
        .ordinalColors(["#185A36", "#C1A780", "#C92223"])
        .width(width)
        .height(height)
        .dimension(webcastDim)
        .group(webcastGroup)
        .xAxis().ticks(5);

    visitorsCount
        .dimension(ndx)
        .group(all)
        .html ({some: "%filter-count Visitors for the Event Selected <a class='btn btn-default btn-xs' href='javascript:dc.filterAll(); dc.renderAll();'  role='button'>Reset filters</a>", all: "%total-count Total Events Visits"});


    /* The below line of code prevent users to click on the rowChart graph as such element is needed to visually compare
    Webcast visits to each other and they are not related to the rest of the content
     */

    rowChart.onClick = function(){};

dc.renderAll();

}

/*The below function is responsible for the handling of graph related to support requests sent from a specific webcast*/

function supportGraphs(data,pieWidth,pieHeight,pieRadius,legendX,legendY,pieInnerRadius,width,height){

    var ndx = crossfilter(data);

       //Define Dimensions
    var dateDim = ndx.dimension(function (d) {

        return d['date'];

    });

    var platformTypeDim = ndx.dimension(function (d) {
        return d['platform'];
    });

    var deviceTypeDim = ndx.dimension(function (d) {
        return d['device'];
    });

    var webcastDim = ndx.dimension(function(d){
        return d['event_title'];
    });

    var issueTypeDim = ndx.dimension(function(d){
        return d['issue_type'];
    });

    maxDate = dateDim.top(1)[0][1];
    minDate = dateDim.bottom(1)[0][1];

    var totalVisitors = dateDim.group();

    var visitorsByPlatform = platformTypeDim.group();

    var visitorsByDevice = deviceTypeDim.group();

    var webcastGroup = webcastDim.group();

    var issueTypeGroup = issueTypeDim.group();


    var all = ndx.groupAll();

    //Charts
    var timeChart = dc.lineChart("#support-time-chart");
    var pieChart = dc.pieChart("#support-pie-chart");
    var pieChartDevice = dc.pieChart('#support-pie-chart-devices');
    var pieChartSupportType = dc.pieChart('#support-pie-chart-issueType');
    var visitorsCount = dc.dataCount('.support-dc-data-count');
    var selectMenu = dc.selectMenu('#support-menu-select');
    var rowChart = dc.rowChart('#support-type-row-chart');


    selectMenu
        .dimension(webcastDim)
        .group(webcastGroup);


    timeChart
        .ordinalColors(["#185A36", "#C1A780", "#C92223"])
        .width(width)
        .height(400)
        .margins({top: 30, right: 50, bottom: 30, left: 50})
        .dimension(dateDim)
        .group(totalVisitors)
        .renderArea(true)
        .transitionDuration(500)
        .x(d3.time.scale().domain([maxDate, minDate]))
        .elasticY(true)
        .xAxisLabel("2017")
        .elasticX(true)
        .yAxis().ticks(6);



    pieChart
        .width((pieWidth*60)/100)
        .height(pieHeight)
        .radius(pieRadius)
        .dimension(platformTypeDim)
        .group(visitorsByDevice)
        .label(function(d){

            var label = d.key;

            var sum=getTotal(visitorsByDevice.all());

            if(label === 'Linux armv8l'){
                return 'Mobile' + "(" + Math.ceil((d.value/sum) * 100) + '%)'
            }

            else{
                return label + "(" + Math.ceil((d.value/sum) * 100) + '%)'
            }
        })
        .innerRadius(pieInnerRadius)
        .transitionDuration(500)
        .ordinalColors(["#185A36", "#C1A780", "#C92223"])
        .colorDomain([-1750, 1644])
        .colorAccessor(function(d,i){return d.value;});


    pieChartDevice
        .width((pieWidth*60)/100)
        .height(pieHeight)
        .radius(pieRadius)
        .dimension(deviceTypeDim)
        .group(visitorsByPlatform)
        .label(function(d){

            var label = d.key;

            var sum = getTotal(visitorsByPlatform.all());

            if(label.includes('Android') === true){

                return 'Mobile' + "(" + Math.ceil((d.value/sum) * 100) + '%)'

            }

            else if (label.includes('Trident')){

                return 'IE/EDGE' + "(" + Math.ceil((d.value/sum) * 100) + '%)'

            }

            else if(label.includes('Firefox')){
                return 'FIREFOX' + "(" + Math.ceil((d.value/sum) * 100) + '%)'
            }

            else if(label.includes('Chrome')){

                return 'Chrome' + "(" + Math.ceil((d.value/sum) * 100) + '%)'
            }

            else{
                return 'Other' + "(" + Math.ceil((d.value/sum) * 100) + '%)'
            }

        })
        .innerRadius(pieInnerRadius)
        .transitionDuration(500)
        .ordinalColors(["#185A36", "#C1A780", "#C92223"])
        .colorDomain([-1750, 1644])
        .colorAccessor(function(d,i){return d.value;});

    pieChartSupportType
        .width((pieWidth*60)/100)
        .height(pieHeight)
        .radius(pieRadius)
        .dimension(issueTypeDim)
        .group(issueTypeGroup)
        .label(function(d){

            var sum = getTotal(issueTypeGroup.all());

            if(d.key === 'User Interface Problem'){



           return 'UI PROBLEM' + "(" + Math.ceil((d.value/sum) * 100) + '%)';

            }
            else{

           return d.key + "(" + Math.ceil((d.value/sum) * 100) + '%)';
            }

        })
        .innerRadius(pieInnerRadius)
        .transitionDuration(500)
        .ordinalColors(["#185A36", "#C1A780", "#C92223"])
        .colorDomain([-1750, 1644])
        .colorAccessor(function(d,i){return d.value;});

    rowChart
        .ordinalColors(["#185A36", "#C1A780", "#C92223"])
        .width(width)
        .height(350)
        .dimension(webcastDim)
        .group(webcastGroup)
        .xAxis().ticks(5);

    visitorsCount
        .dimension(ndx)
        .group(all)
        .html ({some: "%filter-count Support Requests <a class='btn btn-default btn-xs' href='javascript:dc.filterAll(); dc.renderAll();'  role='button'>Reset filters</a>", all: "%total-count Total Support Requests"});


dc.renderAll();

 /* The below line of code prevent users to click on the rowChart graph as such element is needed to visually compare
    amount of Support Requests per Webcast Event and they are not directly related to the rest of the data within the page
     */

rowChart.onClick = function(){};

}


/* The below function is responsbile for the graphs that calculate the ratings score for each webcast and
comparison between single webcasts events
 */

function ratingsGraphs(data,pieWidth,pieHeight,pieRadius,legendX,legendY,pieInnerRadius,width,height){

    var ndx = crossfilter(data);


    var ratingsDim = ndx.dimension(function (d) {
        return d.rating;
    });

    var ratingsValue = ndx.dimension(function (d) {
        return d.rating;
    });

    var webcastDimension = ndx.dimension(function(d){
        return d['event_title'];
    });

    var totalRatings = ratingsDim.group();

    var ratingsValueGroup = ratingsValue.group();

    var totalRatingsGroup = ratingsValueGroup.reduceSum(function(d){return d['rating']});

    var webcastGroup = webcastDimension.group();


    var all = ndx.groupAll();

    //Charts

    var pieChart = dc.pieChart("#ratings-pie-chart");
    var visitorsCount = dc.dataCount('.ratings-dc-data-count');
    var rowChart = dc.rowChart('#ratings-type-row-chart');
    var ratingsSelect = dc.selectMenu('#ratings-menu-select');
    var ratingsTotal = dc.numberDisplay('#ratings-header');

    pieChart
        .width(pieWidth)
        .height(pieHeight)
        .radius(pieRadius)
        .dimension(ratingsDim)
        .group(totalRatings)
        .label(function(d){

             var sum = getTotal(totalRatings.all());

                return Math.ceil((d.value/sum) * 100) + '%'


        })
        .innerRadius(pieInnerRadius)
        .transitionDuration(500)
        .ordinalColors(["#185A36", "#C1A780", "#C92223"])
        .colorDomain([0, 1644])
        .colorAccessor(function(d,i){return d.value;})
        .legend(dc.legend().x(legendX).y((legendY * 130)/100).itemHeight(20).gap(5).legendText(function(d){

                return d.name + " Stars";
            }));


    ratingsSelect
        .dimension(webcastDimension)
        .group(webcastGroup);

    rowChart
        .ordinalColors(["#185A36", "#C1A780", "#C92223"])
        .width(width)
        .height(350)
        .dimension(webcastDimension)
        .group(webcastGroup)
        .xAxis().ticks(5);

    visitorsCount
        .dimension(ndx)
        .group(all)
        .html ({some: "%filter-count Ratings for this Event <a class='btn btn-default btn-xs' href='javascript:dc.filterAll(); dc.renderAll();'  role='button'>Reset filters</a>", all: "%total-count Total Ratings"});

    ratingsTotal
        .dimension(ratingsDim)
        .group(totalRatingsGroup)

        .html({
            one: 'The Total rating is %number' ,
            some:'Score: %number <span class="glyphicon glyphicon-star"></span>',
            none : 0
        })
        .valueAccessor(function(d){
            return getTotal(totalRatingsGroup.all())/getTotal(totalRatings.all())
        });

     /* The below lines of code prevent users to click on the rowChart and pieChart graphs as such elements are needed to visually compare
    amount of ratings and scores per Webcast Event and they are not directly related to the rest of the data within the page
     */

    pieChart.onClick = function(){};

    rowChart.onClick = function(){};

dc.renderAll();

}






