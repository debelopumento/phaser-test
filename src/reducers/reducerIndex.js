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

const shouldGenerateBgObjectReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOULD_GENERATE_BG_OBJECT': {
            return action.payload;
        }
        default:
            return state;
    }
};

const shouldGenerateMgObjectReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOULD_GENERATE_MG_OBJECT': {
            return action.payload;
        }
        default:
            return state;
    }
};

const showRegistrationReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_REGISTRATION': {
            return action.payload;
        }
        case 'HIDE_REGISTRATION': {
            return false;
        }
        default:
            return state;
    }
};

const speedReducer = (state = 1, action) => {
    switch (action.type) {
        case 'UPDATE_SPEED': {
            return action.payload;
        }
        default:
            return state;
    }
};

const showButtonsReducer = (state = true, action) => {
    switch (action.type) {
        case 'HIDE_BUTTONS': {
            return false;
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
    shouldGenerateBgObject: shouldGenerateBgObjectReducer,
    shouldGenerateMgObject: shouldGenerateMgObjectReducer,
    showRegistration: showRegistrationReducer,
    speed: speedReducer,
    showButtons: showButtonsReducer,
});

export default allReducers;
