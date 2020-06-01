if(navigator.onLine)
{

    console.log(window.location.pathname);

    $(document).ready(function(){

        function checkLogin() {
            if(sessionStorage.getItem("authorization")){
                window.location.pathname = "Catalog-App/html/menu.html";
            }
         }
      
         checkLogin();

        $(".form-signin").submit(function(event) {
            event.stopPropagation();
            event.preventDefault();
            $.ajax({
                url:"http://bhojan.dekhlo.online:8080/api/v1/restaurant/login",
                type:"POST",
                data:JSON.stringify({
                    "username": $('#inputEmail').val(),
                    "password": $('#inputPassword').val()
                }),
                statusCode :{
                   200: function() {
                      console.log("success");
                   },
                   401: function() {
                      alert("Please enter correct username and password! ")
                   }
                }
                ,
                contentType:"application/json; charset=utf-8",
                success: function(data, textStatus, jqXHR)
                {
                    console.log($('#inputEmail').val());
                    console.log($('#inputPassword').val());
                    console.log(data.authorization);
                    if(textStatus == "success"){
                        sessionStorage.setItem("authorization" , data.authorization);
                        window.location.pathname = "Bhojan-App/html/menu.html";
                    }
                },
                error: function (e)
                {
                    console.log("error");
                    console.log(e);
                }
            });
        });
    
    });
}
else
{
    alert('You are Offline')
}




