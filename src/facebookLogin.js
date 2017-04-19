import React from 'react';
import FacebookLogin from 'react-facebook-login';
import Game from './game_init';
import store from './store';
import * as actions from './actions/actionIndex';

const responseFacebook = response => {
    const facebookId = response.id;
    store.dispatch(actions.updateFacebookId(facebookId));
    store.dispatch(actions.lookupPlayer(facebookId)).then(result => {
        if (result) {
            store.dispatch(actions.hideButtons());
            const game = new Game();
        }
    });
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
