/*global fb*/

import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Game from './game_main';
import state from './states/state';
import { connect } from 'react-redux';
import * as actions from './actions/actionIndex';
import Registration from './registration';
import axios from 'axios';
import $ from 'jquery';

const SERVER = 'http://localhost:8080/';

const { object, func } = PropTypes;

export default class App extends PureComponent {
    /*
    static PropTypes = {
        gameHighestScore: object,
        getGameHighestScore: func,
        newPlayerRegistration: func,
    };

    static defaultProps = {
        gameHighestScore: 0,
        playerData: {},
    };
    
    state = {
        playerData: {},
    };
    */

    constructor() {
        super();

        this.state = {
            showRegistration: false,
        };

        this.playAsAGuest = this.playAsAGuest.bind(this);
    }

    playAsAGuest(event) {
        event.preventDefault();
        const guestPlayer = {
            highestScore: 0,
            screenName: 'Guest',
        };
        this.startGame();
    }

    startGame() {
        $('#signinScreen').css('display', 'none');
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

                        axios
                            .get(
                                'http://localhost:8080/users/facebookId/' +
                                    facebookId
                            )
                            .then(data => {
                                if (data.data.length === 0) {
                                    //show registration input box
                                    this.setState({ showRegistration: true });
                                } else {
                                    const playerScreenName = data.data[
                                        0
                                    ].screenName;
                                    const playerHighestScore = data.data[
                                        0
                                    ].highestScore;
                                    store.dispatch({
                                        type: 'UPDATE_SCREENNAME',
                                        payload: playerScreenName,
                                    });
                                    store.dispatch({
                                        type: 'UPDATE_PLAYER_HIGHEST_SCORE',
                                        payload: playerHighestScore,
                                    });
                                    this.startGame();
                                }
                            })
                            .catch(e => {
                                console.log(e);
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
                <input
                    type="submit"
                    value="play as a Guest"
                    onClick={this.playAsAGuest}
                />
            </div>
        );
    }
}
/*
export default connect(storeState => ({
    gameHighestScore: storeState.gameHighestScore,
    playerData: storeState.playerData,
}));
*/
