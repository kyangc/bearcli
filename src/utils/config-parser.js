const fs = require('fs')
const yaml = require('js-yaml')
const os = require('os')
const C = require('../consts')
const configPath = `${os.homedir()}/.bearcli.yml`

function saveConfigObj(obj) {
    try {
        createEmptyConfigFileIfNeeded(configPath)
        fs.writeFileSync(configPath, yaml.dump(obj), 'utf8')
    } catch (e) {
        console.log(e)
    }
}

function readConfigObj() {
    // read yml object
    try {
        createEmptyConfigFileIfNeeded(configPath)
        let config = yaml.load(fs.readFileSync(configPath))
        if (config) {
            return config
        }
    } catch (e) {
        return undefined
    }
}

function createEmptyConfigFileIfNeeded(path) {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '# bearcli run-control file', 'utf8')
    }
}

module.exports = {

    queryConfig(key) {
        let configObj = readConfigObj()
        if (configObj) {
            return configObj[key]
        } else {
            return undefined
        }
    },

    saveConfig(key, value) {
        let configObj = readConfigObj()
        if (!configObj) {
            configObj = {}
        }
        configObj[key] = value
        saveConfigObj(configObj)
    },

    hasAppKey() {
        return !!this.queryConfig(C.CONFIG_KEY_APP_KEY)
    },

    getAppKey() {
        return this.queryConfig(C.CONFIG_KEY_APP_KEY)
    },

    saveAppKey(key) {
        let result = this.validationKey(key)
        if (typeof result === 'boolean' && result) {
            this.saveConfig(C.CONFIG_KEY_APP_KEY, key)
        } else {
            console.log(`Failed in save api-key: ${result}`)
        }
    },

    validationKey(key) {
        if (key && key.length > 0) {
            let ary = key.split('-')
            if (ary && ary.length === 3) {
                let invalid = false
                for (let sp of ary) {
                    if (!sp || sp.length !== 6) {
                        invalid = true
                    }
                }
                if (invalid) {
                    return 'App-key\'s every segment is a 6-length part'
                } else {
                    return true
                }
            } else {
                return 'App-key should be a *-*-* style string'
            }
        } else {
            return 'App-key can not be empty'
        }
    }
}
