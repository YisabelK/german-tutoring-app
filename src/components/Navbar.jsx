import { hasQuiz, NAV_LEVELS } from '../data/loadQuiz'

function Navbar({ currentLevel, onLevelChange }) {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a href="/" className="navbar__brand">
          YK 독일어
        </a>
        <nav className="navbar__levels" aria-label="레벨 선택">
          {NAV_LEVELS.map((level) => {
            const available = hasQuiz(level)
            const isActive = level === currentLevel

            return (
              <button
                key={level}
                type="button"
                className={`navbar__level${isActive ? ' navbar__level--active' : ''}${!available ? ' navbar__level--disabled' : ''}`}
                onClick={() => available && onLevelChange(level)}
                disabled={!available}
                aria-current={isActive ? 'page' : undefined}
                title={available ? undefined : '준비 중'}
              >
                {level}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
