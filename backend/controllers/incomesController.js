import { connection } from '../session.js';

export function getIncomesSummary(request, response) {
  const query = `SELECT category, SUM(CASE WHEN income != 0 
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

/**SELECT SUM(CASE WHEN income != 0 THEN amount ELSE 0 END) AS categoryTotals
 * GROUP BY category */
