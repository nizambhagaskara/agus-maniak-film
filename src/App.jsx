import { useEffect, useState } from 'react'
import './App.css'

import Card from './components/Card';
import Modal from './components/Modal';

const listOfMovies = [
	{
		id: 1,
		title: 'Interstellar',
		year: 2014,
		genre: 'Sci-fi/Adventure',
		imageUrl: 'https://upload.wikimedia.org/wikipedia/id/b/bc/Interstellar_film_poster.jpg',
		desc: "In a dystopian future where Earth is devastated by catastrophic crop blight and dust storms, humanity faces extinction. To save our species, a team of astronauts—led by former NASA pilot Cooper—journeys through a mysterious wormhole in search of a new, habitable planet."
	},

	{
		id: 2,
		title: 'Inception',
		year: 2010,
		genre: 'Sci-fi/Action',
		imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg',
		desc: `Dom Cobb, a specialized thief who extracts secrets from people's dreams. To clear his criminal record and reunite with his children, he is hired to perform "inception"—the impossible task of planting an idea into a corporate rival's mind by navigating a multi-layered, unstable dreamscape.`
	},

	{
		id: 3,
		title: 'Insidious',
		year: 2010,
		genre: 'Horror/Mystery',
		imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTYyOTAxMDA0OF5BMl5BanBnXkFtZTcwNzgwNTc1NA@@._V1_.jpg',
		desc: 'Insidious is a supernatural horror film about a couple whose eldest son inexplicably falls into a coma and becomes a vessel for trapped spirits. To save him, his parents must venture into "The Further," a dark astral purgatory, and battle malevolent, parasitic entities.'
	},

	{
		id: 4,
		title: 'Zathura: A Space Adventure',
		year: 2005,
		genre: 'Family/Adventure',
		imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/ZathuraPoster.jpg/250px-ZathuraPoster.jpg',
		desc: "Zathura: A Space Adventure follows two squabbling brothers, Walter and Danny, who discover a mysterious space-themed board game in their basement. As they play, the game magically teleports their house into deep space. To return home safely, they must survive alien attacks, meteor showers, and a broken robot by working together to finish the game."
	},

	{
		id: 5,
		title: 'Jumanji: Welcome to the Jungle',
		year: 2017,
		genre: 'Adventure/Action',
		imageUrl: 'https://static.wikia.nocookie.net/jumanji/images/1/1b/Jumanji_2017_Poster.jpg',
		desc: "Jumanji: Welcome to the Jungle follows four high school students serving detention who discover an old, magical video game. Upon starting it, they are sucked into the dangerous jungle setting of the game. They transform into adult avatars with unique strengths and weaknesses, and must complete a treacherous quest to escape back to the real world."
	},

	{
		id: 6,
		title: 'Train to Busan',
		year: 2016,
		genre: 'Action/Horror',
		imageUrl: 'https://m.media-amazon.com/images/M/MV5BZTMyMjJhMDYtZTQzMC00MjcxLTkyYjQtN2RlZThlYmM3NjczXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
		desc: "Train to Busan is a 2016 South Korean zombie apocalypse thriller. It follows a workaholic fund manager, Seok-woo, and his young daughter, Su-an, as they board a bullet train from Seoul to Busan. Their routine trip turns into a desperate fight for survival when an infected passenger boards just as a nationwide viral outbreak begins."
	},

	{
		id: 7,
		title: 'A Minecraft Movie',
		year: 2025,
		genre: 'Adventure/Fantasy',
		imageUrl: 'https://upload.wikimedia.org/wikipedia/id/f/f5/Poster_A_Minecraft_Movie.jpeg',
		desc: "A Minecraft Movie follows four real-world misfits—a former 1980s gaming champ, a bullied teen, his protective older sister, and a no-nonsense real estate agent—who are magically sucked through a portal into the cubic Overworld. To get back home, they must team up with an expert crafter named Steve to defeat the evil Piglin Queen Malgosha."
	},

	{
		id: 8,
		title: 'Sonic the Hedgehog',
		year: 2020,
		genre: 'Family/Comedy',
		imageUrl: 'https://m.media-amazon.com/images/M/MV5BYTg2Yjc5MzItNzVmMi00MTllLWI2MDQtOTYyOWNjYWIxNzEzXkEyXkFqcGc@._V1_.jpg',
		desc: "Sonic the Hedgehog (2020) follows an extraterrestrial blue speedster who accidentally triggers a massive power outage on Earth. Targeted by the eccentric Dr. Robotnik, Sonic teams up with a small-town Montana sheriff, Tom Wachowski, to outrun the government and thwart Robotnik's plans for world domination."
	},

	{
		id: 9,
		title: "Five Nights at Freddy's",
		year: 2023,
		genre: 'Horror/Mystery',
		imageUrl: 'https://static.wikia.nocookie.net/fnaf-the-novel/images/8/82/Fnaf_Movie_Poster.png',
		desc: "The 2023 Five Nights at Freddy's film follows a troubled young man, Mike Schmidt (Josh Hutcherson), who takes a night security job at an abandoned, 1980s family restaurant called Freddy Fazbear's Pizzeria. Desperate to keep custody of his 10-year-old sister, Abby, Mike soon discovers that the pizzeria's animatronic mascots are possessed by the vengeful ghosts of murdered children."
	},

	{
		id: 10,
		title: 'Exit 8',
		year: 2025,
		genre: 'Horror',
		imageUrl: 'https://m.media-amazon.com/images/M/MV5BM2RjMTZkZjktYjY5MC00Njk4LTlmZjgtZDRjMTBiMTY2MzdhXkEyXkFqcGc@._V1_.jpg',
		desc: 'The Japanese psychological thriller Exit 8 (based on the viral indie video game) follows "The Lost Man," an unnamed commuter who gets trapped in an endless, looping subway corridor. To escape, he must follow specific rules: move forward if the corridor is normal, and turn back if he spots any unnatural anomalies.'
	}
]

