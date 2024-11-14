document.addEventListener('DOMContentLoaded', () => {
    let page1 = document.getElementById('page-1');
    let page2 = document.getElementById('page-2');
    let page3 = document.getElementById('page-3');
    let page4 = document.getElementById('page-4');
    let winnerPage = document.getElementById('winner-page');
    let attemptsLeft = document.getElementById('attempts-left');
    let feedback = document.getElementById('feedback');
    let startGameBtn = document.getElementById('start-game-btn');
    let confirmNumberBtn = document.getElementById('confirm-number-btn');
    let continueBtn = document.getElementById('continue-btn');
    let guessBtn = document.getElementById('guess-btn');
    let restartBtn = document.getElementById('restart-btn');
    let player1NameInput = document.getElementById('player1-name');
    let player1NumberInput = document.getElementById('player1-number');
    let player2NameInput = document.getElementById('player2-name');
    let player2GuessInput = document.getElementById('player2-guess');
    let winnerMessage = document.getElementById('winner-message');

    let player1Name = '';
    let player1Number = null;
    let player2Name = '';
    let attempts = 5;

    // Helper function to show error with shake effect on input field
    function showError(input) {
        input.classList.add('error'); // Apply the error class to the input to show red border and error text
    }

    // Helper function to hide error when input is corrected
    function hideError(input) {
        input.classList.remove('error'); // Remove error class from the input
    }

    // Add event listener for uppercase transformation for input fields
    function toUpperCase(input) {
        input.value = input.value.toUpperCase();
    }

    // Automatically convert text to uppercase when typed into input fields
    player1NameInput.addEventListener('input', () => {
        toUpperCase(player1NameInput);
        hideError(player1NameInput); // Remove error when typing starts
    });
    player2NameInput.addEventListener('input', () => {
        toUpperCase(player2NameInput);
        hideError(player2NameInput); // Remove error when typing starts
    });

    // Reset error when clicking on the input field
    player1NameInput.addEventListener('focus', () => hideError(player1NameInput));
    player1NumberInput.addEventListener('focus', () => hideError(player1NumberInput));
    player2NameInput.addEventListener('focus', () => hideError(player2NameInput));
    player2GuessInput.addEventListener('focus', () => hideError(player2GuessInput));

    startGameBtn.addEventListener('click', () => {
        player1Name = player1NameInput.value.trim();
        if (!player1Name) {
            showError(player1NameInput); // Show error if Player 1's name is empty
            return;
        }
        hideError(player1NameInput);

        // Update the page-2 title with Player 1's name dynamically
        let page2Title = document.querySelector('#page-2 h2');
        page2Title.textContent = `${player1Name} Choose a Number`;

        page1.style.display = 'none';
        page2.style.display = 'block';
    });

    confirmNumberBtn.addEventListener('click', () => {
        player1Number = parseInt(player1NumberInput.value, 10);
        if (isNaN(player1Number) || player1Number < 0 || player1Number > 9) {
            showError(player1NumberInput); // Show error if Player 1's number is invalid
            return;
        }
        hideError(player1NumberInput);
        page2.style.display = 'none';
        page3.style.display = 'block';
    });

    continueBtn.addEventListener('click', () => {
        player2Name = player2NameInput.value.trim();
        if (!player2Name) {
            showError(player2NameInput); // Show error if Player 2's name is empty
            return;
        }
        hideError(player2NameInput);

        // Update the page-4 title with Player 2's name dynamically
        let page4Title = document.querySelector('#page-4 h2');
        page4Title.textContent = `${player2Name} Guess ${player1Name}'s Number`;

        page3.style.display = 'none';
        page4.style.display = 'block';
    });

    guessBtn.addEventListener('click', () => {
        const player2Guess = parseInt(player2GuessInput.value, 10);

        if (isNaN(player2Guess) || player2Guess < 0 || player2Guess > 9) {
            showError(player2GuessInput); // Show error if Player 2's guess is invalid
            return;
        }
        hideError(player2GuessInput);

        if (player2Guess === player1Number) {
            winnerMessage.textContent = `${player2Name} wins! Congratulations! The correct number was ${player1Number}.`;
            winnerPage.style.display = 'block';
            page4.style.display = 'none';
        } else {
            attempts--;
            attemptsLeft.textContent = `You have ${attempts} attempts left`;
            if (attempts === 0) {
                winnerMessage.textContent = `${player1Name} wins! ${player2Name} ran out of attempts. The correct number was ${player1Number}.`;
                winnerPage.style.display = 'block';
                page4.style.display = 'none';
            } else {
                feedback.textContent = `Wrong guess! Try again.`;
            }
        }
    });

    restartBtn.addEventListener('click', () => {
        location.reload();
    });

    // Initialize first page view
    page1.style.display = 'block';
});
