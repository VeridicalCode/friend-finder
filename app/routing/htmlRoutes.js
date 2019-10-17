
// required modules & routing js
const express = require('express');
const path = require('path');

// set up express
const app = express();
const PORT = process.env.PORT || 3042;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("routing"));

// start listening
app.listen(PORT, function () {
  console.log(`App listening on PORT ${PORT}`);
});

// basic route for homepage
app.get('/', (req, res) => {
    console.log('sending homepage')
    res.sendFile(path.join(__dirname, 'home.html'));
});

// route to serve survey
app.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, 'survey.html'));
});

// debug route to display all current users
app.get('/api/users', (req, res) => {
    console.log('sending json')
    res.json(usersArray);
});