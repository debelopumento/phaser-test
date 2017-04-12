import axios from 'axios';

const SERVER = 'http://localhost:8080/';

export const newPlayerRegistration = newPlayer => {
    return dispatch => {
        axios
            .post('http://localhost:8080/users/', newPlayer)
            .then(player => {
                dispatch({
                    type: 'NEW_PLAYER_REGISTRATION',
                    payload: player,
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

