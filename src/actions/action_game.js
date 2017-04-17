import store from '../store';

export const shouldGenerateBgObject = payload => ({
    type: 'SHOULD_GENERATE_BG_OBJECT',
    payload: payload,
});

export const testAction = () => {
    console.log('test');
};
