export default function ResumeModal({ answeredCount, onResume, onRestart, onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 px-5 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="resume-title">
      <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-glow">
        <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-white text-2xl text-slate-950">↻</div>
        <h2 id="resume-title" className="text-2xl font-black tracking-[-0.03em] text-white">이어서 할까요?</h2>
        <p className="mt-3 leading-7 text-slate-300">
          이전에 답변한 {answeredCount}개 문항이 저장되어 있습니다. 이어서 진행하거나 처음부터 다시 시작할 수 있어요.
        </p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button className="primary-button" onClick={onResume}>이어서 하기</button>
          <button className="secondary-button" onClick={onRestart}>처음부터</button>
        </div>
        <button className="ghost-button mt-4 w-full" onClick={onClose}>나중에 결정하기</button>
      </section>
    </div>
  );
}
