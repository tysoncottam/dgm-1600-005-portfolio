async function getAPIData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
// senator arrays available for use
// todo refactor to use const to avoid alttering original arrays
let allSenators = [];
let simpleSenators = [];
let republicans = [];
let democrats = [];
let utah = [];
let utahMapped = [];
let ageSort = [];

const theData = getAPIData("senators.json").then(data => {
  allSenators = data.results[0].members;
  //returns a map of all senators to the simpleSenators array
  simpleSenators = senatorMap(allSenators);
  //filters to republican senators
  republicans = filterSenators(simpleSenators, "R");
  //filters to democrat senators
  democrats = filterSenators(simpleSenators, "D");
  console.log(allSenators);
  //finds senators who have utah as their home state
  utah = findUtah(simpleSenators, "UT");
  utahMapped = senatorMap(utah);
});
//!-------------------------------------------------------FILTER SENATORS.JSON. put in .then method when ready to implement
function filterSenators(simpleList, partyAffiliation) {
  return simpleList.filter(senator => senator.party === partyAffiliation);
  // console.log(party)
}
function findUtah(allSenators, state) {
  return allSenators.filter(senator => senator.state === state);
}
//!-------------------------------------------------------MAP SENATORS.JSON
function senatorMap(allOfThem) {
  let results = allOfThem.map(senator => {
    return {
      id: senator.id,
      name: `${senator.first_name} ${senator.last_name}`,
      party: senator.party,
      age: `${calculate_age(new Date(senator.date_of_birth))}`,
      state: senator.state,
      office: senator.office,
      phone: senator.phone,
      gender: senator.gender,
      total_votes: senator.total_votes,
      twitter: senator.twitter_account,
      missed_votes_pct: senator.missed_votes_pct
    };
  });
  return results;
}
//!-------------------------------------------------------EXAMPLE OF REDUCE METHOD
const testArray = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const testReduce = testArray.reduce((accumlator, currentValue) => {
  return accumlator + currentValue;
}, 0);
//returns the total votes made by the array that is passed in
// used this reduce to display total votes

// option to add total missed votes for a selected filtered group
//!-------------------------------------------------------REDUCE SENATORS.JSON

