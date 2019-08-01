const command = 'search'
const description = 'Search notes in Bear. (Api-key required)'

module.exports = {
    command, description,

    handleArgs(args) {
        let argv = args.reset()
            .usage('Usage: bearcli search -k [keyword] -t [tag] -o [output]')
            .option('k', {
                alias: 'keyword',
                demand: true,
                type: 'string',
                description: 'Search keyword'
            })
            .option('t', {
                alias: 'tag',
                demand: false,
                type: 'string',
                description: 'Search tag'
            })
            .option('o', {
                alias: 'output',
                demand: false,
                choices: ['json', 'list'],
                default: 'list'
            })
            .argv
    }
}
