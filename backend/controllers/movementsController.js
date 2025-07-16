import moment from 'moment';
import { connection } from '../session.js';

export function getMovements(request, response) {
  // Go to DB to retrieve all movements
  const { limit, offset } = request.query;
  console.log(request.query);

  const query = `SELECT * FROM movements 
                  ORDER BY date ASC
                  LIMIT ${Number(limit)} OFFSET ${Number(offset)}`;

  connection.all(query, (err, rows) => {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }

    response.status(200).json(rows);
  });
}

export function getSavings(request, response) {
  const query = `SELECT 
      SUM(CASE 
        WHEN income = 0 THEN -amount 
        ELSE amount 
      END) AS savings
    FROM movements`;

  connection.get(query, (err, row) => {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }

    response.status(200).json(row);
  });
}

export function getMovementById(request, response) {
  const { id } = request.params;

  const query = 'SELECT * FROM movements WHERE id=(?)';

  connection.get(query, id, (err, row) => {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }

    response.status(200).json(row);
  });
}

export function getIncomes(request, response) {
  const query = 'SELECT * FROM movements WHERE income=1';

  connection.all(query, (err, rows) => {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }

    response.status(200).json(rows);
  });
}

export function deleteMovement(request, response) {
  const { id } = request.params;

  const mutation = 'DELETE FROM movements WHERE id=(?)';

  connection.run(mutation, id, (err, rows) => {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }

    response
      .status(200)
      .json({ message: 'Movement deleted', deletedId: id });
  });
}

export function addMovement(request, response) {
  console.log('New movement:', request.body);
  const { category, concept, amount, income } = request.body;
  const newMovement = {
    category,
    concept,
    amount: Number(amount),
    income,
    dom: moment().format('dd MM YYYY'),
  };
  // Insert to DB
  // movements.push(newMovement);
  const mutation = `INSERT INTO movements (category, concept, amount, income, date) VALUES (?,?,?,?,?)`;

  connection.run(
    mutation,
    [
      newMovement.category,
      newMovement.concept,
      newMovement.amount,
      newMovement.income,
      newMovement.dom,
    ],
    (err, rows) => {
      if (err) {
        response.status(500).json({ error: err.message });
        return;
      }

      response.status(200).json({ message: 'movement added' });
    }
  );
}

export function getMonthlySummary(request, response) {
  const query = `
  SELECT 
    (substr(TRIM(date), 6, 5)|| '-' || substr(TRIM(date), 4, 2)) AS YearMonth,
    SUM(CASE WHEN income != 0 THEN amount ELSE 0 END) AS TotalIncomes,
    SUM(CASE WHEN income = 0 THEN amount ELSE 0 END) AS TotalExpenses
    FROM movements
  GROUP BY YearMonth
  ORDER BY YearMonth;
    `;

  connection.all(query, (err, rows) => {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }

    response.status(200).json(rows);
  });
  /*   const monthlySummary = [
    {
      incomes: 8000,
      expenses: 700,
      remaining: 7300,
      month: 'January',
    },
  ]; */
}
