var showMem = ()=>{
    var mem = process.memoryUsage();

    var format = (bytes)=>{
        return ( bytes / 1024 / 1024 ).toFixed( 2 ) + "MB"
    }

    console.log(`Process: heapTotal ${format(mem.heapTotal)} heapUsed 
    ${format(mem.heapUsed)}  rss ${format(mem.rss)}
    `)
    console.log(`------------------------`)
}

var useMe = () => {

    var size = 20 * 1024 * 1024 ;
    
    var arr =  new Array(size);

    for(var i = 0; i < size ; i++){
        
        arr[i] = 0;
    }
}

var total = [];

for(var j = 0 ; j< 15; j++){

    showMem();
    
    useMe();

}