function totalVotes(senatorList) {
  const results = senatorList.reduce((acc, senator) => {
    return acc + senator.total_votes;
  }, 0);
  return results;
}
function totalVotesMissed(senatorList) {
  let len = senatorList.length;
  console.log(len);
  const results = senatorList.reduce((acc, senator) => {
    return acc + senator.missed_votes_pct;
  }, 0);
  return (results / len).toFixed(2);
}
//*calculates the oldest senator not used in project
function oldestSenator(senatorList) {
  return senatorList.reduce((oldest, senator) => {
    return (oldest.age || 0) > senator.age ? oldest : senator;
  }, {});
}
const container = document.querySelector(".container");
// populates the DOM with the senator selection
function populateDom(senator_array) {
  senator_array.forEach(senator => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const cardImage = document.createElement("div");
    cardImage.setAttribute("class", "card-image");
    const figure = document.createElement("figure");
    figure.setAttribute("class", "image ");
    const figureImage = document.createElement("img");
    figureImage.src = `https://www.congress.gov/img/member/${senator.id.toLowerCase()}_200.jpg`;
    figureImage.alt = "Placeholder image";
    // handles the 404 issue if no image present. only doug jones is missing!!!
    figureImage.addEventListener("error", event => {
      let noImage = event.target;
      //!image is from doug jones' twitter page NOTE!!! does not work if a second senator is missing an image
      noImage.src =
        "https://pbs.twimg.com/profile_images/1020031896741400577/RvxrHrIA_400x400.jpg";
    });

    figure.appendChild(figureImage);
    cardImage.appendChild(figure);
    card.appendChild(cardImage);
    //added this after creating the cardContent function
    card.appendChild(cardContent(senator));
    container.appendChild(card);
  });
}
function cardContent(senator) {
  // *create DOM ELEMENTS to later append items to. changed to const to avoid reassignment
  const cardContent = document.createElement("div");
  const media = document.createElement("div");
  const mediaLeft = document.createElement("div");
  const figure = document.createElement("figure");
  const img = document.createElement("img");

  cardContent.setAttribute("class", "card-content");
  media.setAttribute("class", "media");
  mediaLeft.setAttribute("class", "media-left");
  figure.setAttribute("class", "image is-48x48");
  img.src = `./images/independent.png`;
  img.alt = "Placeholder image";
  if (senator.party === "R") {
    img.src = `./images/republicans.png`;
  } else if (senator.party === "D") {
    img.src = `./images/democrat.png`;
  }
  const mediaContent = document.createElement("div");
  mediaContent.setAttribute("class", "media-content");
  const titleP = document.createElement("p");
  titleP.setAttribute("class", "title is-6");
  titleP.textContent = `${senator.name}`;
  const subTitleP = document.createElement("p");
  subTitleP.setAttribute("class", "subtitle is-6");
  subTitleP.textContent = `Home state: ${senator.state}`;

  const tweet = document.createElement("img");
  tweet.setAttribute("class", "tweet image is-48x48 media-right");
  tweet.src = `./images/twitter.png`;
  const link = document.createTextNode("View Twitter");
  tweet.onclick = function() {
    window.location.href = `http://twitter.com/${senator.twitter}`;
  };
  const contentDiv = document.createElement("div");
  contentDiv.setAttribute("class", "content");
  contentDiv.textContent = `Office: ${senator.office}. Phone: ${senator.phone}`;
  const contentBreak = document.createElement("br");
  const ageP = document.createElement("p");
  ageP.textContent = `Age: ${senator.age}`;

  mediaContent.appendChild(titleP);
  mediaContent.appendChild(subTitleP);
  mediaContent.appendChild(tweet);
  tweet.appendChild(link);

  tweet.title = "this is a link";
  tweet.href = `http://twitter.com/${senator.twitter}`;
  figure.appendChild(img);
  mediaLeft.appendChild(figure);
  media.appendChild(mediaLeft);
  media.appendChild(mediaContent);

  contentDiv.appendChild(contentBreak);
  contentDiv.appendChild(ageP);
  cardContent.appendChild(media);
  cardContent.appendChild(contentDiv);

  return cardContent;
}
//*calculates the age of each senator
function calculate_age(dob) {
  let diff_ms = Date.now() - dob.getTime();
  let age_dt = new Date(diff_ms);
  return Math.abs(age_dt.getUTCFullYear() - 1970);
}
function sortSenatorsByAge(senatorList) {
  return senatorList.sort(function(a, b) {
    return a.age - b.age;
  });
}

const selectElement = document.querySelector(".senator");
function deleteNodes() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
// select list functions and display calls*************************************************
// could add reduce function to show vote percentage per sorted array*************************************************

selectElement.addEventListener("change", event => {
  const result = document.querySelector(".result");
  const result2 = document.querySelector(".result2");

  deleteNodes();
  if (`${event.target.value}` === "") {
    location.reload();
  }
  if (`${event.target.value}` === "Utah Senators") {
    populateDom(utah);
    result2.textContent = `Total Senate Votes: ${totalVotes(utah)}`;
  }
  if (`${event.target.value}` === "Democrats") {
    populateDom(democrats);
    result2.textContent = `Total Senate Votes: ${totalVotes(democrats)}`;
  }
  if (`${event.target.value}` === "Republicans") {
    populateDom(republicans);
    result2.textContent = `Total Senate Votes: ${totalVotes(republicans)}`;
  }
  if (`${event.target.value}` === "All Senators") {
    populateDom(simpleSenators);
    result2.textContent = `Total Senate Votes: ${totalVotes(simpleSenators)}`;
  }
  if (`${event.target.value}` === "All Sen By Age") {
    populateDom(sortSenatorsByAge(simpleSenators));
    result2.textContent = `Total Senate Votes: ${totalVotes(simpleSenators)}`;
  }
  result.textContent = `Showing results for: ${event.target.value}`;
  result.addEventListener("click", () => {
    location.reload();
  });
});
