import Link from 'next/link';
import { footerColumns } from '@/lib/missionary-needs';
import Container from '../landing/Container';

export default function Footer() {
	return (
		<footer className='border-t border-hair'>
			<Container className='py-12 md:py-[52px]'>
				<div className='grid gap-10 pb-12 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1fr] xl:gap-12'>
					<div>
						<Link
							href='/'
							className='mb-4 inline-block font-fraunces text-2xl font-semibold leading-none tracking-[-0.01em]'
						>
							MissionaryDoctors
						</Link>
						<p className='max-w-[24ch] font-fraunces text-xl font-light leading-[1.3]'>
							A catalog of medical mission hospitals worldwide.
						</p>
					</div>

					{footerColumns.map(column => (
						<div key={column.title}>
							<h2 className='mb-[18px] font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-mute'>
								{column.title}
							</h2>

							<div className='space-y-1'>
								{column.links.map(link => (
									<Link
										key={link.label}
										href={link.href}
										className='block py-1.5 text-[15.5px] text-ink-2 transition-colors hover:text-ink'
									>
										{link.label}
									</Link>
								))}
							</div>
						</div>
					))}
				</div>

				<div className='flex flex-col justify-center gap-2 border-t border-hair pt-7 text-[13.5px] text-mute md:flex-row md:items-center'>
					<p>© 2026 Giving Tree Projects · Shreveport, Louisiana</p>
				</div>
			</Container>
		</footer>
	);
}
