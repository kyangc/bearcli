const invoker = require('./bear-invoker')
const fuzzy = require('fuzzy')

function bindBearActionCommands(yargs) {
    let dir = require('path').join(__dirname, '../src/bear-commands')
    require('fs').readdirSync(dir).forEach((file) => {
        if (file && file.endsWith('.js')) {
            let c = require(`${dir}/${file}`)
            if (c && c.command && c.action && c.description && c.parseArgs) {
                yargs.command(c.command, c.description, (args) => {
                    invoker.invoke(c.action, c.parseArgs(args))
                })
            }
        }
    })
}

function bindNormalCommands(yargs) {
    let dir = require('path').join(__dirname, '../src/normal-commands')
    require('fs').readdirSync(dir).forEach((file) => {
        if (file && file.endsWith('.js')) {
            let c = require(`${dir}/${file}`)
            if (c && c.command && c.description && c.handleArgs) {
                yargs.command(c.command, c.description, (args) => {
                    c.handleArgs(args)
                })
            }
        }
    })
}

function prepareCompletion(yargs) {
    yargs.completion('build-completion', 'Generate completions for bearcli.', (currentCommand, argv) => {
        let source = ['create', 'weekly', 'search', 'adduser']
        return fuzzy.filter(currentCommand, source).map((e) => {return e.string})
    })
}

module.exports = {

    run() {
        let yargs = require('yargs')

        // read and require all bear commands
        bindBearActionCommands(yargs)

        // read and require all normal commands
        bindNormalCommands(yargs)

        // run yargs
        let args = yargs.usage('Usage: bearcli [actions] [params]')
            .help('h')
            .alias('h', 'help')
            .alias('v', 'version')
            .epilog('Copyright 2019')
            .argv
    }
}
