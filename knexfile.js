module.exports = { 
    development = {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './data/requests.db3'
        }
    },
    migrations: {
        directory: './data/migrationd'
    },
    seeds: {
        directory: './data/seeds'
    }
}