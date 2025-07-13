export function getExpensesSummary(req, res) {
  const categoryTotals = {};

  for (const movement of movements) {
    if (!movement.income) {
      const { category, amount } = movement;
      if (!categoryTotals[category]) {
        categoryTotals[category] = 0;
      }
      categoryTotals[category] += amount;
    }
  }
  console.log(categoryTotals);
  res.json(categoryTotals);
}
