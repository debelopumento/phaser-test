import { combineReducers } from 'redux';

const gameHighestScoreReducer = (state = null, action) => {
    switch (action.type) {
        case 'UPDATE_GAME_HIGHEST_SCORE': {
            return action.payload;
        }
        default:
            return state;
    }
};

const playerDataReducer = (state = null, action) => {
    switch (action.type) {
        case 'NEW_PLAYER_REGISTRATION': {
            return action.payload;
        }
        default:
            return state;
    }
};

const allReducers = combineReducers({
    gameHighestScore: gameHighestScoreReducer,
    playerData: playerDataReducer,
});

export default allReducers;
