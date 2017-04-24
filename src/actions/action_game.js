import store from '../store';

export const shouldGenerateBgObject = payload => ({
    type: 'SHOULD_GENERATE_BG_OBJECT',
    payload: payload,
});

export const shouldGenerateMgObject = payload => ({
    type: 'SHOULD_GENERATE_MG_OBJECT',
    payload: payload,
});

export const updateSpeed = payload => ({
    type: 'UPDATE_SPEED',
    payload: payload,
});
