/*
 * Server (Gateway) - Bootstrap
**/

const http = require('http')

const postgres = require('@/constructors/postgres');
const openrecord = require('@/constructors/openrecord');
const Express = require('@/constructors/Express');
const bodyParser = require("body-parser");
const logger = require('@/constructors/logger');
// const webPush = require('@/constructors/webPush');

const packageJson = require('@/package.json');

const routes = require('@/routes')

const app = Express();

const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

const run = async () => {
  http.createServer(app).listen(PORT, async () => {
    console.log(`API version ${packageJson.version}, listening on port ${PORT}`)
    const postgresClient = await postgres();
  })
}

module.exports = run;
