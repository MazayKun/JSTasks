/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    var splitedString = tweet.split('#');
    var answer = [];
    for(var i = 1; i < splitedString.length; i++) {
        answer.push(splitedString[i].split(' ')[0]);
    }
    return answer;
};
