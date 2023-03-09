import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addQuestion } from '../redux/slices/lessonSlice';

function CreateQuestion({ setCreate, lesson }) {
  const [question, setQuestion] = useState('');
  const [inputType, setInputType] = useState('radio');
  const [options, setOptions] = useState([
    { optionTitle: '', right: false },
    { optionTitle: '', right: false },
  ]);

  const addOption = () => {
    setOptions([...options, { optionTitle: '', right: false }]);
  };

  const handleOptionChange = (index, key, value) => {
    const newOptions = [...options];
    newOptions[index][key] = value;
    setOptions(newOptions);
  };

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      lesson: lesson._id,
      questionTitle: question,
      inputType: inputType,
      options: options,
    };

    dispatch(addQuestion(data));
  };

  return (
    <form className='test__box create-q' onSubmit={handleSubmit}>
      <label>
        Введите вопрос
        <input
          placeholder='В чём смысл жизни?'
          type='text'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </label>
      <label>
        Тип вопроса
        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value='radio'>Выбрать один ответ</option>
          <option value='checkbox'>Выбрать несколько ответов</option>
        </select>
      </label>
      <label>
        Варианты ответов:
        {options.map((option, index) => (
          <div key={index}>
            <input
              type='text'
              value={option.optionTitle}
              onChange={(e) =>
                handleOptionChange(index, 'optionTitle', e.target.value)
              }
            />
            <label className='b-contain'>
              Правильный ответ
              <input
                className='b-contain'
                type='checkbox'
                checked={option.right}
                onChange={(e) =>
                  handleOptionChange(index, 'right', e.target.checked)
                }
              />
              <div className='b-input'></div>
            </label>
          </div>
        ))}
        <div className='create-q__btns-wrapper'>
          <button type='button' onClick={() => setCreate(false)}>
            Вернуться к вопросам
          </button>
          <button type='button' onClick={addOption}>
            Добавить вариант ответа
          </button>
          <button type='submit'>Создать вопрос</button>
        </div>
      </label>
    </form>
  );
}

export default CreateQuestion;
