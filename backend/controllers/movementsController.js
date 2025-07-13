import moment from 'moment';
import { connection } from '../session.js';

export function getMovements(request, response) {
  // Go to DB to retrieve all movements
  const query = 'SELECT * FROM movements';

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
  response.json({
    incomes: movements.filter((movement) => movement.income),
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

    response.status(200).json({ message: 'Movement deleted', deletedId: id });
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
  const monthlySummary = [
    {
      incomes: 8000,
      expenses: 700,
      month: 'January',
    },
  ];
  response.json(monthlySummary);
}
