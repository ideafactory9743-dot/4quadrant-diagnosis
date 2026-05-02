import { questions, quadrants } from '../data/questions.js';
import { levelLabels, patterns } from '../data/interpretations.js';

export function getScore(question, rawAnswer) {
  if (!rawAnswer) return 0;
  return question.reverse ? 6 - rawAnswer : rawAnswer;
}

export function calculateScores(answers) {
  const totals = { 1: 0, 2: 0, 3: 0, 4: 0 };

  questions.forEach((question) => {
    totals[question.quadrant] += getScore(question, Number(answers[question.id] || 0));
  });

  return Object.fromEntries(
    Object.entries(totals).map(([quadrant, total]) => [quadrant, Math.round((total / 25) * 100)]),
  );
}

export function getLevel(score) {
  if (score >= levelLabels.mature.min) return levelLabels.mature;
  if (score >= levelLabels.growing.min) return levelLabels.growing;
  if (score >= levelLabels.exploring.min) return levelLabels.exploring;
  return levelLabels.undiscovered;
}

export function getDominantQuadrant(scores) {
  return Number(Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]);
}

export function getWeakestQuadrant(scores) {
  return Number(Object.entries(scores).sort((a, b) => a[1] - b[1])[0][0]);
}

export function getPattern(scores) {
  const matched = patterns.find((pattern) => pattern.condition(scores));
  if (matched) return matched;

  const weakest = getWeakestQuadrant(scores);
  const dominant = getDominantQuadrant(scores);

  return {
    id: 99,
    pattern: '혼합형',
    message: `${quadrants[dominant].shortName}이 가장 강하고, ${quadrants[weakest].shortName}이 다음 성장 포인트입니다.`,
    growthPath: [weakest],
    ctaType: weakest === 1 ? 'self-study' : weakest === 2 ? 'ecosystem' : weakest === 3 ? 'vision-coaching' : 'challenge',
  };
}

export function getResultSummary(scores) {
  const dominant = getDominantQuadrant(scores);
  const weakest = getWeakestQuadrant(scores);
  const pattern = getPattern(scores);

  return {
    dominant,
    weakest,
    pattern,
    dominantLabel: quadrants[dominant],
    weakestLabel: quadrants[weakest],
  };
}
