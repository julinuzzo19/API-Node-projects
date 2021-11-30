var mysql = require('mysql');
require('dotenv').config();

let db_config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_USER_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'challenge_estoes'
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);

  connection.connect((err) => {
    if (err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });
  connection.on('error', (err) => {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;
