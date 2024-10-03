let player1Name = '';
let player2Name = '';
let player1Choice = '';
let player2Choice = '';
let round = 1;
let player1Score = 0;
let player2Score = 0;

function startGame() {
    player1Name = document.getElementById('player1-name').value;
    player2Name = document.getElementById('player2-name').value;

    if (player1Name && player2Name) {
        document.getElementById('player1-heading').innerText = player1Name;
        document.getElementById('player2-heading').innerText = player2Name;
        document.getElementById('player-name-form').style.display = 'none';
        document.querySelector('.round-info').style.display = 'block';
        document.querySelector('.players').style.display = 'flex';
        document.querySelector('.scoreboard').style.display = 'block';
    } else {
        alert('Please enter names for both players!');
    }
}

function playerChoice(player, choice) {
    if (player === 1) {
        player1Choice = choice;
    } else {
        player2Choice = choice;
    }

    if (player1Choice && player2Choice) {
        determineWinner();
    }
}

function determineWinner() {
    let resultText = '';

    if (player1Choice === player2Choice) {
        resultText = 'It\'s a tie!';
    } else if (
        (player1Choice === 'stone' && player2Choice === 'scissors') ||
        (player1Choice === 'scissors' && player2Choice === 'paper') ||
        (player1Choice === 'paper' && player2Choice === 'stone')
    ) {
        player1Score++;
        resultText = `${player1Name} wins this round!`;
    } else {
        player2Score++;
        resultText = `${player2Name} wins this round!`;
    }

    updateScoreboard(resultText);

    round++;
    if (round > 6) {
        endGame();
    } else {
        document.getElementById('round-number').innerText = round;
        player1Choice = '';
        player2Choice = '';
    }
}

function updateScoreboard(resultText) {
    document.getElementById('player1-score').innerText = `Player 1 Score: ${player1Score}`;
    document.getElementById('player2-score').innerText = `Player 2 Score: ${player2Score}`;
    document.getElementById('round-result').innerText = resultText;
}

function endGame() {
    let winner = '';
    if (player1Score > player2Score) {
        winner = `${player1Name} is the overall winner!`;
    } else if (player2Score > player1Score) {
        winner = `${player2Name} is the overall winner!`;
    } else {
        winner = 'The game ended in a tie!';
    }

    alert(winner);

    saveGameData();
    resetGame();
}

function saveGameData() {
    const gameData = {
        player1: player1Name,
        player2: player2Name,
        player1Score: player1Score,
        player2Score: player2Score,
        winner: player1Score > player2Score ? player1Name : (player2Score > player1Score ? player2Name : 'Tie')
    };

    fetch('/api/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
    })
    .then(response => response.json())
    .then(data => console.log('Game saved:', data))
    .catch((error) => console.error('Error saving game:', error));
}

function resetGame() {
    round = 1;
    player1Score = 0;
    player2Score = 0;
    player1Choice = '';
    player2Choice = '';
    document.getElementById('round-number').innerText = round;
    document.getElementById('player1-score').innerText = 'Player 1 Score: 0';
    document.getElementById('player2-score').innerText = 'Player 2 Score: 0';
    document.getElementById('round-result').innerText = '';
    document.getElementById('player-name-form').style.display = 'block';
    document.querySelector('.round-info').style.display = 'none';
    document.querySelector('.players').style.display = 'none';
    document.querySelector('.scoreboard').style.display = 'none';
}
