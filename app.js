const express = require('express');
const cors = require('cors');
require('dotenv');
require('./app/config/config');

const app = express();
const projectRouter = require('./app/routes/project-route');
const docsRouter = require('./app/routes/docs-route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/projects', projectRouter);
app.use('/api/docs', docsRouter);



var port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`Server on port http://localhost:${port}/`);
});




module.exports = app;
