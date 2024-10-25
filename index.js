// step 1: FETCH PUPPIES https://fsa-puppy-bowl.herokuapp.com/api/2409-FTB-ET-WEB-FT/players
// use an async function to fetch puppies and call it later for it to display
const fetchPuppies = async () => {
  // call the puppies API
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2409-FTB-ET-WEB-FT/players`);
  const responsejson = await response.json();
  const puppiesData = responsejson.data;
  return puppiesData.players
  // console.log(puppyData)
};
console.log(fetchPuppies())



// step 2: DISPLAY PUPPIES
// use an async function to display puppies
const displayPuppies = async () => {
  // create a variable to link fetchPuppies function
  const puppiesList = await fetchPuppies();
  // console.log(displayPuppies())
  // displayPuppies()
  
  
  // use a function to map through each puppy
  const puppiesListLIs = puppiesList.map((puppie) => {
    // create an li and return for each puppy name
    return `<li data-id="${puppie.id}">${puppie.name}</li>` //added data-id attribute. each li now includes a data-id attribute corresponding to the puppy ID.
    // console.log()
  });

    // create the ol
    const OL = document.createElement(`ol`)
    // append the li to the ol.innerhtml using .join(``)
    OL.innerHTML = puppiesListLIs.join(``)
    // grab the main
    const main = document.querySelector(`main`)
    // append
    main.replaceChildren(OL) // changed from append to replaceChildren to get the button to work
    // console.log(main)
    
    
    //step 3: ADD EVENT LISTENER TO CLICK ON EACH PUPPY TO BRING TO NEW PAGE using (something) method
    // grab all the puppyLIs
    const puppyLIs = document.querySelectorAll(`li`);
    // use .foreach to go through all puppy LIs
    puppyLIs.forEach((puppy) => {
      // add event listener to each puppy LI when user clicks
      puppy.addEventListener(`click`, (event) => {
        // get the puppyid from the data attribute
        const puppyID = event.target.dataset.id
        // console.log(puppyID)
        // call function to display the new page based on puppyID
        displayPuppyDetails(puppyID);
      });
    });
};


// step 4: DISPLAY PUPPY DETAILS IN A NEW PAGE (puppy name, picture, details) along with a "back" button
// use an async funtion to call the API based on puppyID
const displayPuppyDetails = async (puppyID) => {
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2409-FTB-ET-WEB-FT/players/${puppyID}`);
  const responseJson = await response.json();
  const puppyDetails = responseJson.data.player
  console.log(puppyDetails)
  
  // create a new page with puppyDetails in the main
  // grab the main
  const main = document.querySelector(`main`)
  // string the main tag
  main.innerHTML = `
    <h2>${puppyDetails.name}</h2>
    <img src="${puppyDetails.imageUrl}" alt="${puppyDetails.name}">
    <p>CohortID: ${puppyDetails.cohortId}<p>
    <p>Team: ${puppyDetails.team.name}</p>
    <p>Team ID: ${puppyDetails.teamId}</p>
    <p>Age: ${puppyDetails.createdAt}</p>
    <p>Breed: ${puppyDetails.breed}</p>
    <p>Position: ${puppyDetails.status}</p>
    <button>Back</button>
  `;

  // step 5: Add event listener to back button to display all puppies
  // grab button
  const button = document.querySelector(`button`)
  // add event listener to button
  button.addEventListener(`click`, () => {
    // call displaypuppies function to go back
    displayPuppies();
  });

};
displayPuppies() 

