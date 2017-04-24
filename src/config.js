const maxWidth = 760;
const maxHeight = 414;
const docElement = document.documentElement;
const width = docElement.clientWidth > maxWidth
    ? maxWidth
    : docElement.clientWidth;
const height = docElement.clientHeight > maxHeight
    ? maxHeight
    : docElement.clientHeight;

export default {
    gameWidth: width,
    gameHeight: height,
    localStorageName: 'phaseres6webpack',
};
