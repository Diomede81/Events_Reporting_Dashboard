
// function to obtain totals included in an array of elements in order to enable graphs label related calculation
function getTotal(dataArray){

var total = 0;

dataArray.forEach(function(e){

    total += e.value;

});

return total
}

// variable that dictates relative full width of time graphs

var width = document.getElementById('graphContainer').offsetWidth - 100;

//function that enable re-utilization of same routine for multiple graphs within the application

function platformLegend(d){

    var label = d.name;

            if(label.includes('Linux armv8l') === true){

                return 'Android'
            }

            else if(label.includes('Linux')){

                return 'LINUX'
            }

            else if(label.includes('Win32')){

                return 'Windows'

            }

            else if(label.includes('MacIntel')){

                return 'Mac'
            }

            else {
                return d.name;
            }
}

//function that enable re-utilization of same routine for multiple graphs within the application

function deviceLegend(d){
            var label = d.name;

            if(label.includes('Android') === true){

                return 'Mobile'

            }

            else if (label.includes('Trident')){

                return 'IE/EDGE'

            }

            else if(label.includes('Firefox')){
                return 'FIREFOX'
            }

            else if(label.includes('Chrome') === true) {

                return 'Chrome'
            }

            else{
                return 'Other'
            }
}

//function that enable re-utilization of same routine for multiple graphs within the application

function platformLabel(d,elementsArray){
       var label = d.key;
            var sum = getTotal(elementsArray.all());

            if(label === 'Linux armv8l'){
                return  Math.ceil((d.value/sum) * 100) + '%'
            }

            else{
                return  Math.ceil((d.value/sum) * 100) + '%'
            }

}

//function that enable re-utilization of same routine for multiple graphs within the application

function deviceLabel(d,elementArray){
       var label = d.key;
            var sum = getTotal(elementArray.all());

            if(label.includes('Android') === true){

                return  Math.ceil((d.value/sum) * 100) + '%'
            }
            else if (label.includes('Trident')){

                return  Math.ceil((d.value/sum) * 100) + '%'
            }
            else if(label.includes('Firefox')){
                return  Math.ceil((d.value/sum) * 100) + '%'
            }
            else {

                return  Math.ceil((d.value/sum) * 100) + '%'
            }
}