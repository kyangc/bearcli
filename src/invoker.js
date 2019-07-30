const shell = require('shelljs')
const supportXCall = require('fs').existsSync('/Applications/xcall.app/Contents/MacOS/xcall')

module.exports = {

    invoke(action, params) {
        let baseUrl = `bear://x-callback-url/${action}?`

        if (params) {
            for (let key in params) {
                let v = params[key]
                if (v) {
                    baseUrl = `${baseUrl}${key}=${encodeURIComponent(v)}&`
                }
            }
        }

        if (baseUrl.endsWith('&')) {
            baseUrl = baseUrl.substr(0, baseUrl.length - 1)
        }

        if (baseUrl.endsWith('?')) {
            baseUrl = baseUrl.substr(0, baseUrl.length - 1)
        }

        if (supportXCall) {
            console.log(`Supports XCall!`)
            let shellCommand = `/Applications/xcall.app/Contents/MacOS/xcall -url "${baseUrl}&x-success="`
            // console.log(`exec shell script: \n${shellCommand}`)
            shell.exec(shellCommand)
        } else {
            let shellCommand = `open "${baseUrl}"`
            // console.log(`exec shell script: \n${shellCommand}`)
            shell.exec(shellCommand)
        }
    }
}
