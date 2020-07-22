const { promises } = require("fs");

/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
    let promises = [];
    operations.forEach(operation => {
        promise = new Promise(function(resolve, reject){
                let myNext = function (err, result) {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(result);
                    }
                }
                operation(myNext);
            } 
        )
        promises.push(promise);
    });

    Promise.all(promises).then(values => {callback(null, values);}, reason => {callback(reason);});
};

