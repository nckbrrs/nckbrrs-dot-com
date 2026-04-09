import ContactForm from "./ContactForm";

export default function ContactPage() {
	return (
		<div className={scrollContainerStyling}>
			<div className={containerStyling}>
				<p className={headingStyling}>get in touch</p>
				<ContactForm />
			</div>
		</div>
	);
}

const scrollContainerStyling = `
	flex
	flex-col
	flex-1
	overflow-y-auto
	w-full
`;

const containerStyling = `
	flex
	flex-col
	gap-10
	w-full
	justify-center
	px-6 md:px-16
	py-10
	text-bone
	my-auto
`;

const headingStyling = `
	font-bold
	tracking-tighter
	text-5xl md:text-7xl
	text-bone
	md:mb-4
`;
