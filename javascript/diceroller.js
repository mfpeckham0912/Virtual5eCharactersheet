document.addEventListener('DOMContentLoaded', () => {
    // ——— Grab elements ———
    const rollLog     = document.getElementById('rollLog');
    const diceTypeSel = document.getElementById('diceType');
    const rollBtn     = document.getElementById('rollDiceBtn');
    const clearBtn    = document.getElementById('clearLogBtn');
  
    // ——— Helper: append entry and autoscroll ———
    function logRoll(text) {
      const entry = document.createElement('div');
      entry.textContent = text;
      rollLog.appendChild(entry);
      rollLog.scrollTop = rollLog.scrollHeight;
    }
  
    // ——— Clear log ———
    clearBtn.addEventListener('click', () => {
      rollLog.innerHTML = '';
    });
  
    // ——— Manual d4–d20 roll button ———
    rollBtn.addEventListener('click', () => {
      const sides  = parseInt(diceTypeSel.value, 10);
      const result = Math.ceil(Math.random() * sides);
      logRoll(`Rolled 1d${sides}: ${result}`);
    });
  
    // ——— Skills & Saves click-to-roll ———
    document
      .querySelectorAll('.list-section.box ul li > label')
      .forEach(label => {
        label.style.cursor = 'pointer';
        label.addEventListener('click', () => {
          const li    = label.closest('li');
          const input = li.querySelector('input:not([type="checkbox"])');
          const mod   = parseInt(input.value, 10) || 0;
          const roll  = Math.ceil(Math.random() * 20);
          const total = roll + mod;
          const name  = label.textContent.trim();
          logRoll(`${name}: d20 (${roll}) ${mod >= 0 ? '+'+mod : mod} = ${total}`);
        });
      });
  
    // ——— Attacks table click-to-roll with criticals ———
    const attacksTbody = document.querySelector('#attacks-table tbody');
    attacksTbody.addEventListener('click', event => {
      const cell = event.target;
      if (cell.tagName !== 'TD') return;
      const tr    = cell.parentElement;
      const cells = Array.from(tr.children);
      const idx   = cells.indexOf(cell);
      if (idx !== 0) return; // only name column fires attack roll
  
      const name = cell.textContent.trim();
  
      // 1) Roll d20 for attack
      const attackRoll = Math.ceil(Math.random() * 20);
      const toHitTxt   = cells[1].textContent.trim();
      const toHitMod   = parseInt(toHitTxt.replace(/[^\d-]/g,''), 10) || 0;
      logRoll(
        `${name} Attack: d20 (${attackRoll}) ${toHitMod >= 0 ? '+'+toHitMod : toHitMod} = ${attackRoll + toHitMod}`
      );
  
      // 2) Critical miss?
      if (attackRoll === 1) {
        logRoll('Critical Miss!');
        return;
      }
  
      // 3) Determine damage dice (double on nat 20)
      const diceTxt = cells[2].textContent.trim().toLowerCase();
      let [count, sides] = diceTxt.split('d').map(Number);
      if (attackRoll === 20) {
        count *= 2;
        logRoll('Critical Hit!');
      }
  
      // 4) Roll damage dice
      const rolls = Array.from({ length: count }, () => Math.ceil(Math.random() * sides));
      const sum   = rolls.reduce((a, b) => a + b, 0);
  
      // 5) Read damage modifier from input in col 4
      const dmgInput = cells[3].querySelector('input');
      const dmgMod   = dmgInput ? (parseInt(dmgInput.value, 10) || 0) : 0;
  
      logRoll(
        `${name} Damage: ${count}d${sides} (${rolls.join(', ')}) ${dmgMod >= 0 ? '+'+dmgMod : dmgMod} = ${sum + dmgMod}`
      );
    });
  });
