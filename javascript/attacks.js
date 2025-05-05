document.addEventListener('DOMContentLoaded', () => {
    // ——— Grab proficiency input & map stat-mod inputs ———
    const profInput = document.getElementById('proficiencybonus');
    const statModInputs = {};
    document.querySelectorAll('input[name$="mod"]').forEach(input => {
      // name is e.g. "Strengthmod" → statName = "Strength"
      const statName = input.name.slice(0, -3);
      statModInputs[statName] = input;
    });
  
    // ——— Grab attack‐form elements ———
    const nameIn       = document.getElementById('attack-name');
    const statSel      = document.getElementById('attack-tohit-stat');
    const diceIn       = document.getElementById('attack-dice');
    const dmgSrcSel    = document.getElementById('attack-dmg-source');
    const addBtn       = document.getElementById('add-attack-btn');
    const errorDiv     = document.getElementById('attack-error');
    const tbody        = document.querySelector('#attacks-table tbody');
  
    // ——— Recalculate all To-Hit columns ———
    function recalcToHits() {
      const prof = parseInt(profInput.value, 10) || 0;
      tbody.querySelectorAll('tr').forEach(tr => {
        const statName = tr.dataset.stat;
        const statMod  = parseInt(statModInputs[statName]?.value, 10) || 0;
        const total    = prof + statMod;
        const cell     = tr.children[1];              // second <td>
        cell.textContent = (total >= 0 ? '+' : '') + total;
      });
    }
  
    // ——— Bind recalc when proficiency or any stat-mod changes ———
    profInput.addEventListener('input', recalcToHits);
    Object.values(statModInputs).forEach(input =>
      input.addEventListener('input', recalcToHits)
    );
  
    // ——— Delegate row-deletion clicks ———
    tbody.addEventListener('click', e => {
      if (e.target.matches('.delete-attack')) {
        e.target.closest('tr').remove();
      }
    });
  
    // ——— Add Attack button handler ———
    addBtn.addEventListener('click', () => {
      errorDiv.style.display = 'none';
  
      const name      = nameIn.value.trim();
      const stat      = statSel.value;
      const dice      = diceIn.value.trim();
      const dmgSource = dmgSrcSel.value;
  
      if (!name) {
        errorDiv.textContent = 'Please enter an attack name.';
        return errorDiv.style.display = 'block';
      }
      if (!/^\d+d\d+$/i.test(dice)) {
        errorDiv.textContent = 'Dice must be in NdM format, e.g. 1d8.';
        return errorDiv.style.display = 'block';
      }
      if (!(stat in statModInputs)) {
        errorDiv.textContent = `Unknown stat "${stat}".`;
        return errorDiv.style.display = 'block';
      }
  
      // Create row
      const tr = document.createElement('tr');
      tr.dataset.stat = stat;
  
      // Name cell
      const nameTd = document.createElement('td');
      nameTd.textContent = name;
      tr.appendChild(nameTd);
  
      // To-Hit cell (will be filled by recalcToHits)
      const toHitTd = document.createElement('td');
      tr.appendChild(toHitTd);
  
      // Dice cell
      const diceTd = document.createElement('td');
      diceTd.textContent = dice;
      tr.appendChild(diceTd);
  
      // Damage-Mod cell: always an <input> so user can tweak after creation
      const dmTd = document.createElement('td');
      const dmIn = document.createElement('input');
      dmIn.type = 'number';
      dmIn.className = 'damage-mod-input';
      dmIn.value = dmgSource === 'stat'
        ? (parseInt(statModInputs[stat].value, 10) || 0)
        : 0;
      dmIn.style.width = '4ch';
      dmTd.appendChild(dmIn);
      tr.appendChild(dmTd);
  
      // Delete button cell
      const delTd = document.createElement('td');
      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.textContent = '✕';
      delBtn.className = 'delete-attack';
      delTd.appendChild(delBtn);
      tr.appendChild(delTd);
  
      tbody.appendChild(tr);
  
      // Clear inputs
      nameIn.value = '';
      diceIn.value = '';
      statSel.selectedIndex = 0;
      dmgSrcSel.selectedIndex = 0;
  
      // Immediately recalc to-hit for the new row
      recalcToHits();
    });
  
    // Initial recalc on page load (in case attacks were loaded)
    recalcToHits();
  });
