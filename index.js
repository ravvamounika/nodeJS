const http = require('http');
const fs= require('fs');
const path=require('path');

const hostname='localhost';
const port=4001;

const server=http.createServer((req,res)=>
{
    
    console.log("Req for"+ req.url+ " by method "+ req.method);


    if(req.method=='GET')
    {
        var fileUrl;
        if(req.url=='/') fileUrl='/index.html';
        else fileUrl=req.url;



        var filePath=path.resolve('./public'+fileUrl);
        const fileExt=path.extname(filePath);


        if(fileExt=='.html')
        {
            fs.exists(filePath,(exists) => {
                if(!exists)
                {
                    res.statusCode=404;
                    res.setHeader('Content-Type','text/html');
                    res.end('<html><body><h1>ERROR 404:'+fileUrl+'NOT FOUND</h1></body></html>');
                    return;
                }

                res.statusCode=200;
                res.setHeader('Content-Type','text/html');
                fs.createReadStream(filePath).pipe(res);
            })
        }
        else{
            res.statusCode=404;
                    res.setHeader('Content-Type','text/html');
                    res.end('<html><body><h1>ERROR 404:'+fileUrl+'NOT AN HTML FILE</h1></body></html>');
        }
    }
    else
    {
        res.statusCode=404;
                    res.setHeader('Content-Type','text/html');
                    res.end('<html><body><h1>ERROR 404:'+req.method+'NOT SUPPORTED</h1></body></html>');
    }

})


server.listen(port,hostname,() =>{
    console.log(`SERVER RUNNING AT http://${hostname}:${port}`);
})