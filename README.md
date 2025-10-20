# Wordle Game

A web-based implementation of the popular word guessing game Wordle, built with vanilla HTML, CSS, and JavaScript.

## 🚀 Live Demo

[Play Wordle Online](https://ziad-mohamed-dev.github.io/wordle/)

## 🎮 How to Play

1. **Objective**: Guess the secret 5-letter word in 6 attempts or less
2. **Input**: Type letters using your keyboard
3. **Submit**: Press Enter to submit your guess
4. **Delete**: Use Backspace to remove letters

## 🎨 Color Coding

- **Green**: Letter is correct and in the right position
- **Yellow**: Letter is in the word but in the wrong position  
- **Gray**: Letter is not in the word at all

## 📁 Project Structure

```
wordle/
├── index.html          # Main HTML file
├── script.js           # Game logic and functionality
├── style.css           # Styling and layout
└── README.md           # This file
```

## 🔧 Features

- **Interactive UI**: Click on the game board to focus input
- **Custom Dialog System**: Elegant modal dialogs for game messages
- **Loading States**: Visual feedback during API calls
- **Input Validation**: Ensures only valid 5-letter English words
- **Responsive Design**: Works on different screen sizes
- **Keyboard Support**: Full keyboard navigation

## 🌐 API Integration

This game uses the Frontend Masters Word API:

- **Word of the Day**: `https://words.dev-apis.com/word-of-the-day`
- **Word Validation**: `https://words.dev-apis.com/validate-word`

## 🎯 Game Rules

- You have **6 attempts** to guess the word
- Each guess must be a valid 5-letter English word
- The secret word changes daily
- Letters can appear multiple times in a word
- Duplicate letter handling follows Wordle rules

## 💻 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Styling, animations, and responsive design
- **JavaScript (ES6+)**: Game logic, API calls, and DOM manipulation

### Key Functions
- `submitGuess()`: Validates and processes user guesses
- `applyLetterColoring()`: Applies color coding based on correctness
- `validateWordWithAPI()`: Checks if guess is a valid English word
- `fetchSecretWord()`: Gets the daily word from API


## 🎨 Styling Features

- Clean, minimalist design
- Smooth animations for loading states
- Custom modal dialog system
- Hover effects and transitions
- Responsive grid layout for letters

**Enjoy playing Wordle!** 🎉