const Sequelize = require('sequelize')


const url = 'postgres://localhost:5432/sequelize_transaction_example'
const db = module.exports = new Sequelize(url, {
  logging(query, options, time) {
    console.log(query);
  },
  ssl: true,
  dialect: 'postgres',
  profile: true,
  define: {
    underscored: true,       // use snake_case rather than camelCase column names
    freezeTableName: true,   // don't change table names from the one specified
    timestamps: true,        // automatically include timestamp columns
  }
});

db.define('task', {
  latest: Sequelize.BOOLEAN
}, {
  hooks: {
    beforeCreate() {
      // silly thing to do in a hook to see if transaction gets passed
      return db.model('task').findAll({ where: {} });
    }
  }
});

module.exports.syncPromise = db.sync({ force: true })