const Sequelize = require('sequelize')
const cls = require('cls-hooked')


module.exports = function({ sequelize }) {
  if (!sequelize || !(sequelize instanceof Sequelize)) {
    throw new Error('must be passed an instance of Sequelize');
  }

  if (Sequelize.cls) {
    namespace = Sequelize.cls;
  } else {
    namespace = cls.createNamespace('express-sequelize-transaction');
    Sequelize.cls = namespace;
  }

  return function(req, res, next) {
    sequelize.transaction(async function(t) {
      next();
      await new Promise((resolve) => res.on('finish', resolve));
    })
    .catch(next)
  }
}