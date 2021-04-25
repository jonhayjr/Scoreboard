
//Displays number of cards based on player number input
const displayPlayerCards = () => {
    //Select Number of Players Input
    const playerNumInput = document.getElementById('num-of-players-input');
    //Get Number of Players Input Value
    let playerInputValue = parseInt(playerNumInput.value);

    //If there is no value or value is not a number, display error text
    if (!playerInputValue || isNaN(playerInputValue)) {
        return;
    }

    //Saves input value to local storage
    localStorage.setItem('Number-Of-Players', JSON.stringify(playerInputValue));
    

    //Creates HTML elements for scoreboard
    createScoreboardHTML(playerInputValue);
}

//Creates HTML content
const createScoreboardHTML = (num) => {
    let cardHTML = '';
    
    //Create HTML elements based on the number of players entered
    for (let i = 1; i <= num; i++) {
        cardHTML += `
                <div class="card text-center" data-index="Player ${i}">
                <div class="card-header">
                    
                </div>
                <div class="card-body">
                    <input type="text" id="player${i}-name" class="player-name-input text-center" value="Player ${i}">
                    <p class="card-text display-4 player-score" id="player${i}-score">0</p>
                    <button class="btn btn-light mx-2 subtract-btn">-</button><button class="btn btn-dark mx-2 add-btn">+</button>
                </div>
                </div>
          `;
    }
    //Adds HTML to scoreboard container
    document.querySelector('#scoreboard-container').innerHTML = cardHTML;

    //Get saved values from local storage
    getItems();
}

//Adds event listener to submit button for number of players inputs.  On click, the displayPlayerCards function runs
document.getElementById('num-of-players-button').addEventListener('click', displayPlayerCards);

//Adds event listener to the body
document.querySelector('body').addEventListener('click', (e) => {

    //Checks to see if add button was clicked
    if (e.target.classList.contains('add-btn')) {
        //Selects score element
        const scoreElement = e.target.previousElementSibling.previousElementSibling;
        //Grabs current score
        let scoreHTML = parseInt(scoreElement.innerHTML);
        //Adds 1 to current score
        scoreHTML++;
        //Updates score element HTML
        scoreElement.innerHTML = scoreHTML;
    }
    //Checks to see if subtract element was clicked
    if (e.target.classList.contains('subtract-btn')) {
        //Selects score element
        const scoreElement = e.target.previousElementSibling;
        //Grabs current score
        let scoreHTML = parseInt(scoreElement.innerHTML);
        //Subtracts 1 from the current score
        scoreHTML--;
        //Updates score element HTML
        scoreElement.innerHTML = scoreHTML;
    }
})

//Saves player name and score items to local storage
const saveItems = () => {
    const playerNames = document.querySelectorAll('.player-name-input');
     playerNames.forEach(name => {
         localStorage.setItem(name.id, JSON.stringify(name.value));
     })

     const playerScores = document.querySelectorAll('.player-score');
     playerScores.forEach(score => {
        localStorage.setItem(score.id, JSON.stringify(score.innerHTML));
    })
}

//Gets player name and score values from local storage 
const getItems = () => {
    const playerNames = document.querySelectorAll('.player-name-input');
    playerNames.forEach(name => {
        const localStorageValue = JSON.parse(localStorage.getItem(name.id));
        if (localStorageValue) {
            name.value = localStorageValue;
        }
    })

    const playerScores = document.querySelectorAll('.player-score');
     playerScores.forEach(score => {
        const localStorageValue = JSON.parse(localStorage.getItem(score.id));
        if (localStorageValue) {
            score.innerHTML = localStorageValue;
        }
    })
}

//Removes local storage settings and sets default values;
const removeItems = () => {
    const playerNames = document.querySelectorAll('.player-name-input');
    playerNames.forEach(name => {
        localStorage.removeItem(name.id);
        const defaultName = name.parentElement.parentElement.getAttribute('data-index');
        name.value = defaultName;
    }) 

    const playerScores = document.querySelectorAll('.player-score');
    playerScores.forEach(score => {
       localStorage.removeItem(score.id);
        score.innerHTML = '0';
   })

   //Remove scorecard HTML
   const scoreboardContainer = document.getElementById('scoreboard-container');
   scoreboardContainer.innerHTML = '';

   //Clear number of players input
   const playerNumberInput = document.getElementById('num-of-players-input');
   playerNumberInput.value = '';

   //Clear number of players from local storage
   localStorage.removeItem('Number-Of-Players');
}



//Adds event listener to body on click
document.querySelector('body').addEventListener('click', (e) => {
    //If save button is clicked, save to local storage
    if (e.target.id === 'save-button') {
        saveItems();
    }
    //If clear button is clicked, clear local storage and set default values
    if (e.target.id === 'clear-button') {
        removeItems();
    }
});

//When content is load, check to see if number of players is stored in local storage and create Elements based on that.
document.addEventListener('DOMContentLoaded', () => {
    const localStorageValue = JSON.parse(localStorage.getItem('Number-Of-Players'));
    if (localStorageValue) {
        createScoreboardHTML(parseInt(localStorageValue));
        document.getElementById('num-of-players-input').value = localStorageValue;
    }
});

//This function checks to see if hide link is clicked and then hides or shows number of players div
document.querySelector('#hide').addEventListener('click', () => {
    const hideLink = document.querySelector('#hide');
    const div = document.querySelector('#num-of-players-div');
    if (hideLink.innerHTML === 'Hide') {
        div.style.display = 'none';
        hideLink.innerHTML = 'Show';
    } else {
        div.style.display = '';
        hideLink.innerHTML = 'Hide';
    }
})