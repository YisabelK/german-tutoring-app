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
import { shuffleArray } from './utils/shuffleArray'
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

  const [orderedQuestions, setOrderedQuestions] = useState(() => [...questions])

  const initialIndex = useMemo(
    () => getInitialQuestionIndex(orderedQuestions, START_QUESTION_ID),
    [orderedQuestions],
  )

  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [inputs, setInputs] = useState(() =>
    createEmptyInputs(orderedQuestions[initialIndex].answer),
  )
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showVocabulary, setShowVocabulary] = useState(false)

  useEffect(() => {
    const nextOrder = [...questions]
    const index = getInitialQuestionIndex(nextOrder, START_QUESTION_ID)
    setOrderedQuestions(nextOrder)
    setCurrentIndex(index)
    setInputs(createEmptyInputs(nextOrder[index].answer))
    setChecked(false)
    setIsCorrect(false)
    setShowAnswer(false)
    setShowVocabulary(false)
  }, [questions])

  const currentQuestion = orderedQuestions[currentIndex]
  const isFirst = currentIndex === 0
  const isLast = currentIndex === orderedQuestions.length - 1

  const resetForQuestion = useCallback(
    (index) => {
      setInputs(createEmptyInputs(orderedQuestions[index].answer))
      setChecked(false)
      setIsCorrect(false)
      setShowAnswer(false)
    },
    [orderedQuestions],
  )

  const handleShuffle = useCallback(() => {
    const shuffled = shuffleArray(questions)
    setOrderedQuestions(shuffled)
    setCurrentIndex(0)
    setInputs(createEmptyInputs(shuffled[0].answer))
    setChecked(false)
    setIsCorrect(false)
    setShowAnswer(false)
  }, [questions])

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

  const handleSubmit = () => {
    const correct = checkAnswer(inputs, currentQuestion.answer)
    setIsCorrect(correct)
    setChecked(true)
    if (correct) {
      setShowAnswer(true)
    }
  }

  const handleRevealAnswer = () => {
    setShowAnswer(true)
  }

  const isAnsweredCorrect = checked && isCorrect

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
          <div className="quiz-app__title-row">
            <h1 id="quiz-title" className="quiz-app__title">
              {title}
            </h1>
            <button
              type="button"
              className="quiz-btn quiz-btn--ghost quiz-app__shuffle"
              onClick={handleShuffle}
            >
              섞기
            </button>
          </div>
        </header>

        <div
          className={`quiz-layout ${showVocabulary ? 'quiz-layout--with-vocab' : ''}`}
        >
          <main className="quiz-card">
            <QuizSlide
              question={questionWithMeta}
              inputs={inputs}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onRevealAnswer={handleRevealAnswer}
              checked={checked}
              isCorrect={isCorrect}
              showAnswer={showAnswer}
              showVocabulary={showVocabulary}
              onToggleVocabulary={() => setShowVocabulary((v) => !v)}
            />

            <nav
              className={`quiz-nav${isAnsweredCorrect ? ' quiz-nav--correct-only' : ''}`}
              aria-label="문제 이동"
            >
              {!isAnsweredCorrect && (
                <button
                  type="button"
                  className="quiz-btn quiz-btn--secondary"
                  onClick={handlePrev}
                  disabled={isFirst}
                >
                  이전 문제
                </button>
              )}
              <span className="quiz-nav__progress">
                {currentIndex + 1} / {orderedQuestions.length}
              </span>
              {isAnsweredCorrect ? (
                <button
                  type="button"
                  className="quiz-btn quiz-btn--primary quiz-nav__next-only"
                  onClick={handleNext}
                  disabled={isLast}
                >
                  다음 문제
                </button>
              ) : (
                <button
                  type="button"
                  className="quiz-btn quiz-btn--secondary"
                  onClick={handleNext}
                  disabled={isLast}
                >
                  다음 문제
                </button>
              )}
            </nav>
          </main>

          <VocabularyList vocabulary={vocabulary} visible={showVocabulary} />
        </div>
      </div>
    </>
  )
}

export default App
