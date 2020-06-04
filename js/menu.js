$(document).ready(function(){

    function checkLogin() {
       if(!sessionStorage.getItem("authorization")){
          window.location.pathname = "Bhojan-App/index.html";
       }
    }
 
    checkLogin();
 
    $("#logout").click(function(e){
       e.preventDefault();
       sessionStorage.removeItem("authorization")
       sessionStorage.clear();
       window.location.pathname = "Bhojan-App/index.html";
    });
 
     $("#addMenu").click(function(e){
         e.preventDefault();
         window.location.pathname = "Bhojan-App/html/addMenu.html";
      });
   
   
      $("#updateMenu").click(function(e){
         e.preventDefault();
         window.location.pathname = "Bhojan-App/html/updateMenu.html";
      });

      $("#deleteMenu").click(function(e){
        e.preventDefault();
        window.location.pathname = "Bhojan-App/html/deleteMenu.html";
     });

     $("#viewQR").click(function(e){
        e.preventDefault();
        window.location.pathname = "Bhojan-App/html/viewQR.html";
     });
   
      $("#viewMenu").click(function(e){
         e.preventDefault();
         window.location.pathname = "Bhojan-App/html/viewMenu.html";
      });
 
 });