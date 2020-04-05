/**
 * @param {Number} hours
 * @param {Number} minutes
 * @returns {Boolean}
 */
module.exports = function (hours, minutes) {
    return hours < 24 && hours >= 0 && minutes < 60 && minutes >=0 ;
};
