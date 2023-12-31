const filter = require('lodash/filter');
const head = require('lodash/head');
const each = require('lodash/each');
const fs = require('fs');

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;


const filter_id = argv.filter_id;

const { Survey, Test, Record, Filter } = require('./models');

Survey.hasMany(Test, {
  foreignKey: 'survey_id',
  as: 'tests'
});

Survey.hasMany(Record, {
    foreignKey: 'survey_id',
    as: 'records'
});

Test.belongsTo(Survey, {
  foreignKey: 'survey_id'
});
//console.log(Filter.sequelize);
Filter.findByPk(filter_id).then(res => {
    console.log(res.ids);
}).finally(() => Filter.sequelize.close());

// Survey.findOne({
//     where: {
//         id: 23
//     },
//     include:['tests', 'records']
// }).then(res => {

//     let tests = filter(res.tests, (v) => {
//         return v.config.main_trial === true && v.primes.length > 0;
//     });
//     //console.log(JSON.parse(JSON.stringify(tests)));

//     let logger = fs.createWriteStream('tests.txt', { flags: 'a'});
//     logger.write(JSON.stringify(tests));

//     //console.log(res.records.length);
//     let logger2 = fs.createWriteStream('responses.txt', { flags: 'a'});
//     const writeLine = (line) => logger2.write(`${line}\n`);
//     each(res.records, function (v) {
//         writeLine(JSON.stringify(v));
//     });

// }).finally(() => Survey.sequelize.close()); 

// Test.findByPk(15).then(res => {
//     console.log(res._targets);
// }).finally(() => sequelize.close());