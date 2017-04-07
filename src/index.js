import Game from './main';

//window.game = new Game();

//const game = new Game();

const startGame = () => {
    const game = new Game();
};

$(function() {
    const logInButton = '<div><fb:login-button autologoutlink="true" data-size="xlarge" id="fbloginbutton" scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button></div>';

    $('#signinScreen').html(logInButton);
    $(function() {
        // This is called with the results from from FB.getLoginStatus().

        window.fbAsyncInit = function() {
            FB.init({
                appId: '113731382506643',
                cookie: true, // enable cookies to allow the server to access
                // the session
                xfbml: true, // parse social plugins on this page
                version: 'v2.8', // use graph api version 2.8
            });

            // Now that we've initialized the JavaScript SDK, we call
            // FB.getLoginStatus().  This function gets the state of the
            // person visiting this page and can return one of three states to
            // the callback you provide.  They can be:
            //
            // 1. Logged into your app ('connected')
            // 2. Logged into Facebook, but not your app ('not_authorized')
            // 3. Not logged into Facebook and can't tell if they are logged into
            //    your app or not.
            //
            // These three cases are handled in the callback function.

            FB.getLoginStatus(function(response) {
                //statusChangeCallback(response);
                if (response.status === 'connected') {
                    var signedInUserFacebookId = '';
                    FB.api('/me', function(response) {
                        signedInUserFacebookId = response.id;
                        const game = new Game();
                        /*
                        $.ajax({
                            url: window.location.href +
                                'users/facebookId/' +
                                signedInUserFacebookId,
                            type: 'GET',
                            success: function(data) {
                                if (data != 0) {
                                    var signedInUser = { user: data };
                                    login(signedInUser);
                                }
                                if (data === 0) {
                                    signedInUserFullName = response.name;
                                    console.log(2, signedInUserFullName);
                                    register(
                                        signedInUserFacebookId,
                                        signedInUserFullName
                                    );
                                }
                            },
                        });
                        */
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
