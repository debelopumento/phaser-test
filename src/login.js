/*global fb*/

import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import FacebookLoginButton from './facebookLogin';
import store from './store';
import Game from './game_init';
import state from './states/state';
import { connect } from 'react-redux';
import * as actions from './actions/actionIndex';
import Registration from './registration';
import axios from 'axios';

const { object, func } = PropTypes;

class Login extends PureComponent {
    constructor() {
        super();

        this.state = {
            showRegistration: false,
            showButtons: true,
        };

        this.playAsAGuest = this.playAsAGuest.bind(this);
    }

    playAsAGuest(event) {
        event.preventDefault();
        store.dispatch({
            type: 'UPDATE_SCREENNAME',
            payload: 'Guest',
        });
        this.startGame();
    }

    startGame() {
        this.setState({ showButtons: false });
        store.dispatch(actions.getGameHighestScore());
        const game = new Game();
    }

    componentWillMount() {
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
                if (response.status === 'connected') {
                    FB.api('/me', response => {
                        const facebookId = response.id;
                        store.dispatch(actions.updateFacebookId(facebookId));
                        store
                            .dispatch(actions.lookupPlayer(facebookId))
                            .then(result => {
                                if (result) {
                                    this.startGame();
                                }
                            });
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
    }

    render() {
        return (
            <div>
                {this.state.showRegistration ? <Registration /> : null}
                {this.state.showButtons
                    ? <input
                          type="submit"
                          value="Play as a Guest"
                          onClick={this.playAsAGuest}
                      />
                    : null}
                {this.state.showButtons ? <FacebookLoginButton /> : null}

            </div>
        );
    }
}

export default connect(storeState => ({
    showRegistration: storeState.showRegistration,
}))(Login);
