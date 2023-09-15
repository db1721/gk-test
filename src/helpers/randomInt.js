/**
 * 
 * @param {*} max 
 * @returns integer between 1 and max (exclusive)
 */

export const randomInt = (max = 1000000000000) => {
    if (max < 1) {
        return 1;
    }
    return Math.floor(Math.random() * max);

}