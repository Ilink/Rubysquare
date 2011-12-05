/*
Usage:

var provided = {
    arg1 : "arg1",
    arg1 : 2
}

var should_be = {
    arg1 : "string",
    arg2 : "object"
}

This would throw an error for arg2 because it is the wrong type
 */

var Type_checker = function(){
    if(this instanceof Type_checker){
        var errors = [];
        this.check = function(check_me, should_be, extra_error_message){
            $.each(check_me, function(key, value) {
                if(typeof value !== should_be[key]){
                    var should_be_val = should_be[key];
                    var error = key + ' is a(n) ' + typeof value + ' when it should be a(n) ' + should_be_val;
                    error = error + '. ' + extra_error_message;
                    errors.push(error);
                }
            });
            return errors;
        }
        this.log_errors = function(){
            $.each(errors, function(key, value){
               console.log(value);
            });
        }
    }
    else return new Type_checker()
}