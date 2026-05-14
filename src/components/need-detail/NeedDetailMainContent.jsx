import Link from 'next/link';
import { formatCurrency, getNeedProgress } from '@/lib/missionary-needs';
import NeedDetailHospitalCard from './NeedDetailHospitalCard';

function distributeGoal(goal, items) {
	let allocated = 0;

	return items.map((item, index) => {
		if (index === items.length - 1) {
			return {
				...item,
				amount: goal - allocated,
			};
		}

		const amount = Math.round((goal * item.percent) / 100 / 100) * 100;
		allocated += amount;

		return {
			...item,
			amount,
		};
	});
}

function buildBudgetItems(need) {
	return distributeGoal(Math.round(need.goal), need.budgetTemplate ?? []);
}

function buildTimeline(need) {
	const progress = getNeedProgress(need);

	return [
		{
			date: 'Submitted / vetted / listed',
			title: 'Proposal reviewed',
			description: `${need.hospital} submitted this project with pricing, scope, and implementation notes.`,
			status: 'done',
		},
		{
			date: `Now / ${progress}% funded`,
			title: 'Funding',
			description: `${formatCurrency(need.raised)} of ${formatCurrency(need.goal)} has been raised so far for ${need.title.toLowerCase()}.`,
			status: 'current',
		},
		{
			date: 'After full funding',
			title: 'Equipment or materials ordered',
			description:
				'The first release is made when the quote is locked and purchasing is confirmed.',
			status: 'upcoming',
		},
		{
			date: 'On delivery',
			title: 'On-site confirmation',
			description:
				'The next release follows delivery confirmation, photos, and implementation updates.',
			status: 'upcoming',
		},
		{
			date: 'Project close',
			title: 'Final report',
			description:
				'A closeout update compares planned versus actual spend and summarizes outcomes.',
			status: 'upcoming',
		},
	];
}

function buildUpdates(need) {
	const progress = getNeedProgress(need);

	return [
		{
			date: 'Recent update',
			title: `${progress}% funded and moving forward`,
			body: [
				`${need.hospital} has reconfirmed the current scope and pricing for ${need.title.toLowerCase()}.`,
				'The hospital team is preparing documentation and local logistics so the project can move quickly once funding is complete.',
			],
			author: 'Project coordination team',
		},
		{
			date: 'Earlier update',
			title: 'Preparation work underway',
			body: [
				'Early preparation steps that do not require full disbursement are already being mapped and scheduled.',
			],
			photoUrl: need.imageUrl,
			author: `${need.hospital} field team`,
		},
	];
}

function buildHospital(need) {
	return {
		name: need.hospital,
		location: `${need.country} / Mission hospital partner`,
		description: `${need.hospital} serves patients in ${need.country} and identified ${need.title.toLowerCase()} as a priority need for the coming year.`,
		imageUrl: need.imageUrl,
	};
}

function SectionWrap({ eyebrow, title, children }) {
	return (
		<section className='border-t border-hair pt-[60px] first:border-t-0 first:pt-0'>
			<p className='mb-5 font-mono text-[13px] uppercase tracking-[0.16em] text-mute'>
				{eyebrow}
			</p>
			{title ? (
				<h2 className='mb-6 max-w-[22ch] font-fraunces text-[32px] font-light leading-[1.1] tracking-[-0.02em] md:text-5xl'>
					{title}
				</h2>
			) : null}
			{children}
		</section>
	);
}

function BudgetList({ items, totalAmount }) {
	return (
		<div className='mt-7'>
			{items.map((item, index) => (
				<div
					key={`${item.name}-${index}`}
					className='grid grid-cols-1 gap-4 border-b border-hair-soft py-[18px] md:grid-cols-[1fr_auto] md:items-baseline'
				>
					<div>
						<div className='font-fraunces text-[19px] text-ink'>
							{item.name}
						</div>
						{item.note ? (
							<small className='mt-1 block text-[14.5px] text-mute'>
								{item.note}
							</small>
						) : null}
					</div>
					<div className='text-right font-fraunces text-[19px] text-ink'>
						{formatCurrency(item.amount)}
					</div>
				</div>
			))}

			<div className='grid grid-cols-1 gap-4 border-t-[1.5px] border-ink py-6 md:grid-cols-[1fr_auto] md:items-baseline'>
				<div className='font-fraunces text-[21px] text-ink'>Total</div>
				<div className='text-right font-fraunces text-[26px] text-terra'>
					{formatCurrency(totalAmount)}
				</div>
			</div>
		</div>
	);
}

