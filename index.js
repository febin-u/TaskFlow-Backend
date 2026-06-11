const http = require("http");

const server = http.createServer((req,res)=>{
    if(req.url ==="/api/health"){
        res.writeHead(200, {"Content-Type":"application/json"});
        res.end(JSON.stringify({status:"ok",timestamp:Date.now()}));
    }else{
        res.writeHead(404);
        res.end("Not Found");
    }
});

server.listen(5000, () =>{ console.log("server running ....");});