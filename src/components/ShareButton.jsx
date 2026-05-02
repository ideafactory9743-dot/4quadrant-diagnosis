import { useState } from 'react';
import { saveResultImage, shareText } from '../utils/share.js';
import { trackEvent } from '../utils/analytics.js';

export default function ShareButton({ resultRef, scores }) {
  const [status, setStatus] = useState('');

  async function handleImage() {
    setStatus('이미지 생성 중...');
    try {
      await saveResultImage(resultRef.current);
      trackEvent('result_share', { share_method: 'image' });
      setStatus('PNG 저장을 시작했습니다.');
    } catch {
      setStatus('이미지 생성에 실패해 텍스트 공유를 사용해주세요.');
    }
  }

  async function handleText() {
    try {
      await shareText(scores);
      trackEvent('result_share', { share_method: 'link' });
      setStatus(navigator.share ? '공유 창을 열었습니다.' : '결과 문구를 클립보드에 복사했습니다.');
    } catch {
      setStatus('공유가 취소되었거나 실패했습니다.');
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button className="primary-button" onClick={handleImage}>결과 PNG 저장</button>
      <button className="secondary-button" onClick={handleText}>텍스트 공유</button>
      {status && <p className="text-sm text-slate-300">{status}</p>}
    </div>
  );
}
