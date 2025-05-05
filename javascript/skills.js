document.addEventListener('DOMContentLoaded', () => {
  const profBonusInput = document.getElementById('proficiencybonus');

  // Map each skill to its governing ability
  const skillAbilityMap = {
    'Acrobatics':       'Dexterity',
    'Animal Handling':  'Wisdom',
    'Arcana':           'Intelligence',
    'Athletics':        'Strength',
    'Deception':        'Charisma',
    'History':          'Intelligence',
    'Insight':          'Wisdom',
    'Intimidation':     'Charisma',
    'Investigation':    'Intelligence',
    'Medicine':         'Wisdom',
    'Nature':           'Intelligence',
    'Perception':       'Wisdom',
    'Performance':      'Charisma',
    'Persuasion':       'Charisma',
    'Religion':         'Intelligence',
    'Sleight of Hand':  'Dexterity',
    'Stealth':          'Dexterity',
    'Survival':         'Wisdom'
  };

  // Compute one skill’s total: mod + (prof? profBonus: 0)
  function updateSkill(skill) {
    const ability     = skillAbilityMap[skill];
    const modVal      = parseInt(document.querySelector(`input[name="${ability}mod"]`).value, 10) || 0;
    const profBonus   = parseInt(profBonusInput.value, 10) || 0;
    const profCheck   = document.querySelector(`input[name="${skill}-prof"]`);
    const skillInput  = document.getElementById(skill);

    const total = modVal + (profCheck && profCheck.checked ? profBonus : 0);
    skillInput.value = (total >= 0 ? '+' : '') + total;
  }

  // Hook up listeners
  Object.keys(skillAbilityMap).forEach(skill => {
    const ability = skillAbilityMap[skill];

    // 1) When the “proficiency” box is toggled
    const profCheck = document.querySelector(`input[name="${skill}-prof"]`);
    if (profCheck) profCheck.addEventListener('change', () => updateSkill(skill));

    // 2) When the proficiency bonus itself changes
    profBonusInput.addEventListener('input', () => updateSkill(skill));

    // 3) When that ability’s raw score changes (so its modifier may change)
    const scoreInput = document.getElementById(`${ability}score`);
    if (scoreInput) scoreInput.addEventListener('input', () => updateSkill(skill));
  });

  // Populate all skills on load
  Object.keys(skillAbilityMap).forEach(updateSkill);
});

