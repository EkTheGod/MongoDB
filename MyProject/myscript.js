    
    $.ajax({ 
        url: '/datacount',
        type: 'GET',
        success: function (result) { 
            var record = result;
            var currentPage = 0;
            var DataPerPage = 5;
            var NumberOfPages  = Math.ceil( record / DataPerPage);
            var body ;

            getdata( DataPerPage , currentPage );

            $('table.myTable').each(function() { //เรียก class
                        
                var $table = $(this);


                $table.trigger('createPaging');
                var $pager = $('<div class="pager" align="center" ></div>');

                for (var page = 0; page < NumberOfPages; page++) {
                    $('<span class="page-number" ></span>').text(page + 1).bind('click', {
                        Page: page
                    },  function(event) {
                            currentPage = event.data['Page'];
                            getdata( DataPerPage , currentPage );
                            $table.trigger('createPaging');
                            $(this).addClass('active').siblings().removeClass('active');
                        }).appendTo($pager).addClass('clickable');
                    }
                $pager.insertAfter($table).find('span.page-number:first').addClass('active');
            });//end table.myTable                      
        }// datacount success
    });//end datacount

    function getdata( DataPerPage,currentPage ){
        $.ajax({ 
            url: '/senddata',
            type: 'GET',
            data: { dpp : DataPerPage , cp : currentPage },
            success: function (result) {
                printdata(result);
            }//senddata success
        });//end senddata 
    }

    function printdata( data ){
        $("#myTable tbody").remove();
        body = '<tbody>';
        $.each(data, function(key, val) {
            body += '<tr><td align="center" width="100">' + val.Book_ID +'</td><td align="center" width="150">'+ val.Book_Name +'</td><td align="center" width="100">'+ val.Date +'</td></tr>';
        }); 
        body += '</tbody>';
        $("#myTable").append(body);   
    }               
    