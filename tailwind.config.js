export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        slateDark: '#0F172A',
        textLight: '#F8FAFC',
        q1: '#8B5CF6',
        q2: '#3B82F6',
        q3: '#10B981',
        q4: '#F59E0B',
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', 'system-ui', 'Apple SD Gothic Neo', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px rgba(139, 92, 246, 0.22)',
      },
    },
  },
  plugins: [],
};
