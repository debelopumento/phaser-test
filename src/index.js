import Game from './main';

//window.game = new Game();
const startGame = () => {
    const game = new Game();
};

const playerSignin = facebookId => {
    console.log(17);
    //this ajax call checks if this is a first time player
    $.ajax({
        url: 'http://localhost:8080/users/facebookId/' + facebookId,
        type: 'GET',
        success: data => {
            console.log(18);
            if (data.length === 0) {
                console.log(19, data, 'first time player');
                let register = '';
                register += '<p>Please enter a screen name</p>';
                register += '<input id="inputScreenName" type="text" />';
                register += '<button id="js-submitScreenName" type="submit">submit</button>';
                $('#signinScreen').append(register);
                $('#js-submitScreenName').click(() => {
                    const newPlayer = {
                        facebookId: facebookId,
                        screenName: $('#inputScreenName').val(),
                    };
                    console.log(30, newPlayer);
                    $.ajax({
                        url: 'http://localhost:8080/users/',
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify(newPlayer),
                        success: data => {
                            console.log(22, data);
                            startGame();
                        },
                        error: e => {
                            console.log(e);
                        },
                    });
                });
            } else {
                console.log(20, data);
                startGame();
            }
        },
        error: e => {
            console.log(e);
        },
    });
};

$(function() {
    const logInButton = '<div><fb:login-button autologoutlink="true" data-size="xlarge" id="fbloginbutton" scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button></div>';
    startGame();
    $('#signinScreen').html(logInButton);
    $(function() {
        // This is called with the results from from FB.getLoginStatus().

        window.fbAsyncInit = () => {
            FB.init({
                appId: '113731382506643',
                cookie: true, // enable cookies to allow the server to access
                // the session
                xfbml: true, // parse social plugins on this page
                version: 'v2.8', // use graph api version 2.8
            });

            FB.getLoginStatus(response => {
                //statusChangeCallback(response);
                if (response.status === 'connected') {
                    var signedInUserFacebookId = '';
                    FB.api('/me', response => {
                        signedInUserFacebookId = response.id;
                        console.log(15, signedInUserFacebookId);
                        playerSignin(signedInUserFacebookId);
                    });
                }
            });
        };

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    });
});
