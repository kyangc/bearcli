const shell = require('shelljs')
const supportXCall = require('fs').existsSync('/Applications/xcall.app/Contents/MacOS/xcall')
const config = require('./utils/config-parser')
const clear = require('clear')
const C = require('./consts')

module.exports = {

    supportXCall,

    invoke(action, params) {
        let baseUrl = `bear://x-callback-url/${action}?`

        if (params) {
            // add token if exists
            let token = config.queryConfig(C.CONFIG_KEY_APP_KEY)
            if (token) {
                params['token'] = token
            }

            // build url
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

        if (!supportXCall) {
            let shellCommand = `/Applications/xcall.app/Contents/MacOS/xcall -url "${baseUrl}&x-success="`
            shell.exec(shellCommand)
            clear(true)
        } else {
            let shellCommand = `open "${baseUrl}"`
            shell.exec(shellCommand)
        }
    }
}
