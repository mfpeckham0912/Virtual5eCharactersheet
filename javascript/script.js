document.addEventListener('DOMContentLoaded', () => {
  const profInput = document.querySelector('input[name="proficiencybonus"]');
  const getProf = () => parseInt(profInput.value, 10) || 0;

  function calcMod(score) {
    return Math.floor((score - 10) / 2);
  }

  const abilities = [
    "Strength","Dexterity","Constitution",
    "Wisdom","Intelligence","Charisma"
  ];

  const skills = [
    { name: "Acrobatics",       attr: "Dexterity"    },
    { name: "Animal Handling",  attr: "Wisdom"       },
    /* …all your other skills… */
    { name: "Survival",         attr: "Wisdom"       }
  ];

  function updateAbility(attr) {
    const scoreEl = document.querySelector(`input[name="${attr}score"]`);
    const modEl   = document.querySelector(`input[name="${attr}mod"]`);
    const score   = parseInt(scoreEl.value, 10) || 0;
    const baseMod = calcMod(score);
    modEl.value   = (baseMod >= 0 ? "+" : "") + baseMod;

    const saveEl     = document.querySelector(`input[name="${attr}-save"]`);
    const saveProfCB = document.querySelector(`input[name="${attr}-save-prof"]`);
    let saveVal = baseMod;
    if (saveProfCB.checked) saveVal += getProf();
    saveEl.value = (saveVal >= 0 ? "+" : "") + saveVal;

    skills
      .filter(s => s.attr === attr)
      .forEach(s => updateSkill(s.name));
  }

  function updateSkill(skillName) {
    const mapping = skills.find(s => s.name === skillName);
    if (!mapping) return;
    const scoreEl = document.querySelector(`input[name="${mapping.attr}score"]`);
    const score   = parseInt(scoreEl.value, 10) || 0;
    const baseMod = calcMod(score);
    const profCB  = document.querySelector(`input[name="${skillName}-prof"]`);
    let total     = baseMod + (profCB.checked ? getProf() : 0);
    const inputEl = document.querySelector(`input[name="${skillName}"]`);
    inputEl.value = (total >= 0 ? "+" : "") + total;
  }

  abilities.forEach(attr => {
    document
      .querySelector(`input[name="${attr}score"]`)
      .addEventListener('input', () => updateAbility(attr));
    document
      .querySelector(`input[name="${attr}-save-prof"]`)
      .addEventListener('change', () => updateAbility(attr));
  });

  profInput.addEventListener('input', () => {
    abilities.forEach(a => updateAbility(a));
    skills.forEach(s => updateSkill(s.name));
  });

  skills.forEach(s => {
    document
      .querySelector(`input[name="${s.name}-prof"]`)
      .addEventListener('change', () => updateSkill(s.name));
  });

  profInput.value = profInput.value || "0";
  abilities.forEach(a => updateAbility(a));
  skills.forEach(s => updateSkill(s.name));
});

