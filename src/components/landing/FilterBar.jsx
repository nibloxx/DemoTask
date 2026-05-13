'use client';

import { needCategories, sortOptions } from '@/lib/missionary-needs';
import Container from './Container';

export default function FilterBar({
	activeCategory,
	onCategoryChange,
	sortBy,
	onSortChange,
}) {
	return (
		<div className='border-b border-hair bg-paper/95 backdrop-blur'>
			<Container className='py-4 md:flex md:flex-wrap md:items-center md:gap-5 md:py-[18px]'>
				<div className='relative -mx-4 px-4 md:mx-0 md:flex-1 md:px-0'>
					<div className='overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
						<div className='flex min-w-max gap-2 rounded-full border border-hair bg-bone/70 p-1 md:min-w-0 md:flex-wrap md:rounded-none md:border-0 md:bg-transparent md:p-0'>
							{needCategories.map(category => {
								const isActive = category.id === activeCategory;

								return (
									<button
										key={category.id}
										type='button'
										onClick={() => onCategoryChange(category.id)}
										className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[14px] transition-all duration-300 md:px-[18px] md:py-[9px] md:text-[14.5px] ${
											isActive
												? 'border-ink bg-ink text-paper shadow-[0_8px_20px_rgba(31,27,20,0.12)]'
												: 'border-transparent bg-transparent text-ink-2 hover:border-hair hover:bg-paper hover:text-ink'
										}`}
									>
										{category.label}
									</button>
								);
							})}
						</div>
					</div>

					<div className='pointer-events-none absolute inset-y-0 left-4 w-6 bg-gradient-to-r from-paper to-transparent md:hidden' />
					<div className='pointer-events-none absolute inset-y-0 right-4 w-6 bg-gradient-to-l from-paper to-transparent md:hidden' />
				</div>

				<label className='mt-4 flex items-center gap-3 rounded-2xl border border-hair bg-bone/70 p-3 text-[14px] text-mute md:mt-0 md:ml-auto md:w-auto md:border-0 md:bg-transparent md:p-0 md:text-[14.5px]'>
					<span className='font-mono uppercase tracking-[0.12em] md:font-sans md:normal-case md:tracking-normal'>
						Sort
					</span>
					<select
						value={sortBy}
						onChange={event => onSortChange(event.target.value)}
						className='min-w-0 flex-1 rounded-xl border border-hair bg-paper px-3 py-2 text-[14px] text-ink outline-none transition-colors focus:border-ink md:w-auto md:flex-none md:rounded-md md:bg-bone md:text-[14.5px]'
					>
						{sortOptions.map(option => (
							<option key={option.id} value={option.id}>
								{option.label}
							</option>
						))}
					</select>
				</label>
			</Container>
		</div>
	);
}
