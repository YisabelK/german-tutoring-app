import { useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import QuizSlide from './components/QuizSlide'
import VocabularyList from './components/VocabularyList'
import {
  getDefaultLevel,
  getInitialQuestionIndex,
  loadQuiz,
} from './data/loadQuiz'
import { checkAnswer, createEmptyInputs } from './utils/checkAnswer'
import './App.css'

const START_QUESTION_ID = 1

function App() {
  const [selectedLevel, setSelectedLevel] = useState(getDefaultLevel)
  const quiz = useMemo(() => loadQuiz(selectedLevel), [selectedLevel])
  const { title, vocabulary, questions, level } = quiz

  const initialIndex = useMemo(
    () => getInitialQuestionIndex(questions, START_QUESTION_ID),
    [questions],
  )

  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [inputs, setInputs] = useState(() =>
    createEmptyInputs(questions[initialIndex].answer),
  )
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showVocabulary, setShowVocabulary] = useState(false)

  useEffect(() => {
    const index = getInitialQuestionIndex(questions, START_QUESTION_ID)
    setCurrentIndex(index)
    setInputs(createEmptyInputs(questions[index].answer))
    setChecked(false)
    setIsCorrect(false)
    setShowVocabulary(false)
  }, [selectedLevel, questions])

  const currentQuestion = questions[currentIndex]
  const isFirst = currentIndex === 0
  const isLast = currentIndex === questions.length - 1

  const resetForQuestion = useCallback(
    (index) => {
      setInputs(createEmptyInputs(questions[index].answer))
      setChecked(false)
      setIsCorrect(false)
    },
    [questions],
  )

  const goTo = useCallback(
    (index) => {
      setCurrentIndex(index)
      resetForQuestion(index)
    },
    [resetForQuestion],
  )

  const handlePrev = () => {
    if (!isFirst) goTo(currentIndex - 1)
  }

  const handleNext = () => {
    if (!isLast) goTo(currentIndex + 1)
  }

  const handleInputChange = (index, value) => {
    setInputs((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  const handleCheck = () => {
    const correct = checkAnswer(inputs, currentQuestion.answer)
    setIsCorrect(correct)
    setChecked(true)
  }

  const questionWithMeta = {
    ...currentQuestion,
    level,
  }

  return (
    <>
      <Navbar
        currentLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
      />

      <div className="quiz-app">
        <h1 id="quiz-title" className="quiz-app__title">
          {title}
        </h1>

        <div
          className={`quiz-layout ${showVocabulary ? 'quiz-layout--with-vocab' : ''}`}
        >
          <main className="quiz-card">
            <QuizSlide
              question={questionWithMeta}
              inputs={inputs}
              onInputChange={handleInputChange}
              onCheck={handleCheck}
              checked={checked}
              isCorrect={isCorrect}
              showVocabulary={showVocabulary}
              onToggleVocabulary={() => setShowVocabulary((v) => !v)}
            />

            <nav className="quiz-nav" aria-label="문제 이동">
              <button
                type="button"
                className="quiz-btn quiz-btn--secondary"
                onClick={handlePrev}
                disabled={isFirst}
              >
                이전 문제
              </button>
              <span className="quiz-nav__progress">
                {currentIndex + 1} / {questions.length}
              </span>
              <button
                type="button"
                className="quiz-btn quiz-btn--secondary"
                onClick={handleNext}
                disabled={isLast}
              >
                다음 문제
              </button>
            </nav>
          </main>

          <VocabularyList vocabulary={vocabulary} visible={showVocabulary} />
        </div>
      </div>
    </>
  )
}

export default App
