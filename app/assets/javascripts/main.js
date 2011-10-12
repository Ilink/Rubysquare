/*
    JSON sets bindings like this:
    var json = [{
        'id':'#play',
        'bind_to':'click',
        'function':play
    }];

    Keeping 'bind' in a string lets us use jquery's bind interface
    This is how we would set a bind using that json
        $( json['id'] ).bind( json['bind_to'], json['function'] );
*/

var rubysquare = {}; //set namespace

//temp json
var json = [{
    'selector':'#play',
    'bind_to':1,
    'func':'play'
},
{
    'selector':2,
    'bind_to':2,
    'func':'stop'
}];

rubysquare.ui = {};

//Set binds from JSON
rubysquare.ui.bind_from_json = function(json){
    for(var i = 0; i < json.length; i++){
        if(typeof json[i].selector !== 'string'
            || typeof json[i].bind_to !== 'string'
            ||typeof json[i].func !== 'function'){
                throw 'Error in supplied JSON at index '+ i +
                '. Expects "Selector" as String, "Bind_to" as String and "Func" as Function';
        }
        else
            $(json[i].selector).bind(json[i].bind_to, json[i].func);
    }
}

rubysquare.ui.bind_from_json(json);

rubysquare.commands = {};
/*
    Interface:
        public:
            execute();
            unexecute(){
                return false;
            }
*/

var command_history = [];

rubysquare.commands.test_command = function(arg){
    var ret = {};
    var _arg = arg;
    ret.get_arg = function(){
        console.log(_arg);
    }

    ret.set_arg = function(){
        _arg = 2;
    }

    //if undo supported, add to history array
    var add_me = rubysquare.commands.test_command('#test');
    command_history.push(add_me);

    return ret;
}

console.log(add_me[1].get_arg);

var name = {};
var history = [];

name.test_command = function(arg){
    var ret = {};
    var _arg = arg;
    ret.execute = function(){
        //_arg = 'function executed';
         $('#test').css('color','red');
         history.push(this);
    }
    ret.unexecute = function(){
        //_arg = 'function unexecuted'
        $('#test').css('color','black');
    }
    ret.get_arg = function(){
        console.log('arg is '+_arg);
    }
    return ret;
}

name.test_command('hi').execute();
name.test_command('halp').execute();
history[0].get_arg();
history[1].get_arg();


name.history = function(){
    var command_history = [];
    var iterator = 0;
    /*
        i need an iterator
     */
    return{
        undo:function(){

        },
        redo:function(){

        },
        add_command:function(){
            //set iterator to the end of the history array
        }
    }
}



name.test = function(halp){
    var tester = {};
    var _halp = halp;
    tester.get_arg = function(){
        console.log(_halp);
    }

    tester.set_arg = function(){
        _halp = 2;
    }

    tester.set = function(){
         var add_me = name.test('test');
         history.push(add_me);
    }
    return tester;
    var copy_me = tester;
    history.push(copy_me);
}

var another = name.test('hi');
var testfdsa = name.test('fdsa');

//with this, every command added to the history object is a reference, not a real object

//history[1].set_arg();

//history[0].set_arg();
//history[0].get_arg();
//history[1].get_arg();
//another.get_arg();