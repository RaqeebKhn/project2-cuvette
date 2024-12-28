
let playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;

const choices = ['rock', 'paper', 'scissors'];


function updateScore() {
    const scoreElements = document.querySelectorAll('.score-box p');
    scoreElements[0].textContent = computerScore;
    scoreElements[1].textContent = playerScore;
    
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
}


function resetScores() {
    playerScore = 0;
    computerScore = 0;
    localStorage.setItem('playerScore', 0);
    localStorage.setItem('computerScore', 0);
    updateScore();
}


function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}


function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return 'tie';
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    }
    return 'computer';
}

function handleChoice(choice) {
    const computerChoice = getComputerChoice();
    const winner = getWinner(choice, computerChoice);
    
    const triangleContainer = document.querySelector('.triangle-container-parent');
    const resultContainer = document.createElement('div');
    resultContainer.className = 'result-container';
    
    resultContainer.innerHTML = `
        <div class="picks-container">
            <div class="pick-box">
                <h2>YOU PICKED</h2>
                <div class="${winner === 'player' ? 'winner-effect' : ''}">
                    <div class="circle ${getColorClass(choice)}">
                        <img src="images/${choice}.png" alt="${choice}">
                    </div>
                </div>
            </div>
            
            <div class="result-announcement">
                <h1>${getResultText(winner)}</h1>
                <button class="play-again" onclick="resetGame()">PLAY AGAIN</button>
            </div>

            <div class="pick-box">
                <h2>PC PICKED</h2>
                <div class="${winner === 'computer' ? 'winner-effect' : ''}">
                    <div class="circle ${getColorClass(computerChoice)}">
                        <img src="images/${computerChoice}.png" alt="${computerChoice}">
                    </div>
                </div>
            </div>
        </div>
    `;
    
    triangleContainer.parentNode.replaceChild(resultContainer, triangleContainer);
    
    if (winner === 'player') {
        playerScore++;
    } else if (winner === 'computer') {
        computerScore++;
    }
    
    updateScore();
    checkVictory(); 
}

function getColorClass(choice) {
    switch(choice) {
        case 'rock': return 'blue';
        case 'paper': return 'orange';
        case 'scissors': return 'purple';
        default: return '';
    }
}

function getResultText(winner) {
    switch(winner) {
        case 'player': return 'YOU WIN AGAINST PC';
        case 'computer': return 'YOU LOST AGAINST PC';
        default: return 'TIE UP';
    }
}

function checkVictory() {
    if (playerScore >= 5 || computerScore >= 5) {
        const isPlayerWinner = playerScore >= 5;
        const victoryScreen = document.getElementById('victory-screen');
        
        victoryScreen.innerHTML = `
            <div class="victory-content">
                <div class="trophy-with-stars">
                    <img src="images/trophy.png" alt="trophy" class="trophy">
                    <img src="images/stars.png" alt="stars" class="stars">
                </div>
                <h1>${isPlayerWinner ? 'HURRAY!!' : 'GAME OVER!'}</h1>
                <h2>${isPlayerWinner ? 'YOU WON THE GAME' : 'COMPUTER WON THE GAME'}</h2>
                <button class="play-again-btn" onclick="startNewGame()">PLAY AGAIN</button>
            </div>
            <button class="rules-btn" onclick="showPopup()">RULES</button>
        `;
        
        victoryScreen.style.display = 'flex';
    }
}


function startNewGame() {
    playerScore = 0;
    computerScore = 0;
    updateScore();
    document.getElementById('victory-screen').style.display = 'none';
    resetGame();
}


function resetGame() {
    const resultContainer = document.querySelector('.result-container');
    const triangleContainer = document.createElement('div');
    triangleContainer.className = 'triangle-container-parent';
    triangleContainer.innerHTML = `
        <div class="triangle-container-child">
            <div class="circle blue" onclick="handleChoice('rock')">
                <img src="images/rock.png" alt="rock">
            </div>
            <div class="circle purple" onclick="handleChoice('scissors')">
                <img src="images/scissors.png" alt="scissors">
            </div>
            <div class="circle orange" onclick="handleChoice('paper')">
                <img src="images/paper.png" alt="paper">
            </div>
            <div class="line line1"></div>
            <div class="line line2"></div>
            <div class="line line3"></div>
        </div>
    `;
    
    resultContainer.parentNode.replaceChild(triangleContainer, resultContainer);
}


function showPopup() {
    document.getElementById("popup").style.display = "block";
}


function closePopup() {
    document.getElementById("popup").style.display = "none";
}


document.addEventListener('DOMContentLoaded', function() {
    updateScore();
    
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
        circle.addEventListener('click', function() {
            const choice = this.querySelector('img').alt.toLowerCase();
            handleChoice(choice);
        });
    });
});