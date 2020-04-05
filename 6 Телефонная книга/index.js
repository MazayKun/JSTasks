// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function comm(command) {
    var parse = command.split(' ');
    switch(parse[0]) {
        case 'ADD': add(parse[1], parse[2].split(',') ); break;
        case 'REMOVE_PHONE': return remove(parse[1]);
        case 'SHOW': return show();
    }
};



function add(name, numbers) {
    if(phoneBook.hasOwnProperty(name)) {
        phoneBook[name] = phoneBook[name].concat(numbers);
    } else {
        phoneBook[name] = numbers;

    }
}

function remove(number) {
    var keys = Object.keys(phoneBook);
    for(var i = 0; i < keys.length; i++) {
        if(phoneBook[keys[i]].indexOf(number) != -1) {
            phoneBook[keys[i]].splice(phoneBook[keys[i]].indexOf(number), 1);
            if(phoneBook[keys[i]].length == 0) {
                delete phoneBook[keys[i]]
            }
            return true;
        }
    }
    return false;
}

function show() {
    return Object.keys(phoneBook).sort().reduce(getBook, [ ]);
}

function getBook(acc, value) {
    return acc.concat( value + ': ' + phoneBook[value].reduce(getNote, '').slice(2) );
}

function getNote(acc, value) {
    return acc + ', ' + value;
}
