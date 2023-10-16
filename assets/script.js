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
})

function isLogout() {
    window.location = 'login.html';
}