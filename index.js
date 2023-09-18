const fs = require('fs')
const http = require ('http')
const url = require ('url')

////////////////////////////////////
// FILES dengan FS

// blocking code execution -> synchronous
// const textIn = fs.readFileSync('./txt/read-this.txt','utf-8')
// console.log(textIn);

// const textOut = `ini tuh penjelasan tentang alpukat di b inggris : ${textIn}`
// fs.writeFileSync('./txt/output-penjelasan.txt', textOut)
// console.log('sukses nyetak surat cinta!');


// non blocking code execution -> asynchronous
// const test = fs.readFile('./txt/start.txt', 'utf-8', (err, data)=>{
//     if(err) return console.log('Ini error');
//     fs.readFile(`./txt/${data}.txt`, 'utf-8',(err,data2) => {
//         console.log(data2);

//         fs.writeFile(`./txt/gabungan.txt`, `${data}\n${data2}`, err  => {
//             console.log('sukses menggabungkan data');
//         })

//         fs.readFile(`./txt/final.txt`, 'utf-8',(err,data3) => {
        
//             fs.writeFile(`./txt/gabungan2.txt`, `${data2}\n${data3}`, err  => {
//                 console.log('sukses menggabungkan data2');
//             })
//         })
        
//     })

// })
// console.log('hai FSW 2');

////////////////////////////////////
// SERVER dengan HTTP

const replaceTemplate = (template,product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName)

    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%DESCRIPTION%}/g, product.description)
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
    output = output.replace(/{%FROM%}/g, product.from)
    output = output.replace(/{%ID%}/g, product.id)

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')

    return output
}

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)


const overviewPage = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const productTemplate = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')
const productCardTemplate = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')

const server = http.createServer((req, res) => {
    // const pathName = req.url
    const { pathname : pathName, query } = url.parse(req.url, true)

    // HELLO PAGE
    if (pathName === '/hello'){
        res.end('ini hello ke FSW 2')
    } 
    
    // PRODUCT PAGE
    else if (pathName === '/product'){
        console.log(query);
        res.writeHead(200, {
            'Content-Type' : 'text/html'
        })
        const product = dataObj[query.id]
        const output = replaceTemplate(productTemplate, product)
        res.end(output)
    } 
    
    // SIMPLE API
    else if(pathName === '/api'){
        res.writeHead(200, {
            'Content-Type' : 'application/json'
        })

        res.end(data)
    } 
    
    // OVERVIEW PAGE
    else if (pathName === '/overview'){
        res.writeHead(200, {
            'Content-Type' : 'text/html'
        })
        
        const productCardsHtml = dataObj.map(el => replaceTemplate(productCardTemplate, el))

        const output = overviewPage.replace('{%PRODUCTCARDS%}', productCardsHtml)
        res.end(output)
    }
    
    // 
    else {
        res.writeHead(404, {
            'Content-Type' : 'text/html'
        })
        res.end('<h1>url kosong</h1>')
    }

});
  
server.listen(8000,'127.0.0.1', ()=> {
    console.log('Server berjalan di http://localhost:8000');
});

