function VocabularyList({ vocabulary, visible }) {
  if (!visible) return null

  return (
    <aside className="vocabulary-panel" aria-label="단어 목록">
      <h2 className="vocabulary-panel__title">Vokabeln</h2>
      <ul className="vocabulary-panel__list">
        {vocabulary.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
    </aside>
  )
}

export default VocabularyList
