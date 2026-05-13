export const navigationLinks = [
	{ label: 'About', href: '#' },
	{ label: 'Hospital Tours', href: '#' },
	{ label: 'Missionary Needs', href: '/', current: true },
	{ label: 'News', href: '#' },
];

export const heroContent = {
	eyebrow: 'Missionary Needs',
	titleStart: 'Real needs.',
	titleHighlight: 'Real hospitals.',
	titleEnd: 'You see it through.',
	description:
		'Each hospital writes the project. We vet it. You fund a specific line item. Reports come at every milestone.',
	imageUrl:
		'https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	imageAlt: 'Healthcare worker using lab equipment in a mission hospital.',
	promises: [
		'Tax-deductible 501(c)(3)',
		'100% to the project',
		'Reports at every milestone',
	],
	stats: [
		{ value: '15', label: 'Active needs' },
		{ value: '$982k', label: 'Raised so far' },
		{ value: '$1.84M', label: 'Still to raise' },
	],
};

export const needCategories = [
	{ id: 'all', label: 'All' },
	{ id: 'urgent', label: 'Urgent' },
	{ id: 'equipment', label: 'Equipment' },
	{ id: 'construction', label: 'Construction' },
	{ id: 'training', label: 'Training' },
];

export const sortOptions = [
	{ id: 'most-urgent', label: 'Most urgent' },
	{ id: 'almost-funded', label: 'Almost funded' },
	{ id: 'recently-listed', label: 'Recently listed' },
	{ id: 'largest-goal', label: 'Largest goal' },
];

export const totalActiveNeeds = 15;

