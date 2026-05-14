'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import Container from './Container';
import { heroContent } from '@/lib/missionary-needs';

function parseCounterValue(value) {
	const match = String(value).match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);

	if (!match) {
		return null;
	}

	const [, prefix, numberPart, suffix] = match;
	const decimals = numberPart.includes('.')
		? numberPart.split('.')[1].length
		: 0;

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
		counterParts ? formatCounterValue(counterParts, 0) : value,
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
				const progress = Math.min(
					(currentTime - startTime) / duration,
					1,
				);
				const easedProgress = 1 - Math.pow(1 - progress, 3);

				setDisplayValue(
					formatCounterValue(counterParts, easedProgress),
				);

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
			<Container className='py-6 md:py-16'>
				<div className='grid items-center gap-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:gap-14'>
					<div>
						<p className='font-mono text-[13px] uppercase tracking-[0.18em] text-mute'>
							{heroContent.eyebrow}
						</p>

						<h1 className='mt-6 max-w-[18ch] font-fraunces text-4xl font-medium leading-none tracking-[-0.03em] md:text-5xl xl:text-[66px]'>
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
						<div className='mt-7 flex flex-col gap-1 text-[12px] font-medium uppercase tracking-[0.12em] text-ink-2 sm:flex-row'>
							{heroContent.promises.map((promise, index) => (
								<span
									key={promise}
									className={`sm:mr-[10px] sm:pr-[10px] whitespace-nowrap ${
										index !==
										heroContent.promises.length - 1
											? 'sm:border-r sm:border-hair'
											: ''
									}`}
								>
									{promise}
								</span>
							))}
						</div>
					</div>

					<div className='relative overflow-hidden rounded-[26px] border border-hair bg-bone shadow-[0_24px_60px_rgba(67,57,46,0.08)]'>
						<div className='relative aspect-[4/4.6] bg-hair md:aspect-[4/3.7] xl:aspect-[4/4.4]'>
							<Image
								src={heroContent.imageUrl}
								alt={heroContent.imageAlt}
								fill
								sizes='(min-width: 1280px) 42vw, (min-width: 768px) 50vw, 100vw'
								className='object-cover'
							/>
						</div>
						<div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent p-5 md:p-6'>
							<p className='font-mono text-[12px] uppercase tracking-[0.14em] text-paper/85'>
								Mission hospital care
							</p>
							<p className='mt-2 max-w-[24ch] font-fraunces text-2xl leading-tight text-paper'>
								Visible needs, trusted funding, and updates at
								every milestone.
							</p>
						</div>
					</div>
				</div>

				<div className='mt-5 md:mt-11 grid gap-5 pt-7 md:grid-cols-3 md:gap-0'>
					{heroContent.stats.map((stat, index) => (
						<div
							key={stat.label}
							className={`flex flex-col items-center text-center border-b border-hair pb-5 last:border-b-0 md:border-b-0 md:px-8 md:pb-0 ${
								index < heroContent.stats.length - 1
									? 'md:border-r md:border-hair'
									: ''
							}`}
						>
							<strong className='mb-2 block font-fraunces text-[38px] font-medium leading-none tracking-[-0.02em]'>
								<CountUpStatValue
									value={stat.value}
									delay={index * 120}
								/>
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
