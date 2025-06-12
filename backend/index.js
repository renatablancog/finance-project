const { json } = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(json());

let movements = [
  {
    id: '1',
    category: 'Salary',
    concept: 'Nominee',
    amount: 3000,
    income: true,
  },
  {
    id: '2',
    category: 'Dogs',
    concept: 'Dog food',
    amount: 800,
    income: false,
  },
  {
    id: '3',
    category: 'Skincare',
    concept: 'Sunscreen',
    amount: 400,
    income: false,
  },
];

app.get('/', function (request, response) {
  response.json({ message: 'hola' });
});

app.get('/movements/savings', function (request, response) {
  response.json({
    savings: movements.reduce((acc, curr) => {
      return curr.income === true ? (acc += curr.amount) : (acc -= curr.amount);
    }, 0),
  });
});

app.get('/movements', function (request, response) {
  // Go to DB to retrieve all movements
  response.json({ movements });
});

app.get('/movements/:id', function (request, response) {
  const { id } = request.params;

  const movement = movements.filter((movement) => movement.id === id);

  response.json({ movement });
});

app.get('/movements/incomes', function (request, response) {
  response.json({ incomes: movements.filter((movement) => movement.income) });
});

app.delete('/movements/:id', function (request, response) {
  const { id } = request.params;
  const updatedMovements = movements.filter((movement) => movement.id !== id);
  movements = [...updatedMovements];

  response.json({ movements });
});

app.post('/movements', function (request, response) {
  console.log('body:', request.body);
  const { category, concept, amount, income } = request.body;
  const newMovement = {
    category,
    concept,
    amount,
    income,
  };
  // Insert to DB
  movements.push(newMovement);
  response.json({ movements });
});

app.listen(3001, function () {
  console.log('server up and running on port 3001');
});
