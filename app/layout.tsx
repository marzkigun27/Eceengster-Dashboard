import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-plus-jakarta-sans',
    weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: 'SmartBioDigester Monitoring',
    description: 'Real-time biodigester monitoring dashboard',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/assets/logo-web-eceng.ico" />
            </head>
            <body className={`${plusJakartaSans.className} eco-pattern min-h-screen text-[#1E2A32]`}>
                {children}
            </body>
        </html>
    );
}
