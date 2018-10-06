const fs = require('fs');
const path = require('path');

const readModelFilenamesFromPath = (dirPath) => (
  fs
  .readdirSync(dirPath)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !==  path.basename(module.filename)) &&
    (file.slice(-3) === '.js')
  )
);


module.exports = ({ sequelize, Sequelize }) => {
  const importSequelizeModel = (filename) => sequelize.import(path.join(__dirname, filename));

  const modelFilenames = readModelFilenamesFromPath(__dirname);

  const models = modelFilenames.map(filename => importSequelizeModel(filename));

  const db = {};

  models.forEach(model => (db[model.name] = model));
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};
