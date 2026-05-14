'use client';

import { useState } from 'react';
import { needDetailFaqItems } from '@/lib/missionary-needs';

const DEFAULT_OPEN_INDEX = needDetailFaqItems.findIndex(item => item.open);

export default function NeedDetailFaq() {
	const [openItem, setOpenItem] = useState(
		DEFAULT_OPEN_INDEX >= 0 ? DEFAULT_OPEN_INDEX : 0,
	);

	function toggleItem(index) {
		setOpenItem(currentItem => (currentItem === index ? -1 : index));
	}

	return (
		<section className='border-t border-hair pt-[30px]'>
			<p className='mb-5 font-mono text-[13px] uppercase tracking-[0.16em] text-mute'>
				Common questions
			</p>
			<h2 className='mb-6 max-w-[22ch] font-fraunces text-[32px] font-light leading-[1.1] tracking-[-0.02em] md:text-5xl'>
				Things worth asking.
			</h2>

			<div className='mt-7'>
				{needDetailFaqItems.map((item, index) => {
					const isOpen = openItem === index;
					const answerId = `faq-answer-${index}`;
					const questionId = `faq-question-${index}`;

					return (
						<div
							key={item.question}
							className={`border-t border-hair-soft ${index === needDetailFaqItems.length - 1 ? 'border-b' : ''}`}
						>
							<button
								type='button'
								onClick={() => toggleItem(index)}
								aria-expanded={isOpen}
								aria-controls={answerId}
								id={questionId}
								className='flex w-full items-center justify-between gap-6 py-6 text-left font-fraunces text-[21px] text-ink'
							>
								<span>{item.question}</span>
								<span className='relative h-[18px] w-[18px] shrink-0'>
									<span className='absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-ink' />
									<span
										className={`absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-ink transition-transform duration-300 ${
											isOpen ? 'scale-y-0' : 'scale-y-100'
										}`}
									/>
								</span>
							</button>

							<div
								id={answerId}
								role='region'
								aria-labelledby={questionId}
								className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
									isOpen
										? 'grid-rows-[1fr]'
										: 'grid-rows-[0fr]'
								}`}
							>
								<div className='overflow-hidden'>
									<p
										className={`pb-[22px] text-[17px] leading-[1.65] text-ink-2 transition-opacity duration-300 ease-out ${
											isOpen ? 'opacity-100' : 'opacity-0'
										}`}
									>
										{item.answer}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
