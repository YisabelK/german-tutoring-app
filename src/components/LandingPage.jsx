import { NAV_LEVELS } from "../data/loadQuiz";

const FEATURE_CARDS = [
  {
    title: "레벨별 문제 정리",
    description: "A1부터 C1까지 레벨별로 퀴즈를 모아 연습합니다.",
  },
  {
    title: "단어 리스트 확인",
    description: "퀴즈에 쓰인 어휘를 한눈에 보며 복습합니다.",
  },
  {
    title: "빈칸 문제 풀이",
    description: "문장 속 빈칸에 알맞은 표현을 직접 입력합니다.",
  },
  {
    title: "정답 확인",
    description: "제출 후 정답 여부와 모범 답안을 바로 확인합니다.",
  },
  {
    title: "수업 중 화면 공유에 적합",
    description: "슬라이드형 화면으로 수업·과외 시 공유하기 좋습니다.",
  },
];

function LandingPage({ recentQuizzes, onSelectLevel, onSelectQuiz }) {
  return (
    <main className="landing">
      <section className="landing__hero" aria-labelledby="landing-title">
        <h1 id="landing-title" className="landing__title">
          YK 독일어
        </h1>
        <p className="landing__subtitle">독일어 과외를 위한 맞춤형 연습 공간</p>
        <p className="landing__description">
          A1부터 C1까지 어휘, 문법, 시험 문제를 슬라이드처럼 연습할 수 있습니다.
        </p>

        <div className="landing__actions">
          {NAV_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              className="landing__level-btn"
              onClick={() => onSelectLevel(level)}
            >
              {level} 문제 보기
            </button>
          ))}
        </div>
      </section>

      <section
        className="landing__features"
        aria-labelledby="landing-features-heading"
      >
        <h2 id="landing-features-heading" className="landing__section-title">
          이런 기능을 사용할 수 있어요
        </h2>
        <ul className="landing__feature-grid">
          {FEATURE_CARDS.map((card) => (
            <li key={card.title} className="landing__feature-card">
              <h3 className="landing__feature-title">{card.title}</h3>
              <p className="landing__feature-desc">{card.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="landing__recent"
        aria-labelledby="landing-recent-heading"
      >
        <h2 id="landing-recent-heading" className="landing__section-title">
          최근 추가된 퀴즈
        </h2>
        <ul className="landing__recent-list">
          {recentQuizzes.map((item) => (
            <li key={`${item.level}-${item.quizId}`}>
              <button
                type="button"
                className="landing__recent-item"
                onClick={() => onSelectQuiz(item.level, item.quizId)}
              >
                <span className="landing__recent-level">{item.level}</span>
                <span className="landing__recent-title">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default LandingPage;
