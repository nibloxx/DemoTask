import Container from '@/components/landing/Container';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import NeedDetailDonateCard from './NeedDetailDonateCard';
import NeedDetailFaq from './NeedDetailFaq';
import NeedDetailHero from './NeedDetailHero';
import NeedDetailMainContent from './NeedDetailMainContent';

export default function NeedDetailPage({ need }) {
	return (
		<main>
			<Header />
			<NeedDetailHero need={need} />

			<Container>
				<div className='grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-[72px] lg:py-[72px]'>
					<div>
						<NeedDetailMainContent need={need} />
						<NeedDetailFaq />
					</div>

					<NeedDetailDonateCard need={need} />
				</div>
			</Container>

			<Footer />
		</main>
	);
}
