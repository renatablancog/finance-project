import React from 'react';
import { useRef } from 'react';
import axios from 'axios';

function MovementForm() {
  /**
   * Crear las ref a los valores del form
   * Crear una funcion que valide los valores de las ref
   * Mandar valores al backend
   */

  const refCategory = useRef('');
  const refConcept = useRef('');
  const refAmount = useRef('');
  const refIsIncome = useRef('');

  async function handleSubmit(e) {
    e.preventDefault();

    const categoryValue = refCategory.current.value;
    const conceptValue = refConcept.current.value;
    const amountValue = refAmount.current.value;
    const isIncomeValue = Boolean(refIsIncome.current.value);
    // console.log(categoryValue);

    //to-do: validacion de datos

    const newMovement = {
      category: categoryValue,
      concept: conceptValue,
      amount: amountValue,
      income: isIncomeValue,
    };

    const { data } = await axios.post(
      'http://localhost:3001/movements',
      newMovement
    );

    console.log(data);
  }

  return (
    <form className='mx-7 my-6'>
      <div className='text-l font-bold mb-2'>Add Movement</div>
      <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-full border p-4'>
        <label htmlFor='category' className='label'>
          Category
        </label>
        <select
          id='category'
          className='select mb-2 '
          required
          ref={refCategory}>
          <option value='Food'>Food</option>
          <option value='House'>House</option>
          <option value='Skincare'>Skincare</option>
          <option value='Dogs'>Dogs</option>
          <option value='Shopping'>Shopping</option>
          <option value='Salary'>Salary</option>
          <option value='Gift'>Gift</option>
          <option value='Other'>Other</option>
        </select>

        <label htmlFor='concept' className='label'>
          Concept
        </label>
        <input
          ref={refConcept}
          id='concept'
          type='text'
          className='input'
          placeholder='Fruit'
          required
        />

        <label htmlFor='amount' className='label'>
          Amount
        </label>
        <input
          ref={refAmount}
          id='amount'
          type='number'
          className='input'
          placeholder='$500'
          min='0'
          required
        />

        <label htmlFor='type' className='label'>
          Income/Expense
        </label>
        <select id='type' className='select mb-2' ref={refIsIncome} required>
          <option value='false'>Expense</option>
          <option value='true'>Income</option>
        </select>

        <button
          type='submit'
          className='btn btn-neutral btn-outline mt-1'
          onClick={(e) => handleSubmit(e)}>
          Add
        </button>
      </fieldset>
    </form>
  );
}

export default MovementForm;
