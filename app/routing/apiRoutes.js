// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {

    var currSubmissionName = req.body.name
    var currSubmissionPhotoURL = req.body.photo
    var currSubmissionScoresArr = req.body.scores
    var numericScoresArr = []

    console.log("hey you hit me 1")


    // make scores numeric
    for (var i = 0; i < currSubmissionScoresArr.length; i++) {
      numericScoresArr.push(parseInt(currSubmissionScoresArr[i]))
    }

    console.log("hey you hit me 2")


    var currSubmission = {
      name: currSubmissionName,
      photo: currSubmissionPhotoURL,
      scores: numericScoresArr
    };

    console.log("hey you hit me 3")


    var prevFriendsArrDiffs = 0

    console.log("friends arr length: " + friends.length)
    console.log(currSubmission)


    // get cumulative diffs bw arrays
    for (var i = 0; i < friends.length; i++) {

      var currFriendsArrDiffs = 0
      var winnerIndex = 0

      console.log("hey you hit inside 1 i=" + i)


      for (var j = 0; j < friends[i].scores.length; j++) {
        var diffBetweenCurrElements = Math.abs(friends[i].scores[j] - numericScoresArr[j])
        currFriendsArrDiffs = currFriendsArrDiffs + diffBetweenCurrElements
      }

      console.log("hey you hit inside 2 i=" + i)


      // if on the first loop, your smallest difference will be the current friend, else, do the comparison
      if (i == 0) { // YO ARE YOU SERIOUS THIS LINE CAUSED ME TO GO INTO AN INFINITE LOOP THAT MADE ME UNABLE TO SUBMIT ANYMORE THAN ONE REQUEST THAT I WAS DEBUGGING FOR AN HOUR BECAUSE THE CONDITION I WROTE WAS i=0 INSTEAD OF i==0
        prevFriendsArrDiffs = currFriendsArrDiffs
        winnerIndex = 0 // i=0
      } else {
        if (currFriendsArrDiffs < prevFriendsArrDiffs) {
          winnerIndex = i
        }
      }

      console.log("hey you hit inside 3 i=" + i)


    }

    console.log("hey you hit me 4")


    var winner = friends[winnerIndex]

    res.json(winner)

    friends.push(currSubmission)
  });

};
