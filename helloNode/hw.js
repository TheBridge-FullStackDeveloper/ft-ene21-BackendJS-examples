const moment = require('moment'); // require

let laHora = moment().format('LTS');  // 11:41:21 AM

console.log(`Hola mundo, son las ${laHora}`);