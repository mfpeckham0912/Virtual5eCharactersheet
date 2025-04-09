// save.js

// Function to save the character sheet data as a JSON file.
function saveSheet() {
  // Create an object to hold the sheet data.
  var sheet = {};

  // Select all input, textarea, and select elements in the document.
  var elements = document.querySelectorAll("input, textarea, select");

  // Loop through each element and store its value in the sheet object.
  elements.forEach(function(el) {
    // Use the element's "name" attribute as the key.
    var name = el.getAttribute("name");
    if (!name) return;
    
    // For checkboxes, store whether the box is checked.
    if (el.type === "checkbox") {
      sheet[name] = el.checked;
    } else {
      sheet[name] = el.value;
    }
  });

  // Convert the sheet object to a JSON string with indentation for easy reading.
  var json = JSON.stringify(sheet, null, 2);

  // Create a Blob from the JSON string.
  var blob = new Blob([json], { type: "application/json" });
  var url = URL.createObjectURL(blob);

  // Create a temporary link element, set its download attribute, and trigger a click.
  var a = document.createElement("a");
  a.href = url;
  a.download = "characterSheet.json";
  document.body.appendChild(a);
  a.click();

  // Clean up the temporary element and revoke the object URL.
  setTimeout(function() {
    a.remove();
    URL.revokeObjectURL(url);
  }, 100);
}
