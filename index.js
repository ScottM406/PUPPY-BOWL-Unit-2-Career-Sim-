//write a function that renders the page with data. the data from the API will be passed in.
const renderPuppyData = (puppies) => {
  const main = document.querySelector(`main`);
  puppies.map(pup => {
  const puppySection = document.createElement(`section`)
  puppySection.innerHTML = `
  <img id="puppy-pic" src="${pup.imageUrl}" alt="A photo of ${pup.name}">
  <h1>${pup.name}</h1>
  `;
  main.append(puppySection);
  document.addEventListener(`click`, (event) => {
    if (event.target =`section`) {
      // if (event.target === `${pup.name}`) {
      // console.log(`${pup.name} clicked`);
      // }
    }
  });
});
};

//write a function that fetches data from the API and converts it to user-readable html.
const getPuppyData = async () => {
  const dataFetched = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/players');
  //convert that data into usable object
  const convertedData = await dataFetched.json();
  //grab the data I need from the object
  const puppyData = convertedData.data.players;
  console.log(puppyData);
  return puppyData;
  //pass this data through my render function ^^^
};

//run the code that funtion that grabs puppy data and then pass it into the render function.
getPuppyData().then(resolvedPuppyData => {
  renderPuppyData(resolvedPuppyData);
});
