/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgres://wtgajghi:kYMWWgFnOpoI7apcDJ4LuDlehVny4Xi-@heffalump.db.elephantsql.com/wtgajghi",
  DATABASE_URL_DEVELOPMENT = "postgres://rbkhmwbi:4HaB8R-u3IO5Vlc2GqGFAI80s03TK0ye@heffalump.db.elephantsql.com/rbkhmwbi",
  DATABASE_URL_TEST = "postgres://aetedyrg:CBNogOy_ldtthg5O9aLddQvYYhgIQnLS@heffalump.db.elephantsql.com/aetedyrg",
  DATABASE_URL_PREVIEW = "postgres://qupvtdrd:eTVa8ylOidgTtPzDrHR7nKMrW_YXzOmS@heffalump.db.elephantsql.com/qupvtdrd",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
