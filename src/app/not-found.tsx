export default function NotFound() {
	return (
		<div className={containerStyling}>
			<p className={headingStyling}>404</p>
			<p className={subStyling}>page not found</p>
		</div>
	);
}

const containerStyling = `
	flex
	flex-col
	flex-1
	items-e
	justify-center
	px-6 md:px-16
	text-bone
`;

const headingStyling = `
	-translate-x-2
	leading-[7rem] lg:leading-[10rem]
	text-[8rem] lg:text-[12rem]
	[text-shadow:0_2px_16px_rgba(0,0,0,0.18)]
`;

const subStyling = `
	mt-2
	font-medium
	tracking-tight
	text-3xl lg:text-4xl
	[text-shadow:0_2px_12px_rgba(0,0,0,0.18)]
`;
