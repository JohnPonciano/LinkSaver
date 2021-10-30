const os = require('os')
const log = require ('./logger')
const {freemem,totalmem,platform,hostname,networkInterfaces} = os


setInterval(()=>{
    const mem = parseInt(freemem()/1024/1024)
    const total = parseInt(totalmem()/1024/1024)
    const percent = parseInt((mem/total) * 100)
    const host = hostname()
    const interfaces = networkInterfaces()
    const date = Date(`dd-mm-yy`);

    //GET IP usign this code 
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }


    const stats = {
        Day: `${date}`,
        OS:`${platform()}`,
        HostName:`${host}`,
        IPv4:`${addresses}`,
        Free: `${mem} MB `,
        Total: `${total} MB `,
        Usage: `${percent}%`
    }

    console.clear()
    console.log(" == PC STATS ==")
    console.table(stats)
    log(`${JSON.stringify(stats)}\n`)
},1000)

