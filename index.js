//write a function that fetches player data from the API and converts it to usable data.
const getPuppyData = async () => {
  const puppyDataFetched = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/players');
  //convert that data into usable object
  const convertedPuppyData = await puppyDataFetched.json();
  //grab the data that I need
  const puppyData = convertedPuppyData.data.players;
  //return the data
  return puppyData;
};

//write a function that fetches team data from the API and converts it to usable data.
const getTeamData = async () => {
  const teamDataFetched = await fetch ('https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/teams')
  //convert that data into usable object
  const convertTeamData = await teamDataFetched.json();
  //grab the data that I need
  const teamData = convertTeamData.data.teams;
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
  //pass this data through my render function ^^^
};

//write a function that renders the page with data. the data from the API will be passed in.
const renderPuppyData = (puppies) => {
  const main = document.querySelector(`main`);
  puppies.map(pup => {
  const puppySection = document.createElement(`section`)
  //the function makes one of two different nameplates (sections), depending on the puppy's team
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
   main.append(puppySection);
  //the funcion creates an event listener for each nameplate
   puppySection.addEventListener(`click`, (event) => {
      main.innerHTML = `
      <img class="big-pup-pic" src="${pup.imageUrl}" alt=A photo of "${pup.name}">
      <p>'${pup.name} is a ${pup.breed}. They are one of this years' 
      star players! ${pup.name} is currently on the ${pup.status}.</p>
      <button>Go back to all puppies!</button>
      `;
    });
  });
};

//run the funtion that grabs puppy data and then pass it into the render function.
getTeamRosterData().then(resolvedRosterData=> {
  const shuffledPuppies = shufflePuppies(resolvedRosterData);
  renderPuppyData(shuffledPuppies);
});

//add functionality to re-render the page when the user wants to return to the list of puppies.
//the user can either click either the logo or 'go back to all puppies!' button to go back
const logo = document.querySelector(`#logo`);
const button =document.querySelector(`button`);
const mainReloaded = document.querySelector(`main`);
logo.addEventListener(`click`, (event) => {
  mainReloaded.innerHTML = ``;
  getTeamRosterData().then(resolvedRosterData=> {
    const shuffledPuppies = shufflePuppies(resolvedRosterData);
    renderPuppyData(shuffledPuppies);
  });
});
button.addEventListener(`click`, (event) => {
  mainReloaded.innerHTML = ``;
  getTeamRosterData().then(resolvedRosterData=> {
    const shuffledPuppies = shufflePuppies(resolvedRosterData);
    renderPuppyData(shuffledPuppies);
  });
});   
