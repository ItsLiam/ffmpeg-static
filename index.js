'use strict'

if (process.env.FFMPEG_BIN) {
    module.exports = process.env.FFMPEG_BIN
} else {
    var os = require('os')
    var path = require('path')

    var binaries = Object.assign(Object.create(null), {
        darwin: ['x64'],
        linux: ['x64', 'ia32', 'arm64', 'arm'],
        win32: ['x64', 'ia32']
    })

    var platform = process.env.npm_config_platform || os.platform()
    var arch = process.env.npm_config_arch || os.arch()

    var normalized;

    switch (platform) {
        case 'darwin':
            normalized = 'mac';
            break;
        case 'win32':
            normalized = 'win';
            break;
        case 'linux':
            normalized = 'linux';
    }

    var ffmpegPath = path.join(
        __dirname,
        normalized === 'win' ? 'ffmpeg.exe' : 'ffmpeg'
    )

    if (!binaries[normalized] || binaries[normalized].indexOf(arch) === -1) {
        ffmpegPath = null
    }

    module.exports = ffmpegPath
}
