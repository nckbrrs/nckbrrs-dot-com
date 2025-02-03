import NounBubble from "../components/NounBubble";

export default function Home() {
	const nounsForBubble: { text: string; width: number }[] = [
		{ text: "human", width: 10 },
		{ text: "programmer", width: 16 },
		{ text: "creative", width: 12 },
		{ text: "musician", width: 13 },
		{ text: "photographer", width: 16 },
		{ text: "vocalist", width: 10 },
		{ text: "coffee snob", width: 16 },
		{ text: "gamer", width: 9 },
		{ text: "husband", width: 13 },
		{ text: "enneagram 9", width: 16 },
		{ text: "lego builder", width: 15 },
		{ text: "human", width: 10 }
	];

	return (
		<div className={containerStyling()}>
			<div className={nameRowStyling()}>
				<p className={nameTextStyling()}>
					nick <span className="tracking-tight">barrs</span>
				</p>
			</div>
			<div className={descriptionContainerStyling()}>
				<div className={isANounContainerStyling()}>
					<p className={isATextStyling()}>is a</p>
					<div className={nounBubbleContainerStyling()}>
						<NounBubble nouns={nounsForBubble} />
					</div>
				</div>
				<p className={livingWorkingTextStyling()}>
					living and working in New York City.
				</p>
			</div>
		</div>
	);
}

const containerStyling = () => `
  flex
  flex-col
  items-start
  justify-center
  h-full
  w-full md:max-w-[2000px]
  text-black
  dark:text-bone 
  px-5 md:px-16
`;

const nameRowStyling = () => `
  flex
  flex-row
  pb-3 lg:pb-4
`;

const nameTextStyling = () => `
  -translate-x-2
  font-bold
  tracking-tighter
  leading-[7rem] lg:leading-[10rem]
  text-[8rem] lg:text-[12rem]
  w-1/2 md:w-full
  duration-100
`;

const descriptionContainerStyling = () => `
  flex
  flex-col
  items-start lg:items-center
  tracking-tight
  lg:flex-row
  text-3xl lg:text-4xl
  max-w-xs lg:max-w-full
  duration-100
`;
const isANounContainerStyling = () => `
  flex
  flex-row
  w-fit
  items-center
`;
const isATextStyling = () => `
  font-medium
  whitespace-nowrap
`;

const nounBubbleContainerStyling = () => `
  scale-100 mx-3
`;

const livingWorkingTextStyling = () => `
  font-medium
  leading-[3rem] lg:leading-[4rem]
  lg:whitespace-nowrap
`;
