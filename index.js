//write a function that renders the page with data. the data from the API will be passed in.
const renderPuppyData = (puppies) => {
  const main = document.querySelector(`main`);
  puppies.forEach(pup => {
  const puppySection = document.createElement(`section`)
  puppySection.innerHTML = `
  <h1>${pup.name}</h1>
  `;
  main.append(puppySection);
  });
};

//write a function that fetches data from the API and converts it to user-readable html.
const getPuppyData = async () => {
  const dataFetched = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/players');
  //convert that data into usable object
  const convertedData = await dataFetched.json();
  //grab the data I need from the object
  const puppyData = convertedData.data.players;
  return puppyData;
  //pass this data through my render function ^^^
};

getPuppyData().then(resolvedPuppyData => {
  renderPuppyData(resolvedPuppyData);
});
