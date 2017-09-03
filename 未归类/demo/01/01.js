var log = console.log.bind(this);
var validateCreator = function(){
    
        function _push({validate,msg}){
            list.push({
                validate,
                msg
            })
        }

        var list= [];
    
        var use = function(validate,msg){
            if(arguments.length = 1 && Array.isArray(arguments[0])){
                var a = arguments [0];
                var len = a.length;

                if(len>1){
                    for(var i = 0; i<len;i++){
                        var item = a[i];
                        _push(item)
                    }
                }else{
                    _push(a[0]) 
                }               
              
            }
            _push({validate,msg})
            
        
        }
    
        var run = function(){
            for(var i = 0, length = list.length; i<length; i++){
                
                var o = list[i];
    
                console.log(list)
                if(o.validate()){
                    return o.msg
                }
            }
    
            return null 
        }
    
        var reset = function(){
            
            list = [];
        }
    
        return {
    
            run ,
            use,
            reset
    
        }
}


var  __main = (function(){
    
    var validator = validateCreator();

    validator.use(
       function(){
            return  3>5
        },
        '千万不要啊'
    );

    // validator.use([
    //     {
    //         validate: () => 4>5 || 6>3,
    //         msg: 'this is a error'
    //     },
    //     {
    //         validate: function(){
    //             return  3>5
    //         },
    //         msg: 'sfsfsfsfsf'
    //     },
    // ]
       
    // );

    var result = validator.run();


    if(!result ) alert(1)
})();





