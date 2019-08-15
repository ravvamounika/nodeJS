const http = require('http');

const hostname='localhost';
const port=4001;

const server=http.createServer((req,res)=>
{
    console.log('REQ HEADERS');
    console.log(req.headers);


    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>HELLO WORLD</h1></body></html>');

})


server.listen(port,hostname,() =>{
    console.log(`SERVER RUNNING AT http://${hostname}:${port}`);
})