function Timeline({ items }) {
	return (
		<div className='relative mt-7'>
			<div className='absolute bottom-2 left-[7px] top-2 w-px bg-hair' />

			{items.map(item => (
				<div
					key={`${item.date}-${item.title}`}
					className='relative pb-7 pl-9 last:pb-0'
				>
					<div
						className={`absolute left-0 top-[7px] h-[14px] w-[14px] rounded-full border ${
							item.status === 'done'
								? 'border-moss bg-moss'
								: item.status === 'current'
									? 'border-terra bg-terra shadow-[0_0_0_4px_rgba(177,74,44,0.18)]'
									: 'border-hair bg-paper'
						}`}
					/>
					<div className='mb-1.5 font-mono text-[13px] uppercase tracking-[0.1em] text-mute'>
						{item.date}
					</div>
					<div className='mb-1.5 font-fraunces text-xl text-ink'>
						{item.title}
					</div>
					<p className='max-w-[50ch] text-base leading-[1.6] text-ink-2'>
						{item.description}
					</p>
				</div>
			))}
		</div>
	);
}

function Updates({ items }) {
	return (
		<div className='mt-7'>
			{items.map((update, index) => (
				<article
					key={`${update.date}-${update.title}`}
					className={`py-7 ${index < items.length - 1 ? 'border-b border-hair-soft' : ''}`}
				>
					<div className='mb-3 font-mono text-[13px] uppercase tracking-[0.1em] text-mute'>
						{update.date}
					</div>
					<h3 className='mb-3.5 font-fraunces text-[23px] leading-[1.25] text-ink'>
						{update.title}
					</h3>
					{update.body.map(paragraph => (
						<p
							key={paragraph}
							className='mb-3.5 max-w-[60ch] text-[17px] leading-[1.6] text-ink-2'
						>
							{paragraph}
						</p>
					))}
					{update.photoUrl ? (
						<div
							className='my-4 aspect-[16/9] rounded-[10px] bg-hair bg-cover bg-center'
							role='img'
							aria-label={update.title}
							style={{
								backgroundImage: `url('${update.photoUrl}')`,
							}}
						/>
					) : null}
					<div className='mt-4 text-[14.5px] text-mute'>
						-{' '}
						<strong className='font-medium text-ink'>
							{update.author}
						</strong>
					</div>
				</article>
			))}

			<Link
				href='#'
				className='mt-6 inline-block font-mono text-[13px] uppercase tracking-[0.15em] text-terra transition-colors hover:text-terra-deep'
			>
				All updates -&gt;
			</Link>
		</div>
	);
}

export default function NeedDetailMainContent({ need }) {
	const budgetItems = buildBudgetItems(need);
	const timeline = buildTimeline(need);
	const updates = buildUpdates(need);
	const hospital = buildHospital(need);

	return (
		<div className='space-y-[40px]'>
			<SectionWrap eyebrow='Why this'>
				<p className='mb-7 max-w-[48ch] font-fraunces text-2xl font-medium leading-[1.4] text-ink'>
					{need.hospital} identified {need.title.toLowerCase()} as one
					of its most immediate needs.
				</p>
				<p className='mb-[18px] max-w-[62ch] text-lg leading-[1.7] text-ink-2'>
					{need.hospital} serves patients across {need.country}, and
					this project will directly support care delivery where
					reliability, capacity, or access is currently constrained.
				</p>
				<p className='mb-[18px] max-w-[62ch] text-lg leading-[1.7] text-ink-2'>
					This need is listed with a clear project scope,
					milestone-based funding, and public updates so donors can
					follow the work from purchase through implementation.
				</p>
			</SectionWrap>

			<SectionWrap eyebrow='Where the money goes' title='Every line.'>
				<p className='max-w-[62ch] text-lg leading-[1.7] text-ink-2'>
					This estimate is broken into line items so donors can see
					how the full project cost is allocated.
				</p>
				<BudgetList items={budgetItems} totalAmount={need.goal} />
			</SectionWrap>

			<SectionWrap
				eyebrow='How it ships'
				title='Funds release on milestones.'
			>
				<p className='max-w-[62ch] text-lg leading-[1.7] text-ink-2'>
					Each milestone has a deliverable that triggers the next
					disbursement.
				</p>
				<Timeline items={timeline} />
			</SectionWrap>

			<SectionWrap
				eyebrow='Updates from the field'
				title='What the hospital is telling us.'
			>
				<Updates items={updates} />
			</SectionWrap>

			<SectionWrap eyebrow='The hospital' title={`${hospital.name}.`}>
				<NeedDetailHospitalCard hospital={hospital} />
			</SectionWrap>
		</div>
	);
}
