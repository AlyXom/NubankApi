require("dotenv").config()
const path = require("path")

module.exports = {
    development: {
        client: "mysql2",
        connection: process.env.DATABASE_URL,
        pool: {
            afterCreate: (conn, cb) => {
              conn.query("SET foreign_key_checks = 1", (err) => {
                if (err) {
                  console.error(err);
                }
                cb(err, conn);
              });
            },
          },
        migrations: {
            directory: path.resolve(__dirname, "src", "database", "mysql", "migrations")
        },
        useNullAsDefault: true
    }
}