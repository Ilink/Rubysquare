/*------------------------------------------------------------------------------------
 *
 *  Bind from JSON - uses JSON to set up UI bindings. Utilizes jquery's 'bind'
 *  
 *  Usage:
 *  Supply JSON file formatted like this:
 *      var json = [{
 *          'selector' : '#id',
 *          'bind_to' : 'click',
 *          'func' : [
 *				func1,
 *				func2
 *			]
 *      }];
 *
 *	Call the function:
 *		jsUtil.bind_from_json(json)
 *	
 *  Note that you can include any valid jquery selector or combination of selectors
 *  
 *  Changelog:
 *  
 *	Version 0.2: Added support for binding to multiple functions
 *		- Better error reporting for type-checking errors
 *  
 *	Version 0.1: Initial commit
 *  
 -----------------------------------------------------------------------------------*/
if (typeof jsUtil === 'undefined'){
    var jsUtil = {};
}

jsUtil.bind_from_json = function(json){
	"use strict";
    for (var i = 0; i < json.length; i++){
		if (typeof json[i].selector !== 'string'){
			throw "Error in supplied JSON at index "+ i + ". Expects 'Selector' as String";
		}
		if (typeof json[i].bind_to !== 'string'){
			throw "Error in supplied JSON at index "+ i + ". Expects 'Bind_to as String";
		}
		else {
			if (json[i].func.length > 0) {
				for (var j = 0; j < json[i].func.length; j++){
					if (typeof json[i].func[j] !== 'function'){
						throw "Error in supplied JSON at index " + i + ". Expects 'func' to be functions. The " + j + "th entry for 'functions' is not a function";
					}
					else {
						$(json[i].selector).bind(json[i].bind_to, json[i].func[j]);
					}
                }
            }
			else {
				if (typeof json[i].func !== 'function'){
					throw "Error in supplied JSON at index " + i + ". Expects 'func' to be a function.";
				}
				else
					$(json[i].selector).bind(json[i].bind_to, json[i].func);
			}
		}
    }
}