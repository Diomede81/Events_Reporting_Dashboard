
$(document).ready(function(){
    $(function () {
        $('#datetimepicker6').datetimepicker();
        $('#datetimepicker6').data("DateTimePicker").format('DD-MM-YYYY');

        $('#datetimepicker7').datetimepicker({
            useCurrent: false //Important! See issue #1075
        });
        $('#datetimepicker7').data("DateTimePicker").format('DD-MM-YYYY');
        $("#datetimepicker6").on("dp.change", function (e) {
            $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
        });
        $("#datetimepicker7").on("dp.change", function (e) {
            $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
        });
    });
    });




function validateDate(start,end){

        re = '^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$';

        if(start.match(re) && end.match(re)){

            alert('correct');

            return true

        }else{
            alert('incorrect');
            return false
        }

    }

$('#submit-dates').on('click',function(e){

     e.preventDefault();

        var formatDate = $('#startDate').val();

        var formatDateEnd = $('#endDate').val();

        if (validateDate(formatDate,formatDateEnd)){

            var formattedStart = formatDate.split("-");

        var formattedEnd = formatDateEnd.split("-");

        function format(date){

            var swap;

            swap = date[0];

            date[0]=date[2];
            date[2] = swap;

            return date.join('-');
        }

        var sQLdateStart = format(formattedStart);
        var sQLdateEnd = format(formattedEnd);

        sessionStorage.setItem('startDate',sQLdateStart);
        sessionStorage.setItem('endDate',sQLdateEnd);

        }

        window.location = '/dashboard'

});
