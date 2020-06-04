$(document).ready(function(){

    function checkLogin() {
        if(!sessionStorage.getItem("authorization")){
            window.location.pathname = "Bhojan-App/index.html";
        }
     }
  
    checkLogin();

    $("#logout").click(function(e){
        e.preventDefault();
        sessionStorage.removeItem("authorization");
        sessionStorage.clear();
        window.location.pathname = "Bhojan-App/index.html";
     });

    var cat = [];
    var items = [];
    var menu = "";

    $('#deleteCategory').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        document.getElementById("deleteItem").style.display = "none";
        document.getElementById("deleteCategory").disabled = true;
        document.getElementById("delete-menu").style.display = "";

        var elem = `   
        <form class="form-add-category" id="update_cat_form"  style="align-items:center" >
            <h3 class="head">Delete Category </h3>
            <br/>
            <label for="selectCat" class="">Select  Category</label>
            <input type="text" name="category" list="selectCategoryList" id="selectCategory" class="form-control" placeholder=" Select Category" required>
                <datalist id="selectCategoryList">
                </datalist>
            <br />
            <button id = "submitDeleteCategory" class="btn btn-lg btn-primary btn-block" type="submit" style="margin-top: 10px;">Submit</button>
        </form>
        `;

        document.getElementById('delete-menu-edit').innerHTML = elem;

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
                    console.log(e);
                }
            });
        }
        else{
            $("#myModalInternet").modal('show');
        }


    });

    $('#delete-menu-edit').on("click" , "#submitDeleteCategory" , function(e){
        e.preventDefault();
        e.stopPropagation();

        $("#myModalLoading").modal('show');

        if(navigator.onLine){
            $.ajax({
                url:"https://bhojan.dekhlo.online:8080/api/v1/restaurant/category/" + $('#selectCategory').val(),
                type:"DELETE",
                beforeSend: function(xhr){
                        xhr.setRequestHeader('authorization', sessionStorage.getItem("authorization"));
                },
                statusCode :{
                    200: function() {
                        $("#myModalLoading").modal('hide');
                        setTimeout(function(){}, 2000);
                        $("#myModalOk").modal('show');
                        console.log("success");
                        $('#selectCategory').val('');
                    },
                    401: function() {
                        $("#myModalLoading").modal('hide');
                        window.location.pathname = "Bhojan-App/index.html";
                        sessionStorage.clear();
                    },
                    500: function(){
                        $("#myModalLoading").modal('hide');
                        $("#myModalAdmin").modal('show');
                    },
                    400: function(){
                        $("#myModalLoading").modal('hide');
                        $("#myModal400").modal('show');
                    }
                }
                ,
                contentType:"application/json; charset=utf-8",
                success: function(data, textStatus, jqXHR)
                {
                    
                },
                error: function (e)
                {
                    $("#myModalLoading").modal('hide');
                    console.log("error");
                    console.log(e);
                }
            });
        }
        else{
            $("#myModalInternet").modal('show');
        }

    });

    $('#deleteItem').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        document.getElementById("deleteCategory").style.display = "none";
        document.getElementById("deleteItem").disabled = true;
        document.getElementById("delete-menu").style.display = "";

        var elem = `   
        <form class="form-add-item" id="update_cat_form"  style="align-items:center" >
            <h3 class="head">Delete Item </h3>
            <br/>
            <label for="selectCat" class="">Select Category</label>
            <input type="text" name="category" list="selectCategoryList" id="selectCategory" class="form-control" placeholder=" Select Category" required>
                <datalist id="selectCategoryList">
                </datalist>
            <label for="selectItem" class="">Select Item</label>
            <input type="text" name="category" list="selectItemList" id="selectItem" class="form-control" placeholder=" Select Item" required>
                <datalist id="selectItemList">
                </datalist>
            <br />
            <button id = "submitDeleteItem" class="btn btn-lg btn-primary btn-block" type="submit" style="margin-top: 10px;">Submit</button>
        </form>
        `;

        document.getElementById('delete-menu-edit').innerHTML = elem;


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
                    console.log(e);
                }
            });
        }
        else{
            $("#myModalInternet").modal('show');
        }


    });

    $('#delete-menu-edit').on("click" , "#submitDeleteItem" , function(e){
        e.preventDefault();
        e.stopPropagation();

        $("#myModalLoading").modal('show');

        if(navigator.onLine){
            $.ajax({
                url:"https://bhojan.dekhlo.online:8080/api/v1/restaurant/category/" + $('#selectCategory').val() + "/item/" + $('#selectItem').val(),
                type:"DELETE",
                beforeSend: function(xhr){
                        xhr.setRequestHeader('authorization', sessionStorage.getItem("authorization"));
                },
                statusCode :{
                    200: function() {
                        $("#myModalLoading").modal('hide');
                        setTimeout(function(){}, 2000);
                        $("#myModalOk").modal('show');
                        console.log("success");
                        $('#selectCategory').val('');
                        $('#selectItem').val('');
                    },
                    401: function() {
                        $("#myModalLoading").modal('hide');
                        window.location.pathname = "Bhojan-App/index.html";
                        sessionStorage.clear();
                    },
                    500: function(){
                        $("#myModalLoading").modal('hide');
                        $("#myModalAdmin").modal('show');
                    },
                    400: function(){
                        $("#myModalLoading").modal('hide');
                        $("#myModal400").modal('show');
                    }
                }
                ,
                contentType:"application/json; charset=utf-8",
                success: function(data, textStatus, jqXHR)
                {
                    
                },
                error: function (e)
                {
                    $("#myModalLoading").modal('hide');
                    console.log("error");
                    console.log(e);
                }
            });
        }
        else{
            $("#myModalInternet").modal('show');
        }

    });

    $('#close-delete-menu').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        document.getElementById("delete-menu").style.display = "none";
        document.getElementById("deleteCategory").style.display = "";
        document.getElementById("deleteItem").style.display = "";
        document.getElementById("deleteCategory").disabled = false;
        document.getElementById("deleteItem").disabled = false;

    });
});