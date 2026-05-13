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
			<Container className='flex flex-wrap items-center gap-5 py-[18px]'>
				<div className='flex flex-wrap gap-2'>
					{needCategories.map(category => {
						const isActive = category.id === activeCategory;

						return (
							<button
								key={category.id}
								type='button'
								onClick={() => onCategoryChange(category.id)}
								className={`rounded-full px-[18px] py-[9px] text-[14.5px] transition-colors ${
									isActive
										? 'bg-ink text-paper'
										: 'text-ink-2 hover:bg-bone hover:text-ink'
								}`}
							>
								{category.label}
							</button>
						);
					})}
				</div>

				<label className='ml-auto flex items-center gap-3 text-[14.5px] text-mute'>
					<span>Sort</span>
					<select
						value={sortBy}
						onChange={event => onSortChange(event.target.value)}
						className='rounded-md border border-hair bg-bone px-3 py-2 text-[14.5px] text-ink outline-none transition-colors focus:border-ink'
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
