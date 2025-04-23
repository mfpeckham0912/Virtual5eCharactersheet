document.addEventListener('DOMContentLoaded', () => {
    const perceptionInput = document.getElementById('Perception');
    const passiveInput    = document.getElementById('passiveperception');
    const profBonusInput  = document.getElementById('proficiencybonus');
    const profCheck       = document.querySelector('input[name="Perception-prof"]');
    const wisdomScore     = document.getElementById('Wisdomscore');
  
    function updatePassivePerception() {
      // parseInt will ignore any leading "+" on the skill value
      const skillVal = parseInt(perceptionInput.value, 10) || 0;
      passiveInput.value = 10 + skillVal;
    }
  
    // Whenever the skill total might change:
    perceptionInput.addEventListener('input', updatePassivePerception);
    profBonusInput .addEventListener('input', updatePassivePerception);
    profCheck      .addEventListener('change', updatePassivePerception);
    if (wisdomScore) wisdomScore.addEventListener('input', updatePassivePerception);
  
    // Initial calculation on load
    updatePassivePerception();
  });
