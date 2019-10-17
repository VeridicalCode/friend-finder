// required modules & routing js
const express = require('express');
const path = require('path');

// set up express
const app = express();
const PORT = process.env.PORT || 3042;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// start listening
app.listen(PORT, function () {
  console.log(`App listening on PORT ${PORT}`);
});
//--------------- end server -------------------

//-------------------- DATA --------------------

// user data stored here

var usersArray = [
	{
		name: `Chrisjen`,
		photo: `photo.url`,
		scores: [
			1,
			2,
			3,
			5,
			1,
			5,
			3,
			1,
			2,
			2
		]
	},
	{
		name: `Bobbie`,
		photo: `photo.url`,
		scores: [
			2,
			5,
			1,
			3,
			2,
			2,
			5,
			2,
			1,
			2
		]
	},
	{
		name: `Anna`,
		photo: `photo.url`,
		scores: [
			4,
			2,
			5,
			3,
			4,
			2,
			2,
			1,
			4,
			3
		]
	},
	{
		name: `Camina`,
		photo: `photo.url`,
		scores: [
			1,
			1,
			2,
			4,
			3,
			4,
			5,
			3,
			2,
			1
		]
	},
	{
		name: `Praxidike`,
		photo: `photo.url`,
		scores: [
			3,
			3,
			1,
			5,
			3,
			1,
			2,
			3,
			2,
			4
		]
	},
	{
		name: `Jim`,
		photo: `photo.url`,
		scores: [
			3,
			1,
			1,
			1,
			5,
			2,
			3,
			1,
			2,
			4
		]
	},
	{
		name: `Naomi`,
		photo: `photo.url`,
		scores: [
			2,
			3,
			2,
			5,
			3,
			5,
			3,
			3,
			2,
			3
		]
	},
	{
		name: `Amos`,
		photo: `photo.url`,
		scores: [
			1,
			2,
			4,
			5,
			1,
			1,
			4,
			5,
			2,
			2
		]
	},
	{
		name: `Alex`,
		photo: `photo.url`,
		scores: [
			3,
			4,
			3,
			4,
			2,
			4,
			3,
			2,
			2,
			5
		]
	},
	{
		name: `Josephus`,
		photo: `photo.url`,
		scores: [
			4,
			2,
			3,
			4,
			4,
			1,
			5,
			4,
			5,
			3
		]
	}
]
//------------------end data--------------------
//----------------HTML ROUTES ------------------

// basic route for homepage
app.get('/', (req, res) => {
  console.log('sending homepage')
  res.sendFile(path.join(__dirname, '/public/home.html'));
});

// route to serve survey
app.get('/survey', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/survey.html'));
});


//-----------------end html---------------------
//-----------------API ROUTES ------------------

// post to survey to read user answers
app.post('/survey', (req, res) => {
  console.log('collecting survey data')
  // post math
});

// debug route to display all current users
app.get('/api/users', (req, res) => {
  console.log('sending json')
  res.json(usersArray);
});

// function to compare user to potential friends
function findIndexOfBestMatch(inputArray){
  let affinityArray = [];   // empty array, to push relative similiarity scores into
  let leastIndex = 0; // index of the user most similar to current user
  usersArray.forEach((i)=>{ // loop through the user item
    const currentArray = usersArray[i].scores;
    let subtractionArray = [];
    currentArray.forEach((j)=>{
      subtractionArray.push(Math.abs(currentArray[j]-inputArray[j]));
    })
    const sum = subtractionArray.reduce((a,b)=>{a+b}); // once subtraction array is fully populated, sum it
    affinityArray.push(sum); // store in affinityArray; will have same index there as user does in user array
  });
  // once everybody is looped, get the index of the lowest # in affinity array (answers most like input)
  affinityArray.forEach((k)=>{
    if (affinityArray[k] < affinityArray[leastIndex]) {
      leastIndex = k; // compare current to index, if lower, current is new index
    }
  })
  return leastIndex;
}

// function to post the most compatible friend

// function to push new user to user list. run this AFTER comparison so users don't match themselves
function pushNewUserToUsers(name, photoURL, scoresArray){
  usersArray.push({
    name: name,
    photo: photoURL,
    scores: scoresArray
  });
}

//-----------------end api---------------------