// Author: Theodor Peifer

const os = require("os");


export function getSysInfo() {
    return {
        osName: os.type(),
        totalRam: os.totalmem() / (1024**3),
        leftRam: os.freemem() / (1024**3)
    }
}

