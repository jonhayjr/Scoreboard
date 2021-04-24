//Hide error text initially
document.getElementById('error-text').style.display = 'none';


const displayPlayerCards = () => {
    const playerNumInput = document.getElementById('num-of-players-input');
    const playerInputValue = parseInt(playerNumInput.value);

    //Hide error text 
    document.getElementById('error-text').style.display = 'none';

    if (!playerInputValue || isNaN(playerInputValue)) {
        //Unhide error text
        document.getElementById('error-text').style.display = '';
        return;
    }
    
    //Hide number of players input
    document.getElementById('num-of-players-div').style.display = 'none';

    let cardHTML = '';
    
    for (let i = 1; i <= playerInputValue; i++) {
        cardHTML += `
                <div class="card text-center" data-index="Player ${i}">
                <div class="card-header">
                    
                </div>
                <div class="card-body">
                    <input type="text" id="player${i}-name" class="player-name-input">
                    <h5 class="card-title player-name">Player ${i}</h5>
                    <p class="card-text player-score">0</p>
                    <button class="btn btn-light mx-2 subtract-btn">-</button><button class="btn btn-dark mx-2 add-btn">+</button>
                </div>
                </div>
          `
    }

    document.querySelector('#scoreboard-container').insertAdjacentHTML('beforeEnd', cardHTML);
}


document.getElementById('num-of-players-button').addEventListener('click', displayPlayerCards);


document.querySelector('body').addEventListener('click', (e) => {
    if (e.target.classList.contains('add-btn')) {
        const scoreElement = e.target.previousElementSibling.previousElementSibling;
        let scoreHTML = parseInt(scoreElement.innerHTML);
        scoreHTML++;
        scoreElement.innerHTML = scoreHTML;
    }

    if (e.target.classList.contains('subtract-btn')) {
        const scoreElement = e.target.previousElementSibling;
        let scoreHTML = parseInt(scoreElement.innerHTML);
        scoreHTML--;
        scoreElement.innerHTML = scoreHTML;
    }
})

document.querySelector('body').addEventListener('keyup', (e) => {
    if (e.target.nodeName === 'INPUT' && e.target.classList.contains('player-name-input')) {
        const nameElement = e.target.nextElementSibling;
        const previousHTML = nameElement.innerHTML;

        if (e.target.value) {
            nameElement.innerHTML = e.target.value;
        } else {
            nameElement.innerHTML =  e.target.parentElement.parentElement.getAttribute("data-index");
        }
 
    }
})

