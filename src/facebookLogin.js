import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = response => {
  console.log(15, response);
};

const FacebookLoginButton = () => (
  <FacebookLogin
    appId="113731382506643"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook}
    cssClass="my-facebook-button-class"
    icon="fa-facebook"
  />
);

export default FacebookLoginButton;



