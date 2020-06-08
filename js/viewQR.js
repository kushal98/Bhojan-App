$(document).ready(function(){

    function checkLogin() {
       if(!sessionStorage.getItem("authorization")){
          window.location.pathname = "Bhojan-App/index.html";
       }
    }
 
    checkLogin();

    var auth_decode = JSON.parse(atob(sessionStorage.getItem("authorization").split(".")[1]));
    var res_id = auth_decode['sub'];
    var qrcode_text = res_id
    
    $('#qr').qrcode({text: qrcode_text , width:300 , height: 300});

});

