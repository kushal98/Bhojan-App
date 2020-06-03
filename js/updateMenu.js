$(document).ready(function(){

    // function checkLogin() {
    //     if(!sessionStorage.getItem("authorization")){
    //         window.location.pathname = "Catalog-App/index.html";
    //     }
    //  }
  
    // checkLogin();

    $("#logout").click(function(e){
        e.preventDefault();
        sessionStorage.removeItem("authorization");
        sessionStorage.clear();
        window.location.pathname = "Bhojan-App/index.html";
     });

    var cat = [];
    var items = [];
    var menu = "";

    $('#updateCategory').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        document.getElementById("updateItem").style.display = "none";
        document.getElementById("updateCategory").disabled = true;
        document.getElementById("update-menu").style.display = "";

        var elem = `   
        <form class="form-add-category" id="update_cat_form"  style="align-items:center" >
            <h3 class="head">Update Category </h3>
            <br/>
            <label for="selectCat" class="">Select Old Category</label>
            <input type="text" name="category" list="selectCategoryList" id="selectCategory" class="form-control" placeholder=" Select Category" required>
                <datalist id="selectCategoryList">
                </datalist>
            <label for="AddCategory" class="">New Category Name</label>
            <input type="text" name="category" id="updateCategoryInput" class="form-control" placeholder="Category Name" required>
            <br />
            <button id = "submitUpdateCategory" class="btn btn-lg btn-primary btn-block" type="submit" style="margin-top: 10px;">Submit</button>
        </form>
        `;

        document.getElementById('update-menu-edit').innerHTML = elem;

        if(navigator.onLine){
            var auth_decode = JSON.parse(atob(sessionStorage.getItem("authorization").split(".")[1]));
            var res_id = auth_decode['sub'];
            var url = 'https://bhojan.dekhlo.online:8080/api/v1/menu/' + res_id;
            $.ajax({
                url:url,
                type:"GET",
                beforeSend: function(xhr){
                        xhr.setRequestHeader('authorization', sessionStorage.getItem("authorization"));
                },
                statusCode :{
                    200: function() {
                        console.log("success");
                    },
                    401: function() {
                        window.location.pathname = "Bhojan-App/index.html";
                        sessionStorage.clear();
                    },
                    500: function(){
                        $("#myModalAdmin").modal('show');
                    }

                }
                ,
                contentType:"application/json; charset=utf-8",
                success: function(data, textStatus, jqXHR)
                {
                    console.log(JSON.stringify(data));
                    cat = []
                    menu = JSON.stringify(data);
                    function filterCat(item){
                        cat.push(item.name);
                    }
                    data.forEach(filterCat);
                    var options = '';

                    console.log("cat : " + cat);
                    

                    for(var i = 0; i < cat.length; i++)
                        options += '<option value="'+cat[i]+'" />';

                    document.getElementById('selectCategoryList').innerHTML = options;
                },
                error: function (e)
                {
                    console.log("error");
                    alert("There was some error");
                    console.log(e);
                }
            });
        }
        else{
            $("#myModalInternet").modal('show');
        }


    });

    $('#update-menu-edit').on("click" , "#submitUpdateCategory" , function(e){
        e.preventDefault();
        e.stopPropagation();

        if(navigator.onLine){
            $.ajax({
                url:"https://bhojan.dekhlo.online:8080/api/v1/restaurant/category/" + $('#selectCategory').val(),
                type:"PUT",
                beforeSend: function(xhr){
                        xhr.setRequestHeader('authorization', sessionStorage.getItem("authorization"));
                },
                data : JSON.stringify({
                    "category": $('#updateCategoryInput').val()
                }),
                statusCode :{
                    200: function() {
                        $("#myModalOk").modal('show');
                        console.log("success");
                        setTimeout(function(){
                            window.location.pathname = "Bhojan-App/html/updateMenu.html";
                        },2000);
                    },
                    401: function() {
                        window.location.pathname = "Bhojan-App/index.html";
                        sessionStorage.clear();
                    },
                    500: function(){
                        $("#myModalAdmin").modal('show');
                    }
                }
                ,
                contentType:"application/json; charset=utf-8",
                success: function(data, textStatus, jqXHR)
                {
                    
                },
                error: function (e)
                {
                console.log("error");
                alert("There was some error");
                console.log(e);
                }
            });
        }
        else{
            $("#myModalInternet").modal('show');
        }

    });

    $('#updateItem').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        document.getElementById("updateCategory").style.display = "none";
        document.getElementById("updateItem").disabled = true;
        document.getElementById("update-menu").style.display = "";

        var elem = `   
        <form class="form-add-item" id="update_cat_form"  style="align-items:center" >
            <h3 class="head">Update  Item </h3>
            <br/>
            <label for="selectCat" class="">Select Category</label>
            <input type="text" name="category" list="selectCategoryList" id="selectCategory" class="form-control" placeholder=" Select Category" required>
                <datalist id="selectCategoryList">
                </datalist>
            <label for="selectItem" class="">Select Item</label>
            <input type="text" name="category" list="selectItemList" id="selectItem" class="form-control" placeholder=" Select Item" required>
                <datalist id="selectItemList">
                </datalist>
            <label for="AddItemName" class="">Add Item Name</label>
            <input type="text" name="category" id="updateItemName" class="form-control" placeholder="New Name" required>
            <label for="AddItemPrice" class="">Add Item Price</label>
            <input type="text" name="category" id="updateItemPrice" class="form-control" placeholder="New Price" required>
            <br />
            <button id = "submitUpdateItem" class="btn btn-lg btn-primary btn-block" type="submit" style="margin-top: 10px;">Submit</button>
        </form>
        `;

        document.getElementById('update-menu-edit').innerHTML = elem;


        if(navigator.onLine){
            var auth_decode = JSON.parse(atob(sessionStorage.getItem("authorization").split(".")[1]));
            var res_id = auth_decode['sub'];
            var url = 'https://bhojan.dekhlo.online:8080/api/v1/menu/' + res_id;
            $.ajax({
                url:url,
                type:"GET",
                beforeSend: function(xhr){
                        xhr.setRequestHeader('authorization', sessionStorage.getItem("authorization"));
                },
                statusCode :{
                    200: function() {
                        console.log("success");
                    },
                    401: function() {
                        window.location.pathname = "Bhojan-App/index.html";
                        sessionStorage.clear();
                    },
                    500: function(){
                        $("#myModalAdmin").modal('show');
                    }

                }
                ,
                contentType:"application/json; charset=utf-8",
                success: function(data, textStatus, jqXHR)
                {
                    cat = []
                    items = []

                    function filterCat(item){
                        cat.push(item.name);
                    }

                    data.forEach(filterCat);

                    function fillItems(item){
                        items.push(item.name);
                    }

                    function filterItems(item){
                        item.items.forEach(fillItems);
                    }

                    data.forEach(filterItems);

                    console.log("cat : " + cat);
                    console.log("items : " + items);


                    var optionsCat = '';
                    var optionsItem = '';

                    for(var i = 0; i < cat.length; i++)
                    optionsCat += '<option value="'+cat[i]+'" />';

                    for(var i = 0; i < items.length; i++)
                    optionsItem += '<option value="'+items[i]+'" />';

                    document.getElementById('selectCategoryList').innerHTML = optionsCat;
                    document.getElementById('selectItemList').innerHTML = optionsItem;
                },
                error: function (e)
                {
                    console.log("error");
                    alert("There was some error");
                    console.log(e);
                }
            });
        }
        else{
            $("#myModalInternet").modal('show');
        }


    });

    $('#update-menu-edit').on("click" , "#submitUpdateItem" , function(e){
        e.preventDefault();
        e.stopPropagation();

        if(navigator.onLine){
            $.ajax({
                url:"https://bhojan.dekhlo.online:8080/api/v1/restaurant/category/" + $('#selectCategory').val() + "/item/" + $('#selectItem').val(),
                type:"PUT",
                beforeSend: function(xhr){
                        xhr.setRequestHeader('authorization', sessionStorage.getItem("authorization"));
                },
                data : JSON.stringify({
                    "name": $('#updateItemName').val(),
                    "price": $('#updateItemPrice').val(),
                    "desc": ''
                }),
                statusCode :{
                    200: function() {
                        $("#myModalOk").modal('show');
                        console.log("success");
                        setTimeout(function(){
                            window.location.pathname = "Bhojan-App/html/updateMenu.html";
                        },2000);
                    },
                    401: function() {
                        window.location.pathname = "Bhojan-App/index.html";
                        sessionStorage.clear();
                    },
                    500: function(){
                        $("#myModalAdmin").modal('show');
                    }
                }
                ,
                contentType:"application/json; charset=utf-8",
                success: function(data, textStatus, jqXHR)
                {
                    
                },
                error: function (e)
                {
                    console.log("error");
                    alert("There was some error");
                    console.log(e);
                }
            });
        }
        else{
            $("#myModalInternet").modal('show');
        }

    });
    


    $('#close-update-menu').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        document.getElementById("update-menu").style.display = "none";
        document.getElementById("updateCategory").style.display = "";
        document.getElementById("updateItem").style.display = "";
        document.getElementById("updateCategory").disabled = false;
        document.getElementById("updateItem").disabled = false;

    });

});