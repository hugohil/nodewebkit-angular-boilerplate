var isNode = typeof global == "object" && {}.toString.call(global) == '[object global]';

if(isNode){
    if(config.debug){
        require('nw.gui').Window.get().showDevTools();
    }

    process.on('uncaughtException', function(err) {
      console.log(err);
    });
}