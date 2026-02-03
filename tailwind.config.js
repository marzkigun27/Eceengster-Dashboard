/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
            },
            colors: {
                primary: '#1F6F5C',
                secondary: '#7ED6C1',
                accent: {
                    energy: '#F2C94C',
                },
                danger: '#E63946',
                warning: '#F4A261',
                background: '#F7F4E9',
                text: {
                    primary: '#1E2A32',
                },
            },
            animation: {
                'fade-slide-up': 'fadeSlideUp 0.4s ease-in-out forwards',
                'pulse-custom': 'pulseCustom 2s infinite ease-in-out',
                'blink': 'blink 0.8s infinite step-end',
                'shake-soft': 'shakeSoft 0.5s ease-in-out',
                'shake-strong': 'shakeStrong 0.3s ease-in-out infinite',
            },
            keyframes: {
                fadeSlideUp: {
                    from: { opacity: '0', transform: 'translateY(20px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                pulseCustom: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.6' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
                shakeSoft: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-2px)' },
                    '75%': { transform: 'translateX(2px)' },
                },
                shakeStrong: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-5px)' },
                    '75%': { transform: 'translateX(5px)' },
                },
            },
        },
    },
    plugins: [],
};
