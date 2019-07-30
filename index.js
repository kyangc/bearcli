#! /usr/bin/env node

const invoker = require('./src/invoker')
const yargs = require('yargs')
const config = require('./src/utils/config-parser.js')
const C = require('./src/consts.js')

// read and require all commands
let commands = require('path').join(__dirname, 'src/commands')
require('fs').readdirSync(commands).forEach((file) => {
    if (file && file.endsWith('.js')) {
        let command = require(`${commands}/${file}`)
        if (command && command.action && command.description && command.parseArgs) {
            yargs.command(command.command, command.description, (args) => {
                // defaultly add token params
                let param = command.parseArgs(args)
                let token = config.queryConfig(C.CONFIG_KEY_APP_KEY)
                if (token && param) {
                    param['token'] = token
                }
                invoker.invoke(command.action, param)
            })
        }
    }
})

// add user info saver
yargs.command('adduser', 'Save your app key.', (args) => {
    let argv = args.reset()
        .usage('Usage: bearcli adduser -k [your app-id]')
        .option('k', {
            alias: 'appkey',
            demand: true,
            type: 'string',
            description: 'Your Bear\'s app-key'
        })
        .argv
    if (argv.k && argv.k.length > 0) {
        config.saveConfig(C.CONFIG_KEY_APP_KEY, argv.k)
        console.log('App-key registered!')
    }
})

// noinspection BadExpressionStatementJS
yargs.usage('Usage: bearcli [actions] [params]')
    .help('h')
    .alias('h', 'help')
    .alias('v', 'version')
    .epilog('Copyright 2019')
    .argv
