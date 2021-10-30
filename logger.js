const EventEmmiter = require('events')
const fs = require('fs')
const path = require('path')
const emitter = new EventEmmiter()


emitter.on('log',(message)=>{
    console.log(message)
})

function log(message){
    fs.appendFile(path.join(__dirname,'log.txt'), message, (err) =>{
        if (err) throw err
    })
}



module.exports = log