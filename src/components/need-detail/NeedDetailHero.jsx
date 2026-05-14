import Link from 'next/link';
import Container from '@/components/landing/Container';

function getPrimaryCategoryLabel(category) {
	const primaryCategory = category ?? 'need';
	return primaryCategory.charAt(0).toUpperCase() + primaryCategory.slice(1);
}

export default function NeedDetailHero({ need }) {
	const meta = `A missionary need / ${getPrimaryCategoryLabel(need.category)} / ${need.hospital} / ${need.country}`;
	const imageAlt = `${need.title} / ${need.hospital} / ${need.country}`;

	return (
		<>
			<div className='pt-6'>
				<Container>
					<Link
						href='/'
						className='inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-mute transition-colors hover:text-ink'
					>
						<span aria-hidden='true'>{'<-'}</span>
						All missionary needs
					</Link>
				</Container>
			</div>

			<section className='py-8 md:py-10'>
				<Container>
					<p className='mb-6 font-mono text-[13px] uppercase tracking-[0.16em] text-mute'>
						{meta}
					</p>

					<h1 className='max-w-[54ch] font-fraunces text-5xl font-medium leading-none tracking-[-0.03em]'>
						{need.title}
					</h1>

					<p className='mt-7 max-w-[54ch] text-[21px] font-normal; leading-[1.5] text-ink-2'>
						{need.description}
					</p>
				</Container>
			</section>

			<Container>
				<div
					className='aspect-[21/9] rounded-[18px] bg-hair bg-cover bg-center'
					role='img'
					aria-label={imageAlt}
					style={{ backgroundImage: `url('${need.imageUrl}')` }}
				/>
			</Container>
		</>
	);
}
