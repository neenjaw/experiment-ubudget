module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host : '127.0.0.1',
            user : 'ubuser',
            password : 'ubuser',
            database : 'ubudget'
        },
        migrations: {
            directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds/dev'
        },
        useNullAsDefault: true
    }
};

