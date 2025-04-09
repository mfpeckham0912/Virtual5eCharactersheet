// load.js

// Function to load the character sheet data from a JSON file.
function loadSheetFromFile(file) {
  if (!file) return;
  
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var sheet = JSON.parse(e.target.result);
      
      // Loop through each key in the sheet object.
      for (var name in sheet) {
        if (!sheet.hasOwnProperty(name)) continue;
        
        // Retrieve all elements matching this name.
        var elements = document.getElementsByName(name);
        if (elements.length > 0) {
          Array.prototype.forEach.call(elements, function(el) {
            // For checkboxes, set the "checked" state.
            if (el.type === "checkbox") {
              el.checked = sheet[name];
            } else {
              el.value = sheet[name];
            }
          });
        }
      }
    } catch (err) {
      console.error("Error parsing sheet JSON:", err);
    }
  };
  reader.readAsText(file);
}

// Initialize the load sheet listener on the hidden file input.
function initLoadSheetListener() {
  var fileInput = document.getElementById("load-sheet-input");
  if (fileInput) {
    fileInput.addEventListener("change", function(e) {
      loadSheetFromFile(e.target.files[0]);
    });
  }
}

// Function to trigger the file input dialog.
function loadNewSheet() {
  var fileInput = document.getElementById("load-sheet-input");
  if (fileInput) {
    fileInput.click();
  }
}

// Initialize the listener once the DOM content is loaded.
document.addEventListener("DOMContentLoaded", function() {
  initLoadSheetListener();
});
