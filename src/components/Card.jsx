export default function Card({movie, onClick}) {
  const {title, poster_path, genres, formatted_release_date} = movie;

  return (
    <button className="appearance-none bg-transparent p-0 text-left drop-shadow-xl w-full cursor-pointer transform-gpu will-change-transform hover:-translate-y-2 hover:z-40 transition duration-300 ease-in-out max-w-3xs justify-self-center mb-4 min-[420px]:mb-0 aspect-2/3" role="button" aria-label={`Show ${title} details`} onClick={onClick}>
      <div className="poster mb-3 w-full relative">
        {poster_path
          ? <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} className='w-full h-full object-cover rounded-2xl' alt={`${title} poster`} />
          : <div>No poster available</div>
        }
      
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 via-35% to-transparent to-50% rounded-2xl">
          <div className="absolute bottom-0 p-4 text-white">
            <h2 className='font-semibold text-[1.35rem] mb-1 leading-7'>{title}</h2>
            <span className="font-normal text-[0.9rem]">{`${formatted_release_date} - ${genres}`}</span>
          </div>
        </div>
      </div>
    </button>
  )
}