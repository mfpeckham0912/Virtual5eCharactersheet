# D&D 5e Character Sheet

A simple, static web-based character sheet for Dungeons & Dragons 5th Edition.  
No server, no build step—just open in your browser and play.

## Features
- Automatic ability modifiers and proficiency calculations  
- Skill and saving-throw totals update live  
- In-browser dice roller with critical hit/miss logic  
- Save your sheet to a JSON file and load it back  
- Responsive layout works on desktop and mobile  

## Setup
1. Clone or download this repository  
2. Open `index.html` in any modern browser  

## Usage
1. Enter character details (name, class, level, ability scores, etc.)  
2. Toggle proficiency boxes to include the proficiency bonus  
3. Click on skills or use the roll controls to make d20 checks  
4. Add attacks in the “Attacks & Spellcasting” section  
5. Click **Save** to download your `.json` file  
6. Click **Load** and select your file to restore the sheet  

## Files
- `index.html` — main page markup  
- `css/app.css` — styling and layout  
- `javascript/` — logic modules:
  - `modifier.js`
  - `skills.js`
  - `savingthrow.js`
  - `perception.js`
  - `attacks.js`
  - `diceroller.js`
  - `storage.js`

## License
This project is released under the MIT License.  
