document.addEventListener('DOMContentLoaded', () => {
  const form      = document.querySelector('form.charsheet');
  const saveBtn   = document.getElementById('saveBtn');
  const loadBtn   = document.getElementById('loadBtn');
  const fileInput = document.getElementById('fileInput');

  // ───────────────────────── SAVE ─────────────────────────
  saveBtn.addEventListener('click', () => {
    const data = {};

    /* 1) Walk every form control. */
    Array.from(form.elements).forEach(el => {
      const tag = el.tagName.toLowerCase();
      if (tag === 'button' || el.type === 'button' || el.type === 'file') return;

      const key = el.name || el.id;
      if (!key) return;

      data[key] = el.type === 'checkbox' ? el.checked : el.value;
    });

    /* 2) Serialise each attack row, capturing the damage‑mod <input>. */
    data.attacks = Array.from(document.querySelectorAll('#attacks-table tbody tr'))
      .map(tr => {
        const [nameCell, toHitCell, diceCell, modCell] = tr.children;
        const modInput = modCell.querySelector('input');   // get the value
        return {
          name:  nameCell.textContent.trim(),
          toHit: toHitCell.textContent.trim(),
          dice:  diceCell.textContent.trim(),
          mod:   modInput ? modInput.value.trim() : ''
        };
      });

    /* 3) Build a safe file name from Character Name */
    const rawName  = (form.elements['charname']?.value || '').trim();
    const baseName = rawName.length ? rawName : 'character-sheet';
    const safeName = baseName.replace(/[^a-zA-Z0-9-_ ]/g, '_').replace(/\s+/g, '_');
    const filename = `${safeName}.json`;

    /* 4) Trigger download */
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  });

  // ───────────────────────── LOAD ─────────────────────────
  loadBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;

    /* Pre‑fill Character Name from the file stem (optional convenience) */
    const stem = file.name.replace(/\.json$/i, '');
    if (form.elements['charname']) form.elements['charname'].value = stem;

    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);

        /* 1) Populate every saved control except attacks */
        Object.entries(data).forEach(([key, value]) => {
          if (key === 'attacks') return;              // handled later

          let elements = form.elements[key]
            ? Array.from(form.elements[key])          // named collection
            : Array.from(document.getElementsByName(key));

          if (elements.length === 0) {
            const el = document.getElementById(key);  // fall‑back to id
            if (el) elements = [el];
          }

          elements.forEach(el => {
            if (el.type === 'checkbox') {
              el.checked = value;
              el.dispatchEvent(new Event('change'));
            } else {
              el.value = value;
              el.dispatchEvent(new Event('input'));
            }
          });
        });

        /* 2) Rebuild Attacks table (including damage‑mod input) */
        if (Array.isArray(data.attacks)) {
          const tbody = document.querySelector('#attacks-table tbody');
          tbody.innerHTML = '';

          data.attacks.forEach(att => {
            const tr = document.createElement('tr');

            // Name, To‑Hit, Dice (plain text cells)
            ['name', 'toHit', 'dice'].forEach(field => {
              const td = document.createElement('td');
              td.textContent = att[field] || '';
              tr.appendChild(td);
            });

            // Damage‑mod cell with editable <input>
            const tdMod = document.createElement('td');
            const inp   = document.createElement('input');
            inp.className = 'damage-mod-input';
            inp.value     = att.mod || '';
            tdMod.appendChild(inp);
            tr.appendChild(tdMod);

            tbody.appendChild(tr);
          });
        }
      } catch (err) {
        console.error('Could not parse JSON:', err);
      }
    };
    reader.readAsText(file);
  });
});
