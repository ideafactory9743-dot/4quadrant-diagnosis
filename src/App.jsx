import { useEffect, useMemo, useRef, useState } from 'react';
import Landing from './components/Landing.jsx';
import Question from './components/Question.jsx';
import ResultCard from './components/ResultCard.jsx';
import ResumeModal from './components/ResumeModal.jsx';
import ShareButton from './components/ShareButton.jsx';
import { questions } from './data/questions.js';
import { calculateScores } from './utils/scoring.js';
import { trackEvent } from './utils/analytics.js';

const STORAGE_KEY = 'growth-quadrant-diagnosis-v1';

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function App() {
  const savedState = useMemo(loadSavedState, []);
  const [phase, setPhase] = useState('landing');
  const [currentQ, setCurrentQ] = useState(savedState?.currentQ || 0);
  const [answers, setAnswers] = useState(savedState?.answers || {});
  const [hasSaved, setHasSaved] = useState(Boolean(savedState?.answers && Object.keys(savedState.answers).length));
  const [showResumeModal, setShowResumeModal] = useState(Boolean(savedState?.answers && Object.keys(savedState.answers).length && savedState?.phase !== 'result'));
  const answerTimer = useRef(null);
  const resultRef = useRef(null);

  const isComplete = Object.keys(answers).length === questions.length;
  const scores = useMemo(() => calculateScores(answers), [answers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ phase, currentQ, answers }));
    setHasSaved(Object.keys(answers).length > 0);
  }, [phase, currentQ, answers]);

  useEffect(() => {
    window.history.replaceState({ phase, currentQ }, '');
  }, []);

  useEffect(() => {
    window.history.pushState({ phase, currentQ }, '');
  }, [phase, currentQ]);

  useEffect(() => {
    function handlePopState() {
      if (phase === 'quiz' && currentQ > 0) {
        setCurrentQ((value) => Math.max(0, value - 1));
      } else if (phase === 'result') {
        setPhase('quiz');
        setCurrentQ(questions.length - 1);
      } else {
        setPhase('landing');
      }
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [phase, currentQ]);

  useEffect(() => () => clearTimeout(answerTimer.current), []);

  function startQuiz({ resume = false } = {}) {
    setShowResumeModal(false);
    if (!resume) {
      setAnswers({});
      setCurrentQ(0);
    }
    setPhase('quiz');
    trackEvent('quiz_start');
  }

  function resetSaved() {
    clearTimeout(answerTimer.current);
    localStorage.removeItem(STORAGE_KEY);
    setAnswers({});
    setCurrentQ(0);
    setPhase('landing');
    setHasSaved(false);
    setShowResumeModal(false);
  }

  function handleAnswer(value) {
    const question = questions[currentQ];
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);

    if ([4, 9, 14].includes(currentQ)) {
      trackEvent('quiz_progress', { question_number: currentQ + 1 });
    }

    clearTimeout(answerTimer.current);
    answerTimer.current = setTimeout(() => {
      if (currentQ + 1 >= questions.length) {
        setPhase('result');
        trackEvent('quiz_complete', {
          q1_score: calculateScores(nextAnswers)[1],
          q2_score: calculateScores(nextAnswers)[2],
          q3_score: calculateScores(nextAnswers)[3],
          q4_score: calculateScores(nextAnswers)[4],
        });
      } else {
        setCurrentQ((index) => index + 1);
      }
    }, 300);
  }

  function goBack() {
    clearTimeout(answerTimer.current);
    setCurrentQ((index) => Math.max(0, index - 1));
  }

  if (phase === 'quiz') {
    return (
      <Question
        question={questions[currentQ]}
        currentIndex={currentQ}
        total={questions.length}
        selectedValue={answers[questions[currentQ].id]}
        onAnswer={handleAnswer}
        onBack={goBack}
      />
    );
  }

  if (phase === 'result' && isComplete) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-6xl px-5 py-8 sm:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <button className="ghost-button mb-4" onClick={() => setPhase('landing')}>처음으로</button>
            <h1 className="text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">진단 결과</h1>
            <p className="mt-3 max-w-2xl text-slate-300">낮은 점수는 약점이 아니라 다음 성장 포인트입니다. 지금의 위치를 기준으로 가장 자연스러운 한 걸음을 선택해보세요.</p>
          </div>
          <ShareButton resultRef={resultRef} scores={scores} />
        </div>
        <ResultCard ref={resultRef} scores={scores} />
      </main>
    );
  }

  return (
    <>
      <Landing
        onStart={() => startQuiz({ resume: false })}
        hasSaved={hasSaved}
        onResume={() => startQuiz({ resume: true })}
        onReset={resetSaved}
      />
      {showResumeModal && (
        <ResumeModal
          answeredCount={Object.keys(answers).length}
          onResume={() => startQuiz({ resume: true })}
          onRestart={() => startQuiz({ resume: false })}
          onClose={() => setShowResumeModal(false)}
        />
      )}
    </>
  );
}