export default function App() {
	const [searchMovie, setSearchMovie] = useState('');

	const filteredMovies = listOfMovies.filter(movie => movie.title.toLowerCase().includes(searchMovie.toLowerCase()));

	const handleSearchChange = (e) => {
		setSearchMovie(e.target.value);
		console.log(filteredMovies);
	}

	const [isModalOpen, setIsModalOpen] = useState(false);

	function closeModal() {
		setIsModalOpen(false);
	}

	const [selectedMovie, setSelectedMovie] = useState(null);

	function handleMovieClick(movie) {
		setSelectedMovie(movie);
		setIsModalOpen(true);
	}

  return (
    <>
			<div className={`modal-wrapper fixed inset-0 flex justify-center items-center z-50 p-6 ${isModalOpen ? "bg-black/40" : "invisible bg-transparent"} transition-all duration-400 ease-in-out`}>
				<Modal movie={selectedMovie} closeModal={closeModal} isOpen={isModalOpen} />
			</div>

			<div className='flex flex-col'>
				<nav className='flex w-full bg-cyan-950 p-4 justify-center items-center'>
					<span className='font-normal text-white text-lg'>Agus Maniak Film</span>
				</nav>

				<main className='px-6'>
					<div className="search lg:px-6 pt-20 pb-16 w-full">
						<span className='block text-4xl font-normal text-slate-800 mb-4'>Cari</span>
						<input value={searchMovie} onChange={handleSearchChange} type="search" name="search" id="search" placeholder='Cari film...' className='border-2 border-slate-800 border-solid rounded-2xl px-3 py-2 w-full' />
					</div>

					<div className={`results ${(filteredMovies.length > 0) ? "grid grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-5" : "w-full flex justify-center items-center"} py-8`}>
						{
							(filteredMovies.length > 0) ? (
								filteredMovies.map((movie) => (
									<Card key={movie.id} title={movie.title} year={movie.year} genre={movie.genre} imageUrl={movie.imageUrl} onClick={() => handleMovieClick(movie)} />
							))
							) : (
								<span className='text-center'>No movies with the criteria you're looking for.</span>
							)
						}
					</div>
				</main>
			</div>
  	</>
  )
}