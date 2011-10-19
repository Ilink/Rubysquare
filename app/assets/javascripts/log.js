rubysquare.log = function(str)
{
    if (rubysquare.settings['debug']){  //only log if debug is enabled
        console.log(str);
    }
}