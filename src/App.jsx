import React from 'react'
import { useState, useEffect, useRef } from 'react'
import FlashcardData from './components/FlashcardData.jsx'
import './App.css'
import axios from 'axios'

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);

  const categoryEl = useRef()

  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=10')
      .then(res => {
        setFlashcards(res.data.results.map((questionItem, index) => {
          const answer = questionItem.correct_answer
          const options = [
            ...questionItem.incorrect_answers.map(a => decodeString(a)),
            answer]
          return {
            id: `${index}-${Date.now()}`,
            question: questionItem.question,
            answer: answer,
            options: options.sort(() => Math.random() - .5)
          }
        }))
        console.log(res.data)
      })
  }, [])

  function decodeString(str) {
    return <textarea>str</textarea>
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlForm="category">Category</label>
          <select id="category" ref={categoryEl}>

          </select>
        </div>
      </form>
      <div className="container">
        <FlashcardData flashcards={flashcards} />
      </div>
    </>

  )
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'What is 2+2?',
    answer: '4',
    options: [
      '2',
      '3',
      '4',
      '5'
    ]
  },
  {
    id: 2,
    question: 'Question?',
    answer: 'Answer',
    options: [
      'Answer',
      'Answer 1',
      'Answer 2',
      'Answer 3'
    ]
  }
];

export default App
