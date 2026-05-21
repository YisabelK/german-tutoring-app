function LevelQuizList({ level, quizzes, onSelectQuiz }) {
  if (quizzes.length === 0) {
    return (
      <section className="level-quiz-list level-quiz-list--empty" aria-labelledby="level-heading">
        <h1 id="level-heading" className="level-quiz-list__heading">
          {level}
        </h1>
        <p className="level-quiz-list__empty">이 레벨의 퀴즈는 준비 중입니다.</p>
      </section>
    )
  }

  return (
    <section className="level-quiz-list" aria-labelledby="level-heading">
      <h1 id="level-heading" className="level-quiz-list__heading">
        {level} 퀴즈
      </h1>
      <ul className="level-quiz-list__items">
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <button
              type="button"
              className="level-quiz-list__item"
              onClick={() => onSelectQuiz(quiz.id)}
            >
              <span className="level-quiz-list__title">{quiz.title}</span>
              <span className="level-quiz-list__meta">
                {quiz.questions.length}문항
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default LevelQuizList
