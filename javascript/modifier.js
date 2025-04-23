document.addEventListener('DOMContentLoaded', () => {
  // find all inputs whose id ends with "score"
  document.querySelectorAll('input[id$="score"]').forEach(scoreInput => {
    // derive the base name, e.g. "Strength" from "Strengthscore"
    const base = scoreInput.id.replace(/score$/, '');
    const modInput = document.querySelector(`input[name="${base}mod"]`);

    scoreInput.addEventListener('input', () => {
      const val = parseInt(scoreInput.value, 10);
      if (!isNaN(val)) {
        const mod = Math.floor((val - 10) / 2);
        modInput.value = (mod >= 0 ? '+' : '') + mod;
      } else {
        modInput.value = '';
      }
    });

    // trigger once on load in case there are pre-filled values
    scoreInput.dispatchEvent(new Event('input'));
  });
});
