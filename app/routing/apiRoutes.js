//-----------------API ROUTES ------------------

// pull data from model folder
const usersArray = require('../data/friends.js');

// function to compare user to potential friends
function findIndexOfBestMatch(inputArray) {
  let affinityArray = [];   // empty array, to push relative similiarity scores into
  let leastIndex = 0; // index of the user most similar to current user
  usersArray.forEach((i) => { // loop through the user item
    const currentArray = i.scores;
    let subtractionArray = [];
    currentArray.forEach((j) => {
      const var1 = parseInt(currentArray[j]);
      const var2 = parseInt(inputArray[j]);
      subtractionArray.push(Math.abs(var1 - var2));
    })
    const sum = subtractionArray.reduce((a, b) => {return a + b }); // once subtraction array is fully populated, sum it
    affinityArray.push(sum); // store in affinityArray; will have same index there as user does in user array
  });
  // once everybody is looped, get the index of the lowest # in affinity array (answers most like input)
  for (let k = 0; k < affinityArray.length; k++) {
    if (affinityArray[k] < affinityArray[leastIndex]) {
      leastIndex = k; // compare current to index, if lower, current is new index
    }
  }
  return leastIndex;
}

// we'll need these routes in server.js so wrap them in an export function
module.exports = (app) => {
  
  // post to survey to read user answers
  app.post('/survey', (request, response) => {
    // req.body was a new user object; run the findIndex function on its array key
    const indexOfBestVar = findIndexOfBestMatch(request.body.scores);
    // now push new user object to model
    usersArray.push(request.body);
    // and send the result object back for the html to display
    response.send(usersArray[indexOfBestVar]);
  });

  // debug route to display all current users
  app.get('/api/users', (request, response) => {
    response.json(usersArray);
  });
}



//-----------------end api---------------------