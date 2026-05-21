import { useEffect, useRef, useState } from 'react'

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
  onSubmit,
  onRevealAnswer,
  checked,
  isCorrect,
  showAnswer,
  showVocabulary,
  onToggleVocabulary,
}) {
  const inputRefs = useRef([])
  const [showHint, setShowHint] = useState(false)
  const blankCount = Array.isArray(question.answer)
    ? question.answer.length
    : 1

  const isLocked = checked && isCorrect
  const showWrong = checked && !isCorrect

  useEffect(() => {
    setShowHint(false)
  }, [question.id])

  const handleKeyDown = (e, index) => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    if (isLocked) return

    if (index < blankCount - 1) {
      inputRefs.current[index + 1]?.focus()
      return
    }

    onSubmit()
  }

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
        {renderSentenceWithAnswers(question, showAnswer)}
      </p>
      <div className="quiz-slide__hint-area">
        <button
          type="button"
          className="quiz-slide__hint-toggle"
          onClick={() => setShowHint((v) => !v)}
          aria-expanded={showHint}
        >
          {showHint ? '힌트 숨기기' : '힌트 확인'}
        </button>
        {showHint && (
          <p className="quiz-slide__hint">{question.hint}</p>
        )}
      </div>

      <div className="quiz-slide__answer-area">
        {blankCount === 1 ? (
          <input
            ref={(el) => {
              inputRefs.current[0] = el
            }}
            type="text"
            className="quiz-input"
            value={inputs[0] ?? ''}
            onChange={(e) => onInputChange(0, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            placeholder="Antwort eingeben"
            disabled={isLocked}
            autoComplete="off"
            spellCheck="false"
          />
        ) : (
          <div className="quiz-slide__multi-inputs">
            {Array.from({ length: blankCount }, (_, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el
                }}
                type="text"
                className="quiz-input"
                value={inputs[i] ?? ''}
                onChange={(e) => onInputChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                placeholder={`Antwort ${i + 1}`}
                disabled={isLocked}
                autoComplete="off"
                spellCheck="false"
              />
            ))}
          </div>
        )}

        {!isLocked && (
          <div className="quiz-slide__actions">
            <button
              type="button"
              className="quiz-btn quiz-btn--primary"
              onClick={onSubmit}
            >
              정답 제출
            </button>
            {checked && (
              <button
                type="button"
                className="quiz-btn quiz-btn--secondary"
                onClick={onRevealAnswer}
              >
                정답 확인
              </button>
            )}
          </div>
        )}

        {showWrong && (
          <div
            className="quiz-slide__result quiz-slide__result--wrong"
            role="status"
          >
            <p className="quiz-slide__result-label">✗ 틀렸습니다.</p>
            <p className="quiz-slide__result-hint">
              답을 수정한 뒤 정답 제출을 다시 누르거나, 정답 확인으로 모범 답안을
              볼 수 있습니다.
            </p>
          </div>
        )}

        {isLocked && (
          <div
            className="quiz-slide__result quiz-slide__result--correct"
            role="status"
          >
            <p className="quiz-slide__result-label">✓ 맞았습니다!</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default QuizSlide
