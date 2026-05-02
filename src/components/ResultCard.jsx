import { forwardRef } from 'react';
import { quadrants } from '../data/questions.js';
import { ctas } from '../data/interpretations.js';
import { getLevel, getResultSummary } from '../utils/scoring.js';
import { trackEvent } from '../utils/analytics.js';
import RadarChart from './RadarChart.jsx';

const ResultCard = forwardRef(function ResultCard({ scores }, ref) {
  const summary = getResultSummary(scores);
  const cta = ctas[summary.pattern.ctaType];
  const growthPath = summary.pattern.growthPath.length
    ? summary.pattern.growthPath.map((id) => quadrants[id].shortName).join(' → ')
    : summary.pattern.id === 11
      ? `${summary.dominantLabel.shortName} 심화`
      : '가장 끌리는 분면부터';
  const actionCards = [
    {
      title: `${summary.weakestLabel.shortName} 관찰하기`,
      text: `이번 주에는 ${summary.weakestLabel.shortName}과 관련된 작은 행동 하나를 기록해보세요.`,
    },
    {
      title: '성장 경로 따라가기',
      text: `${growthPath} 순서로 무리하지 않고 한 분면씩 확장해보세요.`,
    },
    {
      title: cta.title,
      text: cta.description,
    },
  ];

  function handleCtaClick() {
    trackEvent('cta_click', { cta_type: summary.pattern.ctaType, pattern_id: summary.pattern.id });
  }

  return (
    <section ref={ref} className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-5 shadow-glow sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
          <RadarChart scores={scores} />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-bold text-slate-400">나의 성장 4분면 결과</p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              {summary.pattern.message}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {Object.values(quadrants).map((quadrant) => {
              const level = getLevel(scores[quadrant.id]);
              const isDominant = quadrant.id === summary.dominant;
              const isWeakest = quadrant.id === summary.weakest;
              return (
                <article key={quadrant.id} className={`score-card ${isDominant ? 'is-dominant' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-300">{quadrant.shortName}</span>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: quadrant.color }} />
                  </div>
                  <div className="mt-3 text-3xl font-black text-white">{scores[quadrant.id]}%</div>
                  <p className="mt-2 text-xs text-slate-400">
                    {level.emoji} {level.label}{isWeakest ? ' · 성장 포인트' : ''}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.05] p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-950">
                주요 분면: {summary.dominantLabel.shortName}
              </span>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-200">
                패턴 {summary.pattern.id}: {summary.pattern.pattern}
              </span>
            </div>
            <p className="mt-4 leading-7 text-slate-300">
              지금은 <strong className="text-white">{summary.dominantLabel.shortName}</strong>의 힘을 기반으로,
              <strong className="text-white"> {summary.weakestLabel.shortName}</strong>을 부드럽게 확장하면 좋은 시점입니다.
              낮은 점수는 부족함이 아니라 아직 탐색하지 않은 성장의 입구입니다.
            </p>
            <p className="mt-3 text-sm text-slate-400">추천 성장 경로: {growthPath}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {actionCards.map((action) => (
              <article key={action.title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <h3 className="font-black text-white">{action.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{action.text}</p>
              </article>
            ))}
          </div>

          <div className="rounded-[1.25rem] bg-gradient-to-br from-white to-slate-200 p-5 text-slate-950">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Recommended Action</p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">{cta.title}</h2>
            <p className="mt-2 leading-7 text-slate-700">{cta.description}</p>
            <a href={cta.url} onClick={handleCtaClick} className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white">
              다음 단계 보기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ResultCard;
