#D&D 5e Character Sheet

A lightweight, framework-free character sheet for Dungeons & Dragons 5th Edition.
Runs entirely in the browser, requires no server or build step, and preserves data as a flat JSON file.
Features

Automatic Calculations

    Ability modifiers from raw scores

    Skill totals and saving throws (with proficiency)

    Passive Perception (10 + Perception total)

    Initiative auto-filled from Dexterity modifier

In-Browser Dice Roller

    Ad-hoc d4–d20 rolls

    Clickable skills & saves to roll d20 + modifier

    Attack table integration with critical-hit doubling and miss messages

    Scrollable combat log

Save & Load JSON

    Exports entire sheet (all fields + attacks) to a human-readable JSON file

    Loads JSON to restore form state and recompute all derived fields

    No localStorage or cookies needed

Responsive Layout

    CSS Grid/Flexbox for desktop & mobile

    Collapses to a single column at narrow viewports (< 600 px)

Zero Dependencies

    Vanilla HTML 5, CSS 3, and modern JavaScript (ES2020)

    Deploy via GitHub Pages with no extra configuration

Repository Structure

├── index.html
├── css/
│   └── app.css
├── javascript/
│   ├── attacks.js
│   ├── diceroller.js
│   ├── modifier.js
│   ├── perception.js
│   ├── savingthrow.js
│   ├── skills.js
│   └── storage.js
└── README.md

    index.html – main sheet markup

    css/app.css – layout & styling

    javascript/ – core logic modules

Getting Started

    Clone the repository
    git clone https://github.com/<username>/dnd-5e-charsheet.git
    cd dnd-5e-charsheet

    Open in browser

        Double-click index.html, or

        Run a local HTTP server (recommended):
        npx http-server .
        Visit http://localhost:8080.

    Use the sheet

        Fill in character details, scores, skills, attacks, and equipment

        Click Save to download your .json file

        Click Load and select a saved file to restore

Contributing

Contributions and issue reports are welcome! Please:

    Fork the repo

    Create a branch: git checkout -b feature/YourFeature

    Commit your changes: git commit -m "Add YourFeature"

    Push to your fork: git push origin feature/YourFeature

    Open a Pull Request describing your changes

Ensure new code follows the existing naming conventions (e.g., IDs ending in score for modifier hooks).
License

This project is licensed under the MIT License.
Core rule text is used under the Open Game License 1.0a; see OGL-1.0a.md for details.
Acknowledgments

    Wizards of the Coast D&D 5e System Reference Document

    Inspired by community tools and actual-play streams like Critical Role
