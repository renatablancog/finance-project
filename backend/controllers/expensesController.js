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
  const { period } = request.query;

  let filter = '';
  switch (period) {
    case 'month':
      filter = `strftime('%Y-%m', substr(date, 7, 4) || '-' || substr(date, 4, 2) || '-' || substr(date, 1, 2)) = strftime('%Y-%m', 'now')`;
      break;
    case 'year':
      filter = `strftime('%Y', substr(date, 7, 4) || '-' || substr(date, 4, 2) || '-' || substr(date, 1, 2)) = strftime('%Y', 'now')`;
      break;
    case 'week':
      filter = `strftime('%Y-%W', substr(date, 7, 4) || '-' || substr(date, 4, 2) || '-' || substr(date, 1, 2)) = strftime('%Y-%W', 'now')`;
      break;
    default:
      filter = '1=1'; // No filter if none is given
  }

  const query = `
  SELECT category, SUM(CASE WHEN income = 0 THEN amount ELSE 0 END) AS categoryTotals
  FROM movements
  WHERE ${filter}
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
