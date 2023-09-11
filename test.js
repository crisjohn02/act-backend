const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('ast2', 'root', 'secret', {
    host: 'localhost',
    dialect: 'mysql'
  });

  class Survey extends Model {}

Survey.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    config: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'surveys',
    timestamps: false,
    modelName: 'Survey'
});

class Test extends Model {}

Test.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    targets: {
        type: DataTypes.JSON,
        allowNull: true
    },
    primes: {
        type: DataTypes.JSON,
        allowNull: true
    },
    config: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'tests',
    timestamps: false,
    modelName: 'Test'
});

Survey.hasMany(Test, {
  foreignKey: 'survey_id',
  as: 'tests'
})

Test.belongsTo(Survey, {
  foreignKey: 'survey_id'
})

  try {
    // sequelize.authenticate().then(() => {
    //   Survey.findByPk(15).then(res => {
    //       console.log(res);
    //   });
    // }).finally(() => {
    //   sequelize.close()
    // });
    Survey.findOne({
      where: {
        id: 15
      },
      include: 'tests'
    }).then(res => {
      console.log(JSON.stringify(res, null, 2));
    }).finally(() => sequelize.close());
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }