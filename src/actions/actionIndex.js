import axios from 'axios';
import store from '../store';

const SERVER = 'http://localhost:8080/';

export const updateFacebookId = facebookId => ({
    type: 'UPDATE_FACEBOOKID',
    payload: facebookId,
});

export const newPlayerRegistration = newPlayer =>
    dispatch => {
        newPlayer.highestScore = 0;
        console.log(100);
        axios
            .post('http://localhost:8080/users/', newPlayer)
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
