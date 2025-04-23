document.addEventListener('DOMContentLoaded', () => {
  const form      = document.querySelector('form.charsheet');
  const saveBtn   = document.getElementById('saveBtn');
  const loadBtn   = document.getElementById('loadBtn');
  const fileInput = document.getElementById('fileInput');

  // --- SAVE ---
  saveBtn.addEventListener('click', () => {
    const data = {};
    // gather every named/id’d form control
    Array.from(form.elements).forEach(el => {
      const key = el.name || el.id;
      if (!key) return;
      if (el.type === 'checkbox') {
        data[key] = el.checked;
      } else {
        data[key] = el.value;
      }
    });

    // download as JSON
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'character-sheet.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  // --- LOAD ---
  loadBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        Object.entries(data).forEach(([key, value]) => {
          // try matching by name first (for checkboxes/inputs)
          const named = document.getElementsByName(key);
          if (named.length) {
            named.forEach(el => {
              if (el.type === 'checkbox') {
                el.checked = value;
                el.dispatchEvent(new Event('change'));
              } else {
                el.value = value;
                el.dispatchEvent(new Event('input'));
              }
            });
          } else {
            // fallback to id
            const el = document.getElementById(key);
            if (el) {
              el.value = value;
              el.dispatchEvent(new Event('input'));
            }
          }
        });
      } catch (err) {
        console.error('Could not parse JSON', err);
      }
    };
    reader.readAsText(file);
  });
});
