import { useEffect, useRef, useState } from 'react'
import './App.css'

import Card from './components/Card';
import Modal from './components/Modal';

import { MessageExclamation } from '@boxicons/react';

// constants
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const fetchOptions = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${API_KEY}`
	}
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SEARCH_DEBOUNCE_DELAY = 300;
const SEARCH_MIN_LENGTH = 3;

// helpers
function getDateSuffix(date) {
	if (date >= 11 && date <= 13) return "th";

	switch(date % 10) {
		case 1:		return "st";
		case 2: 	return "nd";
		case 3: 	return "rd";
		default: 	return "th";
	}
}

function formatReleaseDate(dateString) {
	if(!dateString) return "Unknown";
	const date 	= new Date(dateString);
	const day 	= date.getDate();
	const month = MONTH_NAMES[date.getMonth()];
	const year 	= date.getFullYear();

	return `${month} ${day}${getDateSuffix(day)}, ${year}`;
}

function formatMovie(movie, genreMap) {
  return {
    ...movie,
    genres: movie.genre_ids
      .map(id => genreMap[id])
      .join(", "),
    formatted_release_date: formatReleaseDate(movie.release_date),
  };
}

// API
async function fetchGenres() {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    fetchOptions
  );
  if (!res.ok) throw new Error("Failed fetching genres");
  const data = await res.json();
  return data.genres;
}

async function fetchPopularMovies() {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US",
    fetchOptions
  );
  if (!res.ok) throw new Error("Failed fetching movies");
  const data = await res.json();
  return data.results;
}

async function fetchSearchResults(query) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
    fetchOptions
  );
  if (!res.ok) throw new Error("Failed fetching search results");
  const data = await res.json();
  return data.results;
}

export default function App() {
	const [movies, 				setMovies] 				= useState([]);
	const [search, 				setSearch] 				= useState('');
	const [isModalOpen, 	setIsModalOpen] 	= useState(false);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [loading, 			setLoading] 			= useState(false);
	const [error, 				setError]					= useState(null);

	// refs
	const genresRef = useRef([]);
	const popularMoviesRef = useRef([]);

	// initial load
	useEffect(() => {
		async function loadInitialData() {
			try {
				setError(null);
				setLoading(true);

				const [genreList, movieList] = await Promise.all([
					fetchGenres(),
					fetchPopularMovies()
				]);

				const genreMap = Object.fromEntries(genreList.map(g => [g.id, g.name]));

				const formatted = movieList.map(movie => formatMovie(movie, genreMap))

				genresRef.current = genreList;

				popularMoviesRef.current = formatted;
				
				setMovies(formatted);
			} catch(err) {
				setError("Failed to load movies");
			} finally {
				setLoading(false);
			}
		}
		loadInitialData();
	}, []);

	// debounced search
	useEffect(() => {
		const trimmedSearch = search.trim();

		if (trimmedSearch.length < SEARCH_MIN_LENGTH) {
			if(trimmedSearch.length === 0) setMovies(popularMoviesRef.current);
			return;
		};

		const timer = setTimeout(async () => {
			setLoading(true);
			try {
				setError(null)
				const results = await fetchSearchResults(trimmedSearch);
				const genreMap = Object.fromEntries(genresRef.current.map(g => [g.id, g.name]))
				setMovies(results.map(m => formatMovie(m, genreMap)));
			} catch (err) {
				setError("Failed to load searched movies");
			} finally {
				setLoading(false);
			}
		}, SEARCH_DEBOUNCE_DELAY);

		return () => clearTimeout(timer);
	}, [search]);

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	}

	function closeModal() {
		setIsModalOpen(false);
	}

	function handleMovieClick(movie) {
		setSelectedMovie(movie);
		setIsModalOpen(true);
	}

  return (
    <>
			<div className={`modal-wrapper fixed inset-0 flex justify-center items-center z-50 p-6 ${isModalOpen ? "bg-black/30" : "invisible bg-transparent"} transition-all duration-300 ease-in-out`}>
				<Modal movie={selectedMovie} closeModal={closeModal} isOpen={isModalOpen} />
			</div>

			<div className='flex flex-col'>
				<nav className='flex w-full bg-cyan-950 p-4 justify-center items-center'>
					<span className='font-normal text-white text-lg'>Agus Maniak Film</span>
				</nav>

				<main className='px-6 lg:px-12'>
					<div className="search pt-20 pb-12 w-full">
						<span className='block text-4xl font-normal text-slate-800 mb-4'>Cari</span>
						<input value={search} onChange={handleSearchChange} type="search" name="search" id="search" placeholder='Cari film...' className='border-2 border-slate-800 border-solid rounded-2xl px-3 py-2 w-full' aria-label='Search movies' />
					</div>

					<div className={`results ${(movies.length > 0) ? "grid grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-5" : "w-full flex justify-center items-center"} py-4`}>
						{
							loading ? (
								<p className='text-center'>Loading...</p>
							) : movies.length > 0 ? (
								movies.map(movie => (
									<Card key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
								))
							) : (
									<div className='w-full flex flex-col items-center gap-4'>
									<MessageExclamation size='xl' fill='#45556c' />
									<span className='text-slate-800'>Film yang lu cari ga ketemu njir, cari film lain</span>
								</div>
							)
						}
					</div>

					{error && (
						<footer className='w-full px-4 py-2 bg-red-200 text-red-500 text-center'>{error}</footer>
					)}
				</main>
			</div>
  	</>
  )
}