import axios from 'axios';
import store from '../store';

const SERVER = 'http://localhost:8080/';

export const updateFacebookId = facebookId => ({
    type: 'UPDATE_FACEBOOKID',
    payload: facebookId,
});

export const newPlayerRegistration = newPlayer => {
    return dispatch => {
        newPlayer.highestScore = 0;
        console.log(5, newPlayer);
        axios
            .post('http://localhost:8080/users/', newPlayer)
            .then(data => {
                console.log(4, data.data.screenName);
                dispatch({
                    type: 'UPDATE_SCREENNAME',
                    payload: data.data.screenName,
                });
            })
            .catch(e => {
                console.log(e);
            });
    };
};

export const getGameHighestScore = () => {
    dispatch => {
        axios
            .get('http://localhost:8080/highestScore/')
            .then(data => {
                const gameHighestScore = data.result[0].highestScore;
                dispatch({
                    type: 'UPDATE_GAME_HIGHEST_SCORE',
                    playload: gameHighestScore,
                });
            })
            .catch(e => {
                console.log(e);
            });
    };
};
