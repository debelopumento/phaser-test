import axios from 'axios';
import store from '../store';

const SERVER = 'http://localhost:8080/';

export const updatePersonalHighestScore = score =>
    dispatch => {
        const _id = store.getState()._id;
        const url = SERVER +
            'users/updateUserHighestScore/' +
            _id +
            '/' +
            score;
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
            .post(SERVER + 'users/', newPlayer)
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
        console.log(200);
        axios
            .get('http://localhost:8080/highestScore/')
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
