function formatBR(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calculate() {
  const income = parseFloat(document.getElementById('income').value) || 0;
  const fixedExpenses = parseFloat(document.getElementById('fixedExpenses').value) || 0;
  const variableExpenses = parseFloat(document.getElementById('variableExpenses').value) || 0;
  const savings = parseFloat(document.getElementById('savings').value) || 0;

  const totalExpenses = fixedExpenses + variableExpenses;
  const balance = income - totalExpenses - savings;

  const percentExpenses = income > 0 ? (totalExpenses / income * 100).toFixed(1) : 0;
  const percentSavings = income > 0 ? (savings / income * 100).toFixed(1) : 0;
  const percentBalance = income > 0 ? (balance / income * 100).toFixed(1) : 0;

  document.getElementById('totalExpenses').textContent = "Total de Despesas: " + formatBR(totalExpenses);
  document.getElementById('balance').textContent = "Saldo Final: " + formatBR(balance);
  document.getElementById('percentSaved').textContent = "Percentual Poupado: " + percentSavings + "%";

  // Altura máxima e mínima do gráfico em px
  const maxHeight = 120;
  const minHeight = 16;

  function percentToPx(percent) {
    const val = Math.max(0, Math.min(percent, 100));
    const px = (val / 100) * maxHeight;
    // Garante no mínimo 16px de altura, se o valor for maior que 0
    return val > 0 ? Math.max(px, minHeight) : 0;
  }

  const barExpenses = document.getElementById('barExpenses');
  const barSavings = document.getElementById('barSavings');
  const barBalance = document.getElementById('barBalance');

  barExpenses.style.height = percentToPx(percentExpenses) + "px";
  barExpenses.textContent = percentExpenses + "%";

  barSavings.style.height = percentToPx(percentSavings) + "px";
  barSavings.textContent = percentSavings + "%";

  const positiveBalance = Math.max(percentBalance, 0);
  barBalance.style.height = percentToPx(positiveBalance) + "px";
  barBalance.textContent = percentBalance + "%";
  barBalance.style.background = balance >= 0 ? "#2a9d8f" : "#d00000";
}

calculate();
