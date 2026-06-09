document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('damageForm');
  const damageInput = document.getElementById('damage');
  const defenseInput = document.getElementById('defense');
  const resultSection = document.getElementById('resultSection');
  const resultValue = document.getElementById('resultValue');
  const resultDescription = document.getElementById('resultDescription');
  const detailDamage = document.getElementById('detailDamage');
  const detailDefense = document.getElementById('detailDefense');
  const detailTotal = document.getElementById('detailTotal');
  const resetBtn = document.getElementById('resetBtn');

  const CRITICAL_THRESHOLD = 0.7;
  const HIGH_THRESHOLD = 0.4;
  const MEDIUM_THRESHOLD = 0.2;

  const descriptions = {
    critical: [
      '¡Golpe devastador! La armadura no pudo resistir la furia de este ataque.',
      '¡Impacto colosal! La defensa se desmorona como castillos de arena.',
      '¡Ataque glorioso! Un golpe digno de las sagas más épicas.',
    ],
    high: [
      'Un golpe contundente que resuena entre los huesos del defensor.',
      'El acero atraviesa con determinación. Buena sangría.',
      'Fuerza considerable. El oponente nota el impacto.',
    ],
    medium: [
      'Un impacto decente. Se puede sentir el daño.',
      'Golpe firme aunque no mortal. La batalla continúa.',
      'Daño moderado. El adversario debería mostrarse cauteloso.',
    ],
    low: [
      'Un roce apenas perceptible. La defensa resiste bien.',
      'El golpe se desvanece contra la firmeza del defensor.',
      'Daño mínimo. La armilla apenas se tambaleó.',
    ],
    minimal: [
      'Un simple rasguño. La defensa es impenetrable.',
      'El ataque rebota sin efecto. Una muralla infranqueable.',
      'Casi nulo. La protección es superior a toda ofensiva.',
    ],
  };

  function getRandomDescription(category) {
    const pool = descriptions[category];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function calculateDamage(damage, defense) {
    if (defense === 0) {
      return damage * damage;
    }
    return (damage * damage) / (damage + defense);
  }

  function getDamageCategory(damage, defense) {
    if (defense === 0) return 'critical';
    const ratio = damage / defense;
    if (ratio >= 2) return 'critical';
    if (ratio >= 1) return 'high';
    if (ratio >= 0.5) return 'medium';
    if (ratio >= 0.25) return 'low';
    return 'minimal';
  }

  function formatNumber(num) {
    return Math.floor(num).toString();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const damage = parseFloat(damageInput.value) || 0;
    const defense = parseFloat(defenseInput.value) || 0;

    if (damage < 0 || defense < 0) {
      alert('El daño y la defensa deben ser valores no negativos.');
      return;
    }

    const result = calculateDamage(damage, defense);
    const category = getDamageCategory(damage, defense);
    const description = getRandomDescription(category);

    resultValue.textContent = formatNumber(result);
    detailDamage.textContent = formatNumber(damage);
    detailDefense.textContent = formatNumber(defense);
    detailTotal.textContent = formatNumber(result);
    resultDescription.textContent = description;

    resultSection.classList.remove('hidden');
    resetBtn.classList.remove('hidden');

    resultValue.style.animation = 'none';
    resultValue.offsetHeight;
    resultValue.style.animation = 'pulseValue 0.6s ease-out';

    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  resetBtn.addEventListener('click', () => {
    resultSection.classList.add('hidden');
    resetBtn.classList.add('hidden');
    damageInput.value = '';
    defenseInput.value = '';
    damageInput.focus();
  });

  damageInput.addEventListener('input', () => {
    if (!resultSection.classList.contains('hidden')) {
      resultSection.classList.add('hidden');
      resetBtn.classList.add('hidden');
    }
  });

  defenseInput.addEventListener('input', () => {
    if (!resultSection.classList.contains('hidden')) {
      resultSection.classList.add('hidden');
      resetBtn.classList.add('hidden');
    }
  });
});
