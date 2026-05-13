'use client';

import { useEffect, useMemo, useState } from 'react';
import Container from './Container';
import { heroContent } from '@/lib/missionary-needs';

function parseCounterValue(value) {
	const match = String(value).match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);

	if (!match) {
		return null;
	}

	const [, prefix, numberPart, suffix] = match;
	const decimals = numberPart.includes('.') ? numberPart.split('.')[1].length : 0;

	return {
		prefix,
		suffix,
		amount: Number(numberPart),
		decimals,
	};
}

function formatCounterValue(parts, progress) {
	const currentValue = parts.amount * progress;
	const formattedNumber =
		parts.decimals > 0
			? currentValue.toFixed(parts.decimals)
			: Math.round(currentValue).toString();

	return `${parts.prefix}${formattedNumber}${parts.suffix}`;
}

function CountUpStatValue({ value, delay = 0 }) {
	const counterParts = useMemo(() => parseCounterValue(value), [value]);
	const [displayValue, setDisplayValue] = useState(() =>
		counterParts ? formatCounterValue(counterParts, 0) : value
	);

	useEffect(() => {
		if (!counterParts) {
			setDisplayValue(value);
			return;
		}

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setDisplayValue(value);
			return;
		}

		let frameId;
		let timeoutId;
		const duration = 1400;

		const startAnimation = () => {
			const startTime = performance.now();

			const animate = currentTime => {
				const progress = Math.min((currentTime - startTime) / duration, 1);
				const easedProgress = 1 - Math.pow(1 - progress, 3);

				setDisplayValue(formatCounterValue(counterParts, easedProgress));

				if (progress < 1) {
					frameId = window.requestAnimationFrame(animate);
				}
			};

			frameId = window.requestAnimationFrame(animate);
		};

		timeoutId = window.setTimeout(startAnimation, delay);

		return () => {
			window.clearTimeout(timeoutId);
			window.cancelAnimationFrame(frameId);
		};
	}, [counterParts, delay, value]);

	return displayValue;
}

export default function HeroSection() {
	return (
		<section className='border-b border-hair'>
			<Container className='py-16'>
				<p className='font-mono text-[13px] uppercase tracking-[0.18em] text-mute'>
					{heroContent.eyebrow}
				</p>

				<h1 className='mt-6 max-w-[18ch] font-fraunces text-4xl font-medium leading-none tracking-[-0.03em] md:text-5xl xl:text-[76px]'>
					{heroContent.titleStart}{' '}
					<span className='text-terra'>
						{heroContent.titleHighlight}
					</span>
					<br />
					{heroContent.titleEnd}
				</h1>

				<p className='mt-7 max-w-[50ch] text-lg leading-[1.55] text-ink-2 md:text-xl'>
					{heroContent.description}
				</p>

				<div className='mt-7 flex flex-col gap-2 font-mono text-[13px] uppercase tracking-[0.12em] text-ink-2 sm:flex-row sm:flex-wrap sm:gap-0'>
					{heroContent.promises.map((promise, index) => (
						<span
							key={promise}
							className={`sm:mr-[18px] sm:pr-[18px] ${
								index !== heroContent.promises.length - 1
									? 'sm:border-r sm:border-hair'
									: ''
							}`}
						>
							{promise}
						</span>
					))}
				</div>

				<div className='mt-11 grid gap-5 pt-7 md:grid-cols-3 md:gap-0'>
					{heroContent.stats.map((stat, index) => (
						<div
							key={stat.label}
							className={`flex flex-col items-center text-center border-b border-hair pb-5 md:border-b-0 md:px-8 md:pb-0 ${
								index < heroContent.stats.length - 1
									? 'md:border-r md:border-hair'
									: ''
							}`}
						>
							<strong className='mb-2 block font-fraunces text-[38px] font-medium leading-none tracking-[-0.02em]'>
								<CountUpStatValue value={stat.value} delay={index * 120} />
							</strong>
							<span className='font-mono text-[13px] tracking-[0.1em] text-mute capitalize'>
								{stat.label}
							</span>
						</div>
					))}
				</div>
			</Container>
		</section>
	);
}
