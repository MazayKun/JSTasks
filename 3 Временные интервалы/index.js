/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
    minutes += interval;
    hours += (minutes - (minutes % 60)) / 60;
    minutes = minutes % 60;
    hours = hours % 24;
    return (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;
};
