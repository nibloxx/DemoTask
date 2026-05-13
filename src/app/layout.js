import { Fraunces, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const fraunces = Fraunces({
	variable: '--font-fraunces',
	subsets: ['latin'],
});

export const metadata = {
	title: 'Missionary Needs | MissionaryDoctors',
	description:
		'Browse urgent medical projects and equipment needs across mission hospitals worldwide.',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
