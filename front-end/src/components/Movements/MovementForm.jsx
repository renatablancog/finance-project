import { useRef, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MovementsContext } from '../../context/movementsContext';
import { MdAddCard } from 'react-icons/md';

function MovementForm() {
  const { handleMovementFormSubmit } = useContext(MovementsContext);
  const [categories, setCategories] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE;

  //Consuming from database the categories
  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data } = await axios.get(`${BASE_URL}/categories`);
    setCategories(data);
  }
  /**
   * Crear las ref a los valores del form
   * Crear una funcion que valide los valores de las ref
   * Mandar valores al backend
   */

  const refCategory = useRef('');
  const refConcept = useRef('');
  const refAmount = useRef('');
  const refIsIncome = useRef('');
  const refNewCategory = useRef('');

  function onSubmit(e) {
    e.preventDefault();

    const categoryValue = refCategory.current.value;
    const conceptValue = refConcept.current.value;
    const amountValue = refAmount.current.value;
    const isIncomeValue = refIsIncome.current.value === 'true' ? true : false;

    handleMovementFormSubmit(
      categoryValue,
      conceptValue,
      amountValue,
      isIncomeValue
    );

    // Clear form inputs
    refCategory.current.value = 'Food';
    refConcept.current.value = '';
    refAmount.current.value = '';
    refIsIncome.current.value = 'false';
  }

  async function handleCreateNewCategory() {
    const newCategory = refNewCategory.current.value;

    const response = await axios.post(`${BASE_URL}/categories`, {
      name: newCategory,
    });
    if (response.status === 200) {
      fetchCategories();
    }

    setShowInput((prev) => !prev);
  }

  return (
    <form className='mx-7 my-6'>
      {/**Title*/}
      <div className='text-l font-bold mb-2 flex items-center'>
        <MdAddCard className='mx-2' />
        Add Movement
      </div>
      {/**Form*/}
      <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-full border p-4'>
        {/**Input Categories*/}
        {!showInput ? (
          <div>
            <label htmlFor='category' className='label'>
              Category
            </label>
            <select
              id='category'
              className='select mb-2 '
              required
              ref={refCategory}>
              {categories.map((category) => {
                return (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
            <button
              className='btn btn-xs btn-outline btn-info'
              onClick={() => setShowInput((prev) => !prev)}>
              New Category
            </button>
          </div>
        ) : (
          {
            /**Add Category*/
          }(
            <div>
              <label htmlFor='newCategory' className='label'>
                New Category
              </label>
              <input
                id='newCategory'
                type='text'
                className='input'
                placeholder='Shopping'
                ref={refNewCategory}
              />
              <div className='flex gap-2'>
                <button
                  type='button'
                  className='btn btn-xs btn-outline btn-info mt-2'
                  onClick={handleCreateNewCategory}>
                  OK
                </button>
                <button
                  type='button'
                  className='btn btn-xs btn-outline btn-info mt-2'
                  onClick={() => setShowInput((prev) => !prev)}>
                  Cancel
                </button>
              </div>
            </div>
          )
        )}
        {/**Concept*/}
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
        {/**Amount*/}
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
        {/**Income/Expense*/}
        <label htmlFor='type' className='label'>
          Income/Expense
        </label>
        <select id='type' className='select mb-2' ref={refIsIncome} required>
          <option value='false'>Expense</option>
          <option value='true'>Income</option>
        </select>
        {/**Submit*/}
        <button
          type='submit'
          className='btn btn-neutral btn-outline mt-1'
          onClick={(e) => onSubmit(e)}>
          Add
        </button>
      </fieldset>
    </form>
  );
}

export default MovementForm;
