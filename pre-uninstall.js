const omelette = require('omelette')

try {
    omelette.cleanupShellInitFile()
} catch (e) {
    console.log(e)
}
