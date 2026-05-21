import a1Quizzes from './quizzes/a1/index.js'
import a2Quizzes from './quizzes/a2/index.js'
import b1Quizzes from './quizzes/b1/index.js'
import b2Quizzes from './quizzes/b2/index.js'
import c1Quizzes from './quizzes/c1/index.js'

export const NAV_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1']

export const QUIZZES_BY_LEVEL = {
  A1: a1Quizzes,
  A2: a2Quizzes,
  B1: b1Quizzes,
  B2: b2Quizzes,
  C1: c1Quizzes,
}

export function getQuizzesByLevel(level) {
  return QUIZZES_BY_LEVEL[level] ?? []
}

export function getQuizById(level, quizId) {
  return getQuizzesByLevel(level).find((quiz) => quiz.id === quizId) ?? null
}

export function hasQuiz(level) {
  return getQuizzesByLevel(level).length > 0
}

export function getDefaultLevel() {
  return NAV_LEVELS.find(hasQuiz) ?? 'C1'
}

export function getInitialQuestionIndex(questions, startId = 1) {
  const index = questions.findIndex((q) => q.id === startId)
  return index >= 0 ? index : 0
}

/** 홈 랜딩에 표시할 최근 퀴즈 (level, quizId, title) */
export const RECENT_QUIZZES = [
  { level: 'C1', quizId: 'lesenTeil2', title: 'Lesen Teil 2 Wörter' },
  { level: 'B2', quizId: 'sprachbausteine-teil-1', title: 'Sprachbausteine Teil 1 Wörter' },
]
