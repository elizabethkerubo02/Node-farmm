const fs = require('fs');
const http = require('http');
const url = require('url');
const  replaceTemplate = require('./final/modules/replaceTemplate.js')


//using synchronous as code gets to be called once

const tempOverview = fs.readFileSync(`${__dirname}/final/templates/template-overview.html`);
const tempCard= fs.readFileSync(`${__dirname}/final/templates/template-card.html`);
const tempProduct = fs.readFileSync(`${__dirname}/final/templates/template-product.html`);

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


// creating the server
 const server= http.createServer((req, res) =>{
       
    const {query, pathname} = url.parse(req.url, true);
    
    
    // overview page 
    if(pathname === '/' || pathname === '/overview'){
       
        res.writeHead(200,{"Content-type":"text/html"});
        const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.toString().replace("{%PRODUCT_CARDS%}", cardHtml);
        
  
        res.end(output);
    }
    //Product page
    else if(pathname === '/product'){
        console.log(query);
        res.writeHead(200,{'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const output= replaceTemplate(tempProduct,product)


        res.end(output);
    } //sends json file in the browser
    else if(pathname ==='/api'){
            res.writeHead(200,{"Content-type":"application/json" });
            res.end(data);
             
    }else{
        res.writeHead(404,{
           "Content-type": "text-html",
           "My-header" : 'hello-world'

        });
        res.end('<h1>Error</h1>');
    }
    
    // res.end('Server has been started!');
    
   
});

server.listen(8000, 'localhost', ()=>{
    console.log('listening t0 the request')
});




console.log('hello the server has started');






