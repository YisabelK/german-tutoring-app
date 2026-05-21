import quizDataC1 from './quizData.json'

export const NAV_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1']

const QUIZ_BY_LEVEL = {
  C1: quizDataC1,
}

export function hasQuiz(level) {
  return level in QUIZ_BY_LEVEL
}

export function getDefaultLevel() {
  return NAV_LEVELS.find(hasQuiz) ?? 'C1'
}

export function getAvailableLevels() {
  return Object.keys(QUIZ_BY_LEVEL)
}

export function loadQuiz(level) {
  const quiz = QUIZ_BY_LEVEL[level]
  if (!quiz) {
    throw new Error(
      `Unknown quiz level "${level}". Available: ${getAvailableLevels().join(', ')}`,
    )
  }
  return quiz
}

export function getInitialQuestionIndex(questions, startId = 1) {
  const index = questions.findIndex((q) => q.id === startId)
  return index >= 0 ? index : 0
}
