module.exports = Collection;



/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
    this.storage = []
}


// Методы коллекции
Collection.prototype.values = function () {
    return this.storage;
};
// другие методы
Collection.prototype.append = function () {
    if (arguments[0] instanceof Collection) {
        this.storage = this.storage.concat(arguments[0].values());
    }else{
        this.storage.push(arguments[0]);
    }
} 

Collection.prototype.at = function () {
    return this.storage[arguments[0] - 1];
}

Collection.prototype.count = function () {
    return this.storage.length;
}

Collection.prototype.removeAt = function () {
    if(arguments[0] < 1 || arguments[0] > this.storage.length) {
        return false;
    }
    this.storage.splice(arguments[0] - 1, 1);
    return true;
}

/**
 * Создание коллекции из массива значений
 */
Collection.from = function () {
    answ = new Collection();
    answ.storage = arguments[0].slice();
    return answ;
};

