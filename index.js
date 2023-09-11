const { survey, test } = require('./models');

survey.findByPk(15).then(res => {
    console.log(res);
});