import { useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import LevelQuizList from './components/LevelQuizList'
import QuizSlide from './components/QuizSlide'
import VocabularyList from './components/VocabularyList'
import {
  getDefaultLevel,
  getInitialQuestionIndex,
  getQuizById,
  getQuizzesByLevel,
  RECENT_QUIZZES,
} from './data/loadQuiz'
import { checkAnswer, createEmptyInputs } from './utils/checkAnswer'
import './App.css'

const START_QUESTION_ID = 1

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [selectedLevel, setSelectedLevel] = useState(getDefaultLevel)
  const [selectedQuizId, setSelectedQuizId] = useState(null)

  const quizzes = useMemo(
    () => getQuizzesByLevel(selectedLevel),
    [selectedLevel],
  )

  const quiz = useMemo(
    () =>
      selectedQuizId
        ? getQuizById(selectedLevel, selectedQuizId)
        : null,
    [selectedLevel, selectedQuizId],
  )

  const handleGoHome = useCallback(() => {
    setShowLanding(true)
    setSelectedQuizId(null)
  }, [])

  const handleLevelChange = useCallback((level) => {
    setShowLanding(false)
    setSelectedLevel(level)
    setSelectedQuizId(null)
  }, [])

  const handleSelectQuiz = useCallback((quizId) => {
    setShowLanding(false)
    setSelectedQuizId(quizId)
  }, [])

  const handleSelectQuizFromLanding = useCallback((level, quizId) => {
    setShowLanding(false)
    setSelectedLevel(level)
    setSelectedQuizId(quizId)
  }, [])

  const handleBackToList = useCallback(() => {
    setSelectedQuizId(null)
  }, [])

  if (showLanding) {
    return (
      <>
        <Navbar
          currentLevel={selectedLevel}
          onLevelChange={handleLevelChange}
          onGoHome={handleGoHome}
          isHome
        />
        <div className="quiz-app quiz-app--landing">
          <LandingPage
            recentQuizzes={RECENT_QUIZZES}
            onSelectLevel={handleLevelChange}
            onSelectQuiz={handleSelectQuizFromLanding}
          />
        </div>
      </>
    )
  }

  if (!quiz) {
    return (
      <>
        <Navbar
          currentLevel={selectedLevel}
          onLevelChange={handleLevelChange}
          onGoHome={handleGoHome}
          isHome={false}
        />
        <div className="quiz-app">
          <LevelQuizList
            level={selectedLevel}
            quizzes={quizzes}
            onSelectQuiz={handleSelectQuiz}
          />
        </div>
      </>
    )
  }

  return (
    <QuizView
      key={`${selectedLevel}-${selectedQuizId}`}
      quiz={quiz}
      onBackToList={handleBackToList}
      currentLevel={selectedLevel}
      onLevelChange={handleLevelChange}
      onGoHome={handleGoHome}
    />
  )
}

function QuizView({ quiz, onBackToList, currentLevel, onLevelChange, onGoHome }) {
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
  }, [questions])

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
        currentLevel={currentLevel}
        onLevelChange={onLevelChange}
        onGoHome={onGoHome}
        isHome={false}
      />

      <div className="quiz-app">
        <header className="quiz-app__header">
          <button
            type="button"
            className="quiz-btn quiz-btn--ghost quiz-app__back"
            onClick={onBackToList}
          >
            ← 퀴즈 목록
          </button>
          <h1 id="quiz-title" className="quiz-app__title">
            {title}
          </h1>
        </header>

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
