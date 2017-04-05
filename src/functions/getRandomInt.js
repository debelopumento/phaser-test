//get random integer between a range, but not 0
export default function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    if (result === 0) {
        getRandomInt(min, max);
    } else
        return result;
}
