const fs = require('fs')
const yaml = require('js-yaml')
const os = require('os')
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
    }
}
