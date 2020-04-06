/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    var copy = collection.slice();
    for (var i = 1; i < arguments.length; i++) {
        if(arguments[i].name === 'filter') {
            copy = _filterIn(copy, arguments[i].property, arguments[i].values);
        }
    }
    for (var i = 1; i < arguments.length; i++) {
        if(arguments[i].name === 'select') {
            copy = _select(copy, arguments[i].property);
        }
    }
    return copy;
}

function _select(collection, property) {
    var answer = [];
    for (var i = 0; i < collection.length; i++) {
        var tmp = {}
        for (var j = 0; j < property.length; j++) {
            if(collection[i].hasOwnProperty(property[j]) ){
                tmp[property[j]] = collection[i][property[j]];
            }
        }
        answer.push(tmp);
    }
    return answer;
}

function _filterIn(collection, property, values) {
    for(var i = 0; i < collection.length; i++) {
        if(values.indexOf(collection[i][property]) === -1){
            collection.splice(i, 1);
            i--;
        }
    }
    return collection;
}

/**
 * @params {String[]}
 */
function select() {
    return {name : 'select' , property : [].slice.call(arguments)};
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return {name : 'filter' , property : property , values : values};
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
