$(function() {
    $.validator.addMethod("pwd", function(val) {
        return /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/.test(val);
      }, "<p style='color:red; margin:5px 35px'>The password has to be at least 8 characters long and includes a combination of number, special character, capital and lowercase letters. </p>");

    $.validator.addMethod("uname", function(val) {
        return /^[a-z]+$/g.test(val);
    }, "<p style='color:red;margin:5px'>Username cannot contain capital letters.</p>");

    $("form[name='sign-in']").validate({
        rules:{
            "username": {
                required: true,
                uname: true
            },
            "password": {
                required: true,
                pwd: true
            }
        },
        messages: {
            "username": {
                required: "<p style='color:red;margin:5px'>Please enter user name.</p>"
            },
            "password": {
                required: "<p style='color:red;margin:5px'>Please enter password.</p>"
            }
        },
        submitHandler: function (e) {
            console.log('logged in');
        }
    })

    $('#login-btn').click(function(e) {
        $("#sign-in").valid();
        let rcheck = $('#rcheck').is(':checked');
        let uname = $('#uname').val();
        if(rcheck && uname !== ''){
            localStorage.uname = uname;
        } else {
            localStorage.uname = '';
        }
        
        let password = $('#password').val();
        let user = { "username": "test", "password": "Test@123"}
        if(uname === user.username && password === user.password){
            window.location = 'home.html'
        }
        e.preventDefault();
    });

    const drag = document.querySelector(".drag-file"),
            uploadbutton = drag.querySelector("button"),
            uploadinput = drag.querySelector("input");

    const files = document.querySelector('.files');
    let file; 

    $(uploadbutton).click(function(){
        uploadinput.click(); 
    })

    uploadinput.addEventListener("change", function(){
        file = this.files[0];
        fileUpload();
    });

    drag.addEventListener("dragover", (event)=>{
        event.preventDefault();
    });

    drag.addEventListener("drop", (event)=>{
        event.preventDefault(); 
        file = event.dataTransfer.files[0];
        fileUpload(); 
    });

    function fileUpload(){
        let fileType = file.type; 
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
        if(validExtensions.includes(fileType)){ 
            let fileReader = new FileReader(); 
            fileReader.onload = ()=>{
            let fileURL = fileReader.result; 
            let imgTag = `<img src="${fileURL}" alt="image">`;
            $(files).append(imgTag);
            }
            fileReader.readAsDataURL(file);
        }else{
            alert("This is not an Image File!");
        }
    }

    $('#bs_table').DataTable({
        searching: true,
        sorting: true,
        paging: true
    });

})

function isLogout() {
    window.location = 'login.html';
}