document.addEventListener('DOMContentLoaded', () => {
    const profBonusInput = document.getElementById('proficiencybonus');
    const abilities      = ['Strength', 'Dexterity', 'Constitution', 'Wisdom', 'Intelligence', 'Charisma'];
  
    function updateSave(ability) {
      const modInput     = document.querySelector(`input[name="${ability}mod"]`);
      const saveInput    = document.getElementById(`${ability}-save`);
      const profCheckbox = document.querySelector(`input[name="${ability}-save-prof"]`);
  
      const modVal       = parseInt(modInput.value, 10)   || 0;
      const profBonusVal = parseInt(profBonusInput.value, 10) || 0;
      const total        = modVal + (profCheckbox.checked ? profBonusVal : 0);
  
      saveInput.value = (total >= 0 ? '+' : '') + total;
    }
  
    abilities.forEach(ab => {
      // 1) When the proficiency checkbox toggles
      document.querySelector(`input[name="${ab}-save-prof"]`)
              .addEventListener('change',  () => updateSave(ab));
  
      // 2) When the proficiency-bonus changes
      profBonusInput.addEventListener('input', () => updateSave(ab));
  
      // 3) **New**: When the raw score changes (so the modifier will change)
      const scoreInput = document.getElementById(`${ab}score`);
      if (scoreInput) {
        scoreInput.addEventListener('input', () => updateSave(ab));
      }
    });
  
    // Initial population on load
    abilities.forEach(ab => updateSave(ab));
  });
