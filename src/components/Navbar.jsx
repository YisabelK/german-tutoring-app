import { NAV_LEVELS } from '../data/loadQuiz'

function Navbar({ currentLevel, onLevelChange, onGoHome, isHome }) {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <button
          type="button"
          className="navbar__brand"
          onClick={onGoHome}
          aria-current={isHome ? 'page' : undefined}
        >
          YK 독일어
        </button>
        <nav className="navbar__levels" aria-label="레벨 선택">
          {NAV_LEVELS.map((level) => {
            const isActive = !isHome && level === currentLevel

            return (
              <button
                key={level}
                type="button"
                className={`navbar__level${isActive ? ' navbar__level--active' : ''}`}
                onClick={() => onLevelChange(level)}
                aria-current={isActive ? 'page' : undefined}
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
