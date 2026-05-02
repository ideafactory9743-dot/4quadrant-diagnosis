import { likert, quadrants } from '../data/questions.js';
import ProgressBar from './ProgressBar.jsx';

export default function Question({ question, currentIndex, total, selectedValue, onAnswer, onBack }) {
  const quadrant = quadrants[question.quadrant];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-5 py-8">
      <ProgressBar current={currentIndex + 1} total={total} />
      <section key={question.id} className="question-slide mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: quadrant.color }} />
            <span className="text-sm font-bold text-slate-300">{quadrant.name} · {quadrant.shortName}</span>
          </div>
          {question.reverse && (
            <span className="rounded-full border border-orange-300/25 bg-orange-300/10 px-3 py-1 text-xs text-orange-100">
              역채점 문항
            </span>
          )}
        </div>

        <h1 className="min-h-32 text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-4xl">
          {question.text}
        </h1>

        <div className="mt-10 grid gap-3 sm:grid-cols-5">
          {likert.map((item) => (
            <button
              key={item.value}
              className={`likert-button ${selectedValue === item.value ? 'is-selected' : ''}`}
              onClick={() => onAnswer(item.value)}
              aria-pressed={selectedValue === item.value}
            >
              <span className="text-2xl font-black">{item.value}</span>
              <span className="text-xs leading-4">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button className="ghost-button" onClick={onBack} disabled={currentIndex === 0}>
            이전 문항
          </button>
          <p className="text-sm text-slate-400">선택하면 자동으로 다음 문항으로 넘어갑니다.</p>
        </div>
      </section>
    </main>
  );
}
