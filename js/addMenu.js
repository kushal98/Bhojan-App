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

    var dataFinal;
    var cat = [];
    var menu = "";

    $('#addCategory').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        document.getElementById("addItem").style.display = "none";
        document.getElementById("addCategory").disabled = true;
        document.getElementById("add-menu").style.display = "";

        var elem = `   
        <form class="form-add-category" id="update_cat_form"  style="align-items:center" >
            <h3 class="head">Add A Category </h3>
            <br/>
            <label for="AddCategory" class="">Add Category Name</label>
            <input type="text" name="category" id="addCategoryInput" class="form-control" placeholder="Category Name" required>
            <br />
            <button id = "submitAddCategory" class="btn btn-lg btn-primary btn-block" type="submit" style="margin-top: 10px;">Submit</button>
        </form>
        `;

        document.getElementById('add-menu-edit').innerHTML = elem;


    });

    $('#add-menu-edit').on("click" , "#submitAddCategory" , function(e){
        e.preventDefault();
        e.stopPropagation();

        

        if(navigator.onLine){
            $.ajax({
                url:"http://bhojan.dekhlo.online:8080/api/v1/restaurant/category/",
                type:"POST",
                beforeSend: function(xhr){
                        xhr.setRequestHeader('authorization', sessionStorage.getItem("authorization"));
                },
                data : JSON.stringify({
                    "category": $('#addCategoryInput').val()
                }),
                statusCode :{
                    200: function() {
                        $("#myModalOk").modal('show');
                        console.log("success");
                        setTimeout(function(){
                            window.location.pathname = "Bhojan-App/html/addMenu.html";
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

    $('#addItem').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        document.getElementById("addCategory").style.display = "none";
        document.getElementById("addItem").disabled = true;
        document.getElementById("add-menu").style.display = "";

        var elem = `   
        <form class="form-add-item" id="update_cat_form"  style="align-items:center" >
            <h3 class="head">Add  Item </h3>
            <br/>
            <label for="selectCat" class="">Select Category</label>
            <input type="text" name="category" list="selectCategoryList" id="selectCategory" class="form-control" placeholder=" Select Category" required>
                <datalist id="selectCategoryList">
                </datalist>
            <label for="AddItemName" class="">Add Item Name</label>
            <input type="text" name="category" id="addItemName" class="form-control" placeholder="Item Name" required>
            <label for="AddItemPrice" class="">Add Item Price</label>
            <input type="text" name="category" id="addItemPrice" class="form-control" placeholder="Item Price" required>
            <br />
            <button id = "submitAddItem" class="btn btn-lg btn-primary btn-block" type="submit" style="margin-top: 10px;">Submit</button>
        </form>
        `;

        document.getElementById('add-menu-edit').innerHTML = elem;


        if(navigator.onLine){
            var auth_decode = JSON.parse(atob(sessionStorage.getItem("authorization").split(".")[1]));
            var res_id = auth_decode['sub'];
            var url = 'http://bhojan.dekhlo.online:8080/api/v1/menu/' + res_id;
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

    $('#add-menu-edit').on("click" , "#submitAddItem" , function(e){
        e.preventDefault();
        e.stopPropagation();

        if(navigator.onLine){
            $.ajax({
                url:"http://bhojan.dekhlo.online:8080/api/v1/restaurant/category/" + $('#selectCategory').val() + "/item",
                type:"POST",
                beforeSend: function(xhr){
                        xhr.setRequestHeader('authorization', sessionStorage.getItem("authorization"));
                },
                data : JSON.stringify({
                    "name": $('#addItemName').val(),
                    "price": $('#addItemPrice').val(),
                    "desc": ''
                }),
                statusCode :{
                    200: function() {
                        $("#myModalOk").modal('show');
                        console.log("success");
                        setTimeout(function(){
                            window.location.pathname = "Bhojan-App/html/addMenu.html";
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
                    window.location.pathname = "Bhojan-App/html/addMenu.html";
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
    


    $('#close-add-menu').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        document.getElementById("add-menu").style.display = "none";
        document.getElementById("addCategory").style.display = "";
        document.getElementById("addItem").style.display = "";
        document.getElementById("addCategory").disabled = false;
        document.getElementById("addItem").disabled = false;

    });

});