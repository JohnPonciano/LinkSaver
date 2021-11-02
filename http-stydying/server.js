const fs = require('fs')
const http = require('http')
const path = require('path')


http.createServer((req, res)=>{


    const file = req.url === '/' ? 'index.html' : req.url

    const filePath = path.join(__dirname,'public',file)
    const extname = path.extname(filePath)
    const allowedFileTypes = ['.html','.css','.js']
    const allowed = allowedFileTypes.find(item=> item == extname)

    if (!allowed) return

    fs.readFile(
      filePath,
             (err, content) => {
                 if (err) throw err
  
                  res.end(content)
              }
         )
         
}).listen(3500, ()=> console.log('Server is Running'))