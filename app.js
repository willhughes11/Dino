document.body.onload = dinos;

// Create Dino Constructor
  function Dino({species, weight, height, diet, where, when, fact}) {
      this.species = species;
      this.weight= weight;
      this.height= height;
      this.diet= diet;
      this.facts = [
          fact,
          `${this.species} lived in ${where}`,
          `${this.species} lived during the ${when}`,         
        ]

  }

// Create Dino Objects
let dinoArr = [];

function dinos(){
   const myJson = {
    "Dinos": [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "Herbivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "Carnivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "Herbivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "Herbivore",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "Herbivore",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "Carnivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "Carnivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "Herbivore",
            "where": "World Wide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs."
        }
    ]
}
   dinoArr = myJson.Dinos.map(dino => new Dino(dino));     
 }

// Create Human Object

function human(){
    return (function(){
        let humanObject = {};
        humanObject.diet = document.getElementById('diet').value;
        let inputs = document.getElementsByTagName('input');
        for (const _ of inputs) { humanObject[_.name] = _.value; }
        humanObject.height = 12* parseInt(humanObject.feet) + parseInt(humanObject.inches);
        return humanObject;

  })()
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function ({height}) {
    this.facts.push( `${this.species} is ${
      (this.height / height).toPrecision(2)
    } times your height.`)
  };

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function ({weight}) {
    this.facts.push(`${this.species} is ${
      (this.weight / weight).toPrecision(2)
    } times your weight.`)
  };

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function ({diet}) {
   this.facts.push(`The ${this.species} is a ${this.diet} and you are a ${diet}`);
  };


// Add tiles to DOM
  
function addTilesToDOM({name}) {
    const grid = document.getElementById('grid');
    dinoArr.map(dino => {
      const tile = document.createElement('div');
      tile.className = 'grid-item';
  
      const title = document.createElement('h3');
      title.className = 'h2';
      if (dino.species) {
        title.innerHTML = dino.species;
      } else {
        title.innerHTML = name;
      }
  
      const fact = document.createElement('p');
      fact.className = 'p';
      const factsArray = dino.facts;
      let randomFact = '';
  
      if (factsArray) {
        randomFact = factsArray[Math.floor(Math.random() * factsArray.length)];
      }
  
      if (dino.species == 'Pigeon') {
        fact.innerHTML = dino.facts[0];
      } else {
        fact.innerHTML = randomFact;
      }
  
      const image = document.createElement('img');
      image.className = 'img';
      dino.species?image.src = `./images/${dino.species}.png`:image.src =`./images/human.png`;

      tile.append(fact);
      tile.append(image);
      tile.append(title);
      grid.append(tile);
    });
  }
  
// Remove form from screen
 
function removeFormFromScreen() {
   const form = document.getElementById('dino-compare');
   form.innerHTML = '';
}

// On button click, prepare and display infographic
 
const button = document.getElementById('btn');
button.addEventListener('click', function () {
  const user = human();
  dinoArr.splice(4,0,user);
 
  dinoArr.map(dino => {
    if (dino.species) {
      dino.compareHeight(user);
      dino.compareWeight(user);
      dino.compareDiet(user);
    }
  });
  addTilesToDOM(user);
  removeFormFromScreen();
});