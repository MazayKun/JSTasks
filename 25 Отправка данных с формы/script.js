'use strict';

// Код валидации формы

(function() {

    function validateData(value, dataset) {
        switch(dataset.validator) {
            default : {return true;}
            case 'regexp' : {
                return (new RegExp(dataset.validatorPattern)).test(value);
            }
            case 'letters' : {
                return (new RegExp('^[a-zа-яё]+$', 'i')).test(value);
            }
            case 'number' : {
                value = Number(value);
                if(value > Number(dataset.validatorMax) || value < Number(dataset.validatorMin)) {
                    return false;
                }
                return !isNaN(value);
            }
        }
    }

    function checkInput(target) {
        var value = target.value;
        if(!value && target.dataset.hasOwnProperty('required')) {
            return false;
        }

        var validator = target.dataset.validator;

        return (validator && value) ? validateData(value, target.dataset) : true;
    }

    window.validateForm = function(options) {
        var form = document.getElementById(options.formId);
        var inputs = Array.from(document.querySelectorAll('#' + options.formId + ' input'));
        form.addEventListener('focus', function(event){
            var target = event.target;
            if(target.tagName === 'INPUT'){
                target.classList.remove(options.inputErrorClass);
            }
        }, true);
        form.addEventListener('blur', function(event){
            var target = event.target;
            if(target.tagName === 'INPUT'){
                if(!checkInput(target)){
                    target.classList.add(options.inputErrorClass);
                }
            }
        }, true);
        form.addEventListener('submit', function(){
            event.preventDefault();    
            form.classList.remove(options.formValidClass);
            form.classList.remove(options.formInvalidClass);
            var hasBadValues = false;
            for(var i = 0 ; i < inputs.length; i++) {
                console.log(inputs[i]);
                if (!checkInput(inputs[i])) {
                    inputs[i].classList.add(options.inputErrorClass);
                    hasBadValues = true;
                }
            }
            form.classList.add(hasBadValues ? options.formInvalidClass : options.formValidClass);
        });
    }
}());
