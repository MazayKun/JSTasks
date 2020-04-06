/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
    var answer = {date : new Date(date)};

    Object.defineProperty(answer, 'add', {
        value: function(number, type) {
            if(number < 0) {
                throw new TypeError();
            }
            switch(type) {
                case 'years' : {
                    this.date = new Date(this.date.getFullYear() + number,this.date.getMonth(), this.date.getUTCDate(), this.date.getHours(), this.date.getMinutes());
                    break;
                }
                case 'months' : {
                    this.date = new Date(this.date.getFullYear(),this.date.getMonth()+ number, this.date.getUTCDate(), this.date.getHours(), this.date.getMinutes());
                    break;
                }
                case 'days' : {
                    this.date = new Date(this.date.getFullYear(),this.date.getMonth(), this.date.getUTCDate()+ number, this.date.getHours(), this.date.getMinutes());
                    break;
                }
                case 'hours' : {
                    this.date = new Date(this.date.getFullYear(),this.date.getMonth(), this.date.getUTCDate(), this.date.getHours()+ number, this.date.getMinutes());
                    break;
                }
                case 'minutes' : {
                    this.date = new Date(this.date.getFullYear(),this.date.getMonth(), this.date.getUTCDate(), this.date.getHours(), this.date.getMinutes()+ number);
                    break;
                }
                default : {
                    throw new TypeError();
                }
            }
            return this;
        } ,
        enumerable: true
    });

    Object.defineProperty(answer, 'subtract', {
        value: function(number, type) {
            if(number < 0) {
                throw new TypeError();
            }
            switch(type) {
                case 'years' : {
                    this.date = new Date(this.date.getFullYear()- number,this.date.getMonth(), this.date.getUTCDate(), this.date.getHours(), this.date.getMinutes());
                    break;
                }
                case 'months' : {
                    this.date = new Date(this.date.getFullYear(),this.date.getMonth()- number, this.date.getUTCDate(), this.date.getHours(), this.date.getMinutes());
                    break;
                }
                case 'days' : {
                    this.date = new Date(this.date.getFullYear(),this.date.getMonth(), this.date.getUTCDate()- number, this.date.getHours(), this.date.getMinutes());
                    break;
                }
                case 'hours' : {
                    this.date = new Date(this.date.getFullYear(),this.date.getMonth(), this.date.getUTCDate(), this.date.getHours()- number, this.date.getMinutes());
                    break;
                }
                case 'minutes' : {
                    this.date = new Date(this.date.getFullYear(),this.date.getMonth(), this.date.getUTCDate(), this.date.getHours(), this.date.getMinutes()- number);
                    break;
                }
                default : {
                    throw new TypeError();
                }
            }
            return this;
        } ,
        enumerable: true
    });

    Object.defineProperty(answer, 'value', {
        get : function() {
            return this.date.getFullYear() + '-' + (this.date.getMonth() < 9 ? '0' : '') + (this.date.getMonth()+1) + '-' + (this.date.getUTCDate() < 10 ? '0' : '') + this.date.getUTCDate() + ' ' + (this.date.getHours() < 10 ? '0' : '') + this.date.getHours() + ':' + (this.date.getMinutes() < 10 ? '0' : '') + this.date.getMinutes();
        }
    });

    return answer;
};
