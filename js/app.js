//Displays number of cards based on player number input
const displayPlayerCards = () => {
    //Select Number of Players Input
    const playerNumInput = document.getElementById('num-of-players-input');
    //Get Number of Players Input Value
    const playerInputValue = parseInt(playerNumInput.value);

    //Hide error text 
    document.getElementById('error-text').style.display = 'none';

    //If there is no value or value is not a number, display error text
    if (!playerInputValue || isNaN(playerInputValue)) {
        //Unhide error text
        document.getElementById('error-text').style.display = '';
        return;
    }
    
    //Hide number of players input
    document.getElementById('num-of-players-div').style.display = 'none';

    let cardHTML = '';
    
    //Create HTML elements based on the number of players entered
    for (let i = 1; i <= playerInputValue; i++) {
        cardHTML += `
                <div class="card text-center" data-index="Player ${i}">
                <div class="card-header">
                    
                </div>
                <div class="card-body">
                    <input type="text" id="player${i}-name" class="player-name-input text-center" value="Player ${i}">
                    <p class="card-text display-4 player-score">0</p>
                    <button class="btn btn-light mx-2 subtract-btn">-</button><button class="btn btn-dark mx-2 add-btn">+</button>
                </div>
                </div>
          `;
    }

    //Add HTML to scoreboard container
    document.querySelector('#scoreboard-container').insertAdjacentHTML('beforeEnd', cardHTML);
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

