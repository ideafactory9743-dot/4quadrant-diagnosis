import { toPng } from 'html-to-image';

export async function saveResultImage(element) {
  if (!element) throw new Error('결과 영역을 찾을 수 없습니다.');
  const dataUrl = await toPng(element, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: '#0F172A',
  });

  const link = document.createElement('a');
  link.download = `growth-quadrant-result-${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
  return dataUrl;
}

export async function shareText(scores) {
  const url = new URL(window.location.href);
  url.searchParams.set('utm_source', 'result_share');
  url.searchParams.set('utm_medium', 'social');
  url.searchParams.set('utm_campaign', 'growth_quadrant');
  const text = `나의 성장 4분면 결과: 1분면 ${scores[1]}% | 2분면 ${scores[2]}% | 3분면 ${scores[3]}% | 4분면 ${scores[4]}% 🎯`;
  if (navigator.share) {
    await navigator.share({ title: '성장 4분면 자가진단 결과', text, url: url.toString() });
    return;
  }
  await navigator.clipboard.writeText(`${text}\n${url.toString()}`);
}
