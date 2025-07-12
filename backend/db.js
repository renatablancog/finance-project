import moment from 'moment'; //date

let movements = [
  {
    id: '1',
    category: 'Salary',
    concept: 'Nominee',
    amount: 3000,
    income: true,
    dom: moment().format('YYYY-MM-DD'),
  },
  {
    id: '2',
    category: 'Dogs',
    concept: 'Dog food',
    amount: 800,
    income: false,
    dom: moment().format('YYYY-MM-DD'),
  },
  {
    id: '3',
    category: 'Skincare',
    concept: 'Sunscreen',
    amount: 400,
    income: false,
    dom: moment().format('YYYY-MM-DD'),
  },
];

export default movements;
