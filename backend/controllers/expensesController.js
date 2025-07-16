import { connection } from '../session.js';

export function getExpensesSummary(request, response) {
  const query = `SELECT category, SUM(CASE WHEN income = 0 
    THEN amount ELSE 0 END) AS categoryTotals 
    FROM movements
    GROUP BY category
    HAVING categoryTotals > 0
    `;

  connection.all(query, (err, rows) => {
    if (err) {
      response.status(500).json({ error: err.message });
    }

    response.status(200).json(rows);
  });
}

export function getCategoryWithMaxExpense(request, response) {
  const query = `SELECT category, SUM(CASE WHEN income = 0 
    THEN amount ELSE 0 END) AS categoryTotals 
    FROM movements
    GROUP BY category
    HAVING categoryTotals > 0
    ORDER BY categoryTotals DESC
    LIMIT 1
    `;

  connection.all(query, (err, rows) => {
    if (err) {
      response.status(500).json({ error: err.message });
    }

    response.status(200).json(rows);
  });
}
