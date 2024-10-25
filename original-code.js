//write a function that renders the page with data. the data from the API will be passed in.
const renderPuppyData = (puppies) => {
  const main = document.querySelector(`main`);
  puppies.map(pup => {
  const puppySection = document.createElement(`section`)
  if (pup.teamId === 1863) {
    puppySection.id = `team-ruff-nameplate`
    puppySection.innerHTML = `
    <img class="puppy-pic" src="${pup.imageUrl}" alt="A photo of ${pup.name}">
    <img class="team-helmet" src="./images/ruffhelmet.jpg" alt="Team Ruff's Helmet">
    <h3>TEAM RUFF</h3>
    <h1>${pup.name}</h1>
    `;
  }
  if (pup.teamId === 1864) {
    puppySection.id = `team-fluff-nameplate`
    puppySection.innerHTML = `
    <img class="puppy-pic" src="${pup.imageUrl}" alt="A photo of ${pup.name}">
    <img class="team-helmet" src="./images/fluffhelmet.jpg" alt="Team Ruff's Helmet">
    <h3>TEAM FLUFF</h3>
    <h1>${pup.name}</h1>
    `;
  }
  const puppySectionID = pup.id;
  main.append(puppySection);
  document.addEventListener(`click`, (event) => {
    if (event.target =`section`) {
      // if (event.target === `${pup.name}`) {
      console.log(`${puppySectionID} clicked`);
      // }
    }
  });
});
};

//write a function that fetches player data from the API and converts it to usable data.
const getPuppyData = async () => {
  const puppyDataFetched = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/players');
  //convert that data into usable object
  const convertedPuppyData = await puppyDataFetched.json();
  //grab the data that I need
  const puppyData = convertedPuppyData.data.players;
  //TESTING BELOW - REMOVE
  console.log(puppyData);
  //return the data
  return puppyData;
  //pass this data through my render function ^^^
};

//write a function that fetches team data from the API and converts it to usable data.
const getTeamData = async () => {
  const teamDataFetched = await fetch ('https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/teams')
  //convert that data into usable object
  const convertTeamData = await teamDataFetched.json();
  //grab the data that I need
  const teamData = convertTeamData.data.teams;
  //TESTING BELOW - REMOVE
  console.log(teamData);
  //return the data
  return teamData;
  
}

//write a function that fetches team roster data from the API and converts it to usable data.
const getTeamRosterData = async () => {
  const teamDataFetched = await fetch ('https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/teams')
  //convert that data into usable object
  const convertTeamData = await teamDataFetched.json();
  //grab the data that I need
  const ruffRosterData = convertTeamData.data.teams[0].players;
  const fluffRosterData = convertTeamData.data.teams[1].players;
  //combine the roster data into one array using a spread opperator
  const combinedRosterData = [...ruffRosterData, ...fluffRosterData];
  //TESTING BELOW - REMOVE
  console.log(combinedRosterData);
  //return the data
  return combinedRosterData;
}

//use the Fisher-Yates shuffle algorithm to shuffle the combined roster data.
//this isn't really neccesary, but is a design/style choice as it will scramble
//my colored nameplates
const shufflePuppies = (pupArray) => {
  for (let i = pupArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pupArray[i], pupArray[j]] = [pupArray[j], pupArray[i]];
  }
  return pupArray;
};

//TESTING BELOW - REMOVE
getPuppyData();
getTeamData();
getTeamRosterData();

//run the code that funtion that grabs puppy data and then pass it into the render function.
getTeamRosterData().then(resolvedRosterData=> {
  const shuffledPuppies = shufflePuppies(resolvedRosterData);
  renderPuppyData(shuffledPuppies);
});
