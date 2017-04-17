import axios from 'axios';
import store from '../store';

//const SERVER = 'http://localhost:8080/';
const host = process.env.NODE_ENV === 'production'
    ? window.location.href
    : 'http://localhost:8080/';

export const updatePersonalHighestScore = score =>
    dispatch => {
        const _id = store.getState()._id;
        const url = `${host}users/updateUserHighestScore/${_id}/${score}`;
        axios
            .put(url)
            .then(() => {
                dispatch({
                    type: 'UPDATE_PLAYER_HIGHEST_SCORE',
                    payload: score,
                });
            })
            .catch(e => {
                console.log(e);
            });
    };

export const updatePlayerId = id => ({
    type: 'UPDATE_PLAYER_ID',
    payload: id,
});

export const updateFacebookId = facebookId => ({
    type: 'UPDATE_FACEBOOKID',
    payload: facebookId,
});

export const newPlayerRegistration = newPlayer =>
    dispatch => {
        newPlayer.highestScore = 0;
        axios
            .post(`${host}users/`, newPlayer)
            .then(data => {
                dispatch({
                    type: 'UPDATE_SCREENNAME',
                    payload: data.data.screenName,
                });
            })
            .catch(e => {
                console.log(e);
            });
    };

export const getGameHighestScore = () =>
    dispatch => {
        axios
            .get(`${host}highestScore/`)
            .then(data => {
                const gameHighestScore = data.data.result[0].highestScore;
                dispatch({
                    type: 'UPDATE_GAME_HIGHEST_SCORE',
                    payload: gameHighestScore,
                });
            })
            .catch(e => {
                console.log(e);
            });
    };

export const checkAndUpdateGameHighestScore = score =>
    dispatch => {
        const reqBody = {
            highestScore: score,
            facebookId: store.getState().facebookId,
            screenName: store.getState().screenName,
        };
        const url = `${host}highestScore/${score}`;
        axios
            .put(url, reqBody)
            .then(data => {
                dispatch({
                    type: 'UPDATE_GAME_HIGHEST_SCORE',
                    payload: reqBody.highestScore,
                });
            })
            .catch(e => {
                console.log(e);
            });
    };
