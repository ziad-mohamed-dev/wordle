// DOM Elements
const gameBoard = document.querySelector(".game-board");
const userInput = document.querySelector(".user-input");
const dialog = document.querySelector(".dialog");
const closeDialogBtn = document.querySelector(".closeBtn");
const dialogMsg = document.querySelector(".msg");

// Game Configuration
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

// Game State
let currentGuessCount = 0;
let currentGuess = "";
let secretWord = "";
let isLoading = false;
let isGameOver = false;

// When the user click on game board will make the user focus on the input
gameBoard.addEventListener("click", () => {
	userInput.focus();
});

// Open dialog with a message
const openDialog = (msg) => {
	dialogMsg.textContent = msg;
	dialog.classList.add("dialog-open");
};

// Close dialog when close button is clicked
closeDialogBtn.addEventListener("click", () => {
	dialog.classList.remove("dialog-open");
	dialogMsg.textContent = "";
});

// Validates if a character is a letter
function isValidLetter(character) {
	return /^[a-zA-Z]$/.test(character);
}

// Gets the current word row element based on guess count
const getCurrentWordRow = () =>
	gameBoard.querySelectorAll(".word")[currentGuessCount];

// Adds a letter to the current guess
const addLetterToGuess = (letter) => {
	if (currentGuess.length === WORD_LENGTH) {
		// Replace the last letter if word is already full
		currentGuess =
			currentGuess.substring(0, WORD_LENGTH - 1) + letter.toLowerCase();
	} else {
		currentGuess += letter.toLowerCase();
	}
};

// Removes the last letter from the current guess
const removeLastLetter = () => {
	currentGuess =
		currentGuess.length === 0
			? ""
			: currentGuess.substring(0, currentGuess.length - 1);
};

// Shows loading state for the current word row
const showLoadingState = () => {
	isLoading = true;
	const currentWordRow = getCurrentWordRow();
	currentWordRow.classList.add("loading-word");
};

// Hides loading state for the current word row
const hideLoadingState = () => {
	isLoading = false;
	const currentWordRow = getCurrentWordRow();
	currentWordRow.classList.remove("loading-word");
};

// Validates if the current guess is a valid English word
const validateWordWithAPI = async () => {
	try {
		const response = await fetch("https://words.dev-apis.com/validate-word", {
			method: "POST",
			body: JSON.stringify({
				word: currentGuess,
			}),
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();
		return data.validWord;
	} catch (error) {
		console.error("Error validating word:", error);
		return false;
	}
};

// Fetches the secret word from the API
const fetchSecretWord = async () => {
	try {
		const response = await fetch("https://words.dev-apis.com/word-of-the-day");
		const data = await response.json();
		return data.word.toLowerCase();
	} catch (error) {
		console.error("Error fetching secret word:", error);
		return null;
	}
};

// Applies color coding to letters based on their correctness
const applyLetterColoring = (secretWord) => {
	const currentWordRow = getCurrentWordRow();
	const guessedLetters = currentGuess.split("");
	const secretLetters = secretWord.split("");

	// First pass: Mark exact matches (green)
	guessedLetters.forEach((letter, index) => {
		if (secretLetters[index] === letter) {
			guessedLetters[index] = null; // Mark as processed
			secretLetters[index] = null; // Remove from available letters
			currentWordRow
				.querySelectorAll(".letter")
				[index].classList.add("correct-letter");
		}
	});

	// Second pass: Mark letters in wrong position (yellow) and wrong letters (gray)
	guessedLetters.forEach((letter, index) => {
		if (!letter) return; // Skip already processed letters

		const letterIndex = secretLetters.indexOf(letter);
		if (letterIndex !== -1) {
			secretLetters[letterIndex] = null; // Remove from available letters
			currentWordRow
				.querySelectorAll(".letter")
				[index].classList.add("present-letter");
		} else {
			currentWordRow
				.querySelectorAll(".letter")
				[index].classList.add("wrong-letter");
		}
	});
};

// Processes and validates the current guess
const submitGuess = async () => {
	// Validate guess length
	if (currentGuess.length !== WORD_LENGTH) {
		openDialog(`The guessed word must be ${WORD_LENGTH} letters`);
		return;
	}

	showLoadingState();

	// Validate if it's a real English word
	const isValidWord = await validateWordWithAPI();
	if (!isValidWord) {
		hideLoadingState();
		openDialog("Invalid English word");
		return;
	}

	// Get the secret word if we don't have it yet
	if (!secretWord) {
		secretWord = await fetchSecretWord();
		if (!secretWord) {
			hideLoadingState();
			openDialog("Error loading game. Please refresh.");
			return;
		}
	}

	hideLoadingState();

	// Apply coloring based on correctness
	applyLetterColoring(secretWord);

	// Check win condition
	if (secretWord === currentGuess) {
		openDialog("You Win!!!");
		isGameOver = true;
		return;
	}

	// Move to next guess
	currentGuess = "";
	currentGuessCount++;

	// Check lose condition
	if (currentGuessCount === MAX_GUESSES) {
		isGameOver = true;
		openDialog(`You Lose!!! The word was: ${secretWord.toUpperCase()}`);
	}
};

// Synchronizes the current guess with the input field
const syncInputField = () => {
	userInput.value = currentGuess;
};

// Updates the visual display of the current guess
const updateGuessDisplay = () => {
	const currentWordRow = getCurrentWordRow();
	const letterElements = currentWordRow.querySelectorAll(".letter");

	for (let i = 0; i < WORD_LENGTH; i++) {
		letterElements[i].textContent = currentGuess[i] || "";
	}
};

// Event listener for keyboard input
userInput.addEventListener("keydown", (event) => {
	if (isLoading || isGameOver) return;

	const { key } = event;

	if (key === "Backspace") {
		removeLastLetter();
	} else if (key === "Enter") {
		submitGuess();
	} else if (!isValidLetter(key)) {
		event.preventDefault();
	} else {
		addLetterToGuess(key);
	}

	syncInputField();
	updateGuessDisplay();
});
