import { quadrants } from '../data/questions.js';

export default function Landing({ onStart, hasSaved, onResume, onReset }) {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-xl text-slate-950">✦</span>
          <span className="font-semibold tracking-tight">성장 4분면</span>
        </div>
        <button className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 hover:bg-white/10" onClick={onStart}>
          진단 시작
        </button>
      </nav>

      <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-10">
        <div className="space-y-8">
          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-[-0.05em] text-white sm:text-7xl">
              당신은 성장의 어디쯤에 있나요?
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              20개 질문, 5분이면 충분합니다. 자기 이해·세계 이해·방향 설정·실행 영향의 4분면에서 지금의 위치를 확인해보세요.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="primary-button" onClick={onStart}>
              진단 시작하기
            </button>
            {hasSaved && (
              <>
                <button className="secondary-button" onClick={onResume}>
                  이어서 하기
                </button>
                <button className="ghost-button" onClick={onReset}>
                  저장 기록 삭제
                </button>
              </>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-q1/30 via-q2/20 to-q4/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-5 shadow-glow backdrop-blur">
            <div className="grid grid-cols-2 gap-3">
              {Object.values(quadrants).map((quadrant) => (
                <article key={quadrant.id} className="quadrant-card" style={{ '--accent': quadrant.color }}>
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-sm font-bold text-white/70">{quadrant.id}분면</span>
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: quadrant.color }} />
                  </div>
                  <h2 className="text-xl font-extrabold text-white">{quadrant.shortName}</h2>
                  <p className="mt-2 text-sm text-slate-300">{quadrant.question}</p>
                  <p className="mt-5 text-xs leading-5 text-slate-400">{quadrant.keywords}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
