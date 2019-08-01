const command = 'adduser'
const description = 'Add Bear\'s Api-Key.'
const config = require('../utils/config-parser')

module.exports = {

    command, description,

    handleArgs(args) {
        let argv = args.reset()
            .usage('Usage: bearcli adduser -k [your api-key]')
            .option('k', {
                demand: false,
                type: 'string',
                description: 'Your Bear\'s api-key'
            })
            .argv

        if (argv.k && argv.k.length > 0) {
            config.saveAppKey(argv.k)
        } else {
            // prompt to user for interaction
            require('inquirer').prompt([
                {
                    name: 'sure',
                    message: `You have a previous api-key:${config.getAppKey()}, do you still want to change it?`,
                    type: 'confirm',
                    when: () => {
                        return config.hasAppKey()
                    }
                },
                {
                    name: 'key',
                    message: 'What\'s your Bear\'s Api-key?',
                    type: 'input',
                    when: (ans) => {
                        if (ans.hasOwnProperty('sure')) {
                            return ans.sure
                        } else {
                            return true
                        }
                    },
                    validate: (ans) => {
                        return config.validationKey(ans)
                    }
                }
            ]).then((ans) => {
                if (ans.hasOwnProperty('key') && ans.key && ans.key.length > 0) {
                    config.saveAppKey(ans.key)
                }
            }).catch((e) => {
                console.log(e)
            })
        }
    }
}
