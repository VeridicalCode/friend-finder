
// dependencies: path module
const path = require('path');

//----------------HTML ROUTES ------------------

// server.js needs access to these, so wrap them in an export function
module.exports = (app) => {

  // basic route for homepage
  app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/home.html'));
  });

  // route to serve survey
  app.get('/survey', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/survey.html'));
  });

}

//-----------------end html---------------------