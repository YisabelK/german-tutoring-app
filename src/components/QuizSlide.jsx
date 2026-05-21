const BLANK = '______________'

function renderSentenceWithAnswers(question, showAnswer) {
  if (!showAnswer) {
    return question.sentence
  }

  const answers = Array.isArray(question.answer)
    ? question.answer
    : [question.answer]

  const parts = question.sentence.split(BLANK)
  const elements = []

  parts.forEach((part, i) => {
    elements.push(<span key={`part-${i}`}>{part}</span>)
    if (i < answers.length) {
      elements.push(
        <span key={`ans-${i}`} className="answer-highlight">
          {answers[i]}
        </span>,
      )
    }
  })

  return elements
}

function QuizSlide({
  question,
  inputs,
  onInputChange,
  onCheck,
  checked,
  isCorrect,
  showVocabulary,
  onToggleVocabulary,
}) {
  const blankCount = Array.isArray(question.answer)
    ? question.answer.length
    : 1

  return (
    <section className="quiz-slide" aria-labelledby="quiz-title">
      <header className="quiz-slide__header">
        <p className="quiz-slide__meta">
          <span className="quiz-slide__level">{question.level ?? ''}</span>
          <span className="quiz-slide__number">Frage {question.id}</span>
        </p>
        <button
          type="button"
          className="quiz-btn quiz-btn--ghost"
          onClick={onToggleVocabulary}
        >
          {showVocabulary ? '단어 목록 숨기기' : '단어 목록 보기'}
        </button>
      </header>

      <p className="quiz-slide__sentence">
        {renderSentenceWithAnswers(question, checked)}
      </p>
      <p className="quiz-slide__hint">{question.hint}</p>

      <div className="quiz-slide__answer-area">
        {blankCount === 1 ? (
          <input
            type="text"
            className="quiz-input"
            value={inputs[0] ?? ''}
            onChange={(e) => onInputChange(0, e.target.value)}
            placeholder="Antwort eingeben"
            disabled={checked}
            autoComplete="off"
            spellCheck="false"
          />
        ) : (
          <div className="quiz-slide__multi-inputs">
            {Array.from({ length: blankCount }, (_, i) => (
              <input
                key={i}
                type="text"
                className="quiz-input"
                value={inputs[i] ?? ''}
                onChange={(e) => onInputChange(i, e.target.value)}
                placeholder={`Antwort ${i + 1}`}
                disabled={checked}
                autoComplete="off"
                spellCheck="false"
              />
            ))}
          </div>
        )}

        {!checked && (
          <button
            type="button"
            className="quiz-btn quiz-btn--primary"
            onClick={onCheck}
          >
            정답 확인
          </button>
        )}

        {checked && (
          <div
            className={`quiz-slide__result ${isCorrect ? 'quiz-slide__result--correct' : 'quiz-slide__result--wrong'}`}
            role="status"
          >
            <p className="quiz-slide__result-label">
              {isCorrect ? '✓ 맞았습니다!' : '✗ 틀렸습니다.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default QuizSlide
