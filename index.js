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
const server = http.createServer((req, res) => {
    const pathName = req.url

    if (pathName === '/hello'){
        res.end('ini hello ke FSW 2')
    } else if (pathName === '/product'){
        res.end(JSON.stringify({
            data: 'Ini product'
        }));
    } else if(pathName === '/api'){
        const data = fs.readFileSync(`${__dirname}/dev-data/data.json`)
        res.writeHead(200, {
            'Content-Type' : 'application/json'
        })

        res.end(data)
    } 
    else if (pathName === '/overview'){
        const overviewPage = fs.readFileSync(`${__dirname}/templates/overview.html`)
        res.writeHead(200, {
            'Content-Type' : 'text/html'
        })
        res.end(overviewPage)
    }
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

