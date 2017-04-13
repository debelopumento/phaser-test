import { combineReducers } from 'redux';

const gameHighestScoreReducer = (state = 0, action) => {
    switch (action.type) {
        case 'UPDATE_GAME_HIGHEST_SCORE': {
            return action.payload;
        }
        default:
            return state;
    }
};

const facebookIdReducer = (state = '', action) => {
    switch (action.type) {
        case 'UPDATE_FACEBOOKID': {
            return action.payload;
        }
        default:
            return state;
    }
};

const screenNameReducer = (state = '', action) => {
    switch (action.type) {
        case 'UPDATE_SCREENNAME': {
            return action.payload;
        }
        default:
            return state;
    }
};
const playerHighestScoreReducer = (state = 0, action) => {
    switch (action.type) {
        case 'UPDATE_PLAYER_HIGHEST_SCORE': {
            return action.payload;
        }
        default:
            return state;
    }
};

const _idReducer = (state = '', action) => {
    switch (action.type) {
        case 'UPDATE_PLAYER_ID': {
            return action.payload;
        }
        default:
            return state;
    }
};

const allReducers = combineReducers({
    gameHighestScore: gameHighestScoreReducer,
    facebookId: facebookIdReducer,
    screenName: screenNameReducer,
    playerHighestScore: playerHighestScoreReducer,
    _id: _idReducer,
});

export default allReducers;
