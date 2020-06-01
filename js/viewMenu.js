$(document).ready(function(){

        var auth_decode = JSON.parse(atob(sessionStorage.getItem("authorization").split(".")[1]));
        var res_id = auth_decode['sub'];
        var url = 'http://bhojan.dekhlo.online:8080/api/v1/menu/' + res_id
        $.ajax({
            url:url,
            type:"GET",
            contentType:"application/json; charset=utf-8",
            statusCode :{
                200: function() {
                console.log("Menu Fetched");
                },
                401: function() {
                alert("Please enter correct username and password! ")
                }

            },
            success: function(data, textStatus, jqXHR)
            {
                var table_row = "<tr><th>S.No.</th><th>Category</th><th>Item Name</th><th>Item Price</th></tr>";
                var allItems = []

                function singleItemOfCategory(item , index){
                    individualItem = [];
                    individualItem.push(item.name);
                    individualItem.push(item.price);
                    return individualItem;   
                }

                function singleItem(item , index){
                    if(item.items.length === 0){
                    
                    }
                    else{
                        var ind = item.items.map(singleItemOfCategory);
                        ind.forEach(function addCat(a){
                            a.push(item.name);
                        })
                        allItems.push(ind);
                    }
                }

                data.forEach(singleItem)
                var m = 1;

                for(var i = 0; i < allItems.length; i++){
                    for(var j=0 ; j< allItems[i].length; j++){
                        table_row += 
                        '<tr>'+
                            '<td>'+ m++ +'</td>'+
                            '<td>'+allItems[i][j][2]+'</td>'+
                            '<td>'+allItems[i][j][0]+'</td>'+
                            '<td>'+allItems[i][j][1]+'</td>'+
                        '</tr>';
                    }
                  }
                
                document.getElementById('menu-items').innerHTML = table_row;
            },
            error: function (e)
            {
                console.log(e);
            }
        });

});