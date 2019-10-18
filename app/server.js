// dependencies
const express = require('express');

// set up express
const app = express();
const PORT = process.env.PORT || 3042;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up routers
require('./routing/apiRoutes')(app);
require('./routing/htmlRoutes')(app);

// start listening
app.listen(PORT, function () {
  console.log(`App listening on PORT ${PORT}`);
});