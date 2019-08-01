const command = 'create'
const action = 'create'
const description = 'Create a new note.'

module.exports = {

    action, description, command,

    parseArgs(arg) {
        let argv = arg.reset()
            .usage(`Usage: bearcli ${action} [params]`)
            .option('t', {
                alias: 'title',
                description: 'note title',
                type: 'string',
                demand: false,
                default: 'Note Title'
            })
            .option('b', {
                alias: 'body',
                description: 'note body',
                type: 'string',
                demand: false,
                default: 'Note content.'
            })
            .option('tags', {
                description: 'note tags',
                type: 'string',
                demand: false
            })
            .option('p', {
                alias: 'pin',
                description: 'pin the note to the top',
                demand: false,
                type: 'boolean'
            })
            .argv

        return {
            title: argv.t,
            text: argv.b,
            tags: argv.tags,
            pin: argv.p ? 'yes' : 'no'
        }
    }
}
