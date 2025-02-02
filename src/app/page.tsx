export default async function Home() {
	return (
		<main className={homePageContainerStyling}>
			<p>WIP</p>
		</main>
	);
}

const homePageContainerStyling = `
  pageContainer
  flex
  flex-col
  grow
  scroll-smooth
  animate-fadeIn
  items-center
  justify-center
`;
