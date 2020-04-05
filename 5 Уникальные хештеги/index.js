/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    return hashtags.reduce(tagsSummator, []).reduce(constructor, '').slice(2);
};

function tagsSummator(acc, value) {
    value = value.toLowerCase();
    if(acc.indexOf(value) === -1) {
        acc.push(value);
    }
    return acc;
}

function constructor(acc, value) {
    return acc + ', ' + value;
}