export const missionaryNeeds = [
	{
		id: 'cholera-response',
		hospital: 'Vanga',
		country: 'DRC',
		title: 'Cholera response, eastern DRC',
		description:
			'Thirty days of rehydration supplies and surge staff. Forty patients a day, treated outdoors.',
		raised: 28400,
		goal: 46000,
		imageUrl:
			'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80&auto=format&fit=crop',
		categories: ['urgent'],
		urgentLabel: 'Urgent / 12d left',
		daysLeft: 12,
		listedAt: '2026-05-07',
	},
	{
		id: 'solar-maternity-ward',
		hospital: 'Loma de Luz',
		country: 'Honduras',
		title: 'Solar power for the maternity ward',
		description:
			'A battery bank that holds the wards through monthly grid outages. Three to four a month.',
		raised: 71400,
		goal: 84000,
		imageUrl:
			'https://images.unsplash.com/photo-1503444200347-fa86187a2797?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		categories: ['construction'],
		listedAt: '2026-04-19',
	},
	{
		id: 'maternity-second-floor',
		hospital: 'Galmi',
		country: 'Niger',
		title: 'A second floor for the maternity ward',
		description:
			'Eight new delivery rooms. Volume has tripled in five years.',
		raised: 186000,
		goal: 215000,
		imageUrl:
			'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=900&q=80&auto=format&fit=crop',
		categories: ['construction'],
		listedAt: '2026-03-15',
	},
	{
		id: 'cardiac-cath-lab',
		hospital: 'Tenwek',
		country: 'Kenya',
		title: 'Cardiac cath lab, expanded',
		description:
			'A hemodynamic monitoring upgrade, replacing a 2018 system at end of life.',
		raised: 48200,
		goal: 78000,
		imageUrl:
			'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80&auto=format&fit=crop',
		categories: ['equipment'],
		listedAt: '2026-04-08',
	},
	{
		id: 'ob-ultrasound',
		hospital: 'Kapsowar',
		country: 'Kenya',
		title: 'An ultrasound the OB ward can rely on',
		description:
			'Refurbished, two probes. The current unit is fourteen years old and failing.',
		raised: 13800,
		goal: 14200,
		imageUrl:
			'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=900&q=80&auto=format&fit=crop',
		categories: ['equipment'],
		listedAt: '2026-02-28',
	},
	{
		id: 'nicu-ventilator',
		hospital: 'CMC Vellore',
		country: 'India',
		title: 'NICU ventilator replacement',
		description:
			"One of three failed in February. The hospital is running on two; volume can't sustain that.",
		raised: 18400,
		goal: 34000,
		imageUrl:
			'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=900&q=80&auto=format&fit=crop',
		categories: ['urgent', 'equipment'],
		urgentLabel: 'Urgent',
		daysLeft: 18,
		listedAt: '2026-05-01',
	},
	{
		id: 'pediatric-anesthesia-training',
		hospital: 'Tenwek',
		country: 'Kenya',
		title: 'Pediatric anesthesia training, two years',
		description:
			'A Kenyan attending returns as the only pediatric anesthesiologist in the region.',
		raised: 22800,
		goal: 30000,
		imageUrl:
			'https://images.unsplash.com/photo-1580281657527-47f249e8f4df?w=900&q=80&auto=format&fit=crop',
		categories: ['training'],
		listedAt: '2026-03-29',
	},
	{
		id: 'anesthesia-machines',
		hospital: 'Bongolo',
		country: 'Gabon',
		title: 'Two refurbished anesthesia machines',
		description:
			'Replacing end-of-life Drager units in the main OR, with a one-year service contract.',
		raised: 31200,
		goal: 52000,
		imageUrl:
			'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&q=80&auto=format&fit=crop',
		categories: ['equipment'],
		listedAt: '2026-02-11',
	},
	{
		id: 'surgical-residents',
		hospital: 'Tenwek',
		country: 'Kenya',
		title: 'Three surgical residents, one year',
		description:
			'Tuition and supervision for PAACS-accredited residents in their final year.',
		raised: 11400,
		goal: 18000,
		imageUrl:
			'https://images.unsplash.com/photo-1612531385446-f7e6d131e1d0?w=900&q=80&auto=format&fit=crop',
		categories: ['training'],
		listedAt: '2026-03-02',
	},
	{
		id: 'outpatient-clinic-expansion',
		hospital: 'Hospital of Hope',
		country: 'Togo',
		title: 'Outpatient clinic expansion',
		description:
			'A 240-square-meter extension. Volume has doubled since 2020.',
		raised: 42000,
		goal: 124000,
		imageUrl:
			'https://media.istockphoto.com/id/2222386473/photo/female-doctor-smiling-and-holding-digital-tablet-in-hospital-lobby.jpg?s=1024x1024&w=is&k=20&c=V1HdeUjZRP_XjQoBb97Zyrx8CqGi1nuK1flQPhI-z-U=',
		categories: ['construction'],
		listedAt: '2026-04-24',
	},
	{
		id: 'visiting-surgeon-support',
		hospital: 'Tansen',
		country: 'Nepal',
		title: 'Visiting surgeon support, four teams',
		description:
			'A year of quarterly subspecialty teams - ortho, urology, plastics, ENT.',
		raised: 8200,
		goal: 24000,
		imageUrl:
			'https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		categories: ['training'],
		listedAt: '2026-05-05',
	},
	{
		id: 'chemistry-analyzer',
		hospital: 'PCEA Chogoria',
		country: 'Kenya',
		title: 'A working chemistry analyzer',
		description:
			'Refurbished, eighteen months of reagent. Cuts sepsis turnaround from hours to minutes.',
		raised: 9800,
		goal: 22000,
		imageUrl:
			'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=900&q=80&auto=format&fit=crop',
		categories: ['equipment'],
		listedAt: '2026-04-11',
	},
];

export const footerColumns = [
	{
		title: 'Discover',
		links: [
			{ label: 'Hospital tours', href: '#' },
			{ label: 'Missionary needs', href: '/' },
			{ label: 'News & field reports', href: '#' },
			{ label: 'About', href: '#' },
		],
	},
	{
		title: 'Take part',
		links: [
			{ label: 'Apply to serve', href: '#' },
			{ label: 'Give monthly', href: '#' },
			{ label: 'For hospitals', href: '#' },
			{ label: 'Newsletter', href: '#' },
		],
	},
	{
		title: 'Trust',
		links: [
			{ label: 'Financials', href: '#' },
			{ label: 'Privacy', href: '#' },
			{ label: 'Contact', href: '#' },
		],
	},
];