import movements from '../db.js';
import moment from 'moment';
import { connection } from '../session.js';
/* import { json } from 'express';
app.use(json());
 */
export function getSavings(request, response) {
  response.json({
    savings: movements.reduce((acc, curr) => {
      return curr.income === true ? (acc += curr.amount) : (acc -= curr.amount);
    }, 0),
  });
}

export function getMovements(request, response) {
  // Go to DB to retrieve all movements
  response.json({ movements });
}

export function getMovementById(request, response) {
  const { id } = request.params;

  const movement = movements.find((movement) => movement.id === id);
  console.log(movement);
  response.json({ movement });
}

export function getIncomes(request, response) {
  response.json({
    incomes: movements.filter((movement) => movement.income),
  });
}

export function deleteMovement(request, response) {
  const { id } = request.params;
  console.log(id);

  const index = movements.findIndex((movement) => movement.id === id);

  if (index === -1) {
    return response.status(404).json({
      error: 'Movement not found',
    });
  }

  movements.splice(index, 1); // ✅ Modify in place

  /*   const updatedMovements = movements.filter(
    (movement) => movement.id !== id
  );

  movements = [...updatedMovements];
 */
  response.json({ movements });
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
    (err) => {
      if (err) {
        response.status(500).json({ error: err.message });
        return;
      }

      response.status(201).json({ message: 'Movement added!' });
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
