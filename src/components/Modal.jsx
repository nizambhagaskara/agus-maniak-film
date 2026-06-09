import { X } from '@boxicons/react';
import { useEffect, useRef } from 'react';
import StarImg from '../img/star.png';

export default function Modal({movie, isOpen, closeModal}) {
  const modalBoxRef = useRef(null);
  const lastMovieRef = useRef(null);

  if(movie) lastMovieRef.current = movie;

  const displayMovie = movie ?? lastMovieRef.current;

  useEffect(() => {
    // return if modal is not opened
    if(!isOpen) return;

    function handleEscKeyDown(e) {                          // handling pressed Esc key when modal opened
      if(e.key === "Escape") closeModal();
    }
    
    function handleCursorClick(e) {                         // handling clicked cursor outside opened modal
      if (modalBoxRef.current && !modalBoxRef.current.contains(e.target)) {
        closeModal();
      }
    }

    // add event listeners
    document.addEventListener('keydown', handleEscKeyDown);
    document.addEventListener('mousedown', handleCursorClick);
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';

    // remove event listeners when modal unmounts 
    return () => {
      document.removeEventListener('keydown', handleEscKeyDown);
      document.removeEventListener('mousedown', handleCursorClick);
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, closeModal]);

  return (
    <div
      className={`flex flex-col rounded-2xl bg-white w-full max-w-xl drop-shadow-2xl h-fit p-8 transition-all duration-200 ease-in-out ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}
      ref={modalBoxRef}
    >
      {/* Header */}
      <div className="border-b border-b-slate-900 pb-4 w-full relative">
        <div className='flex flex-col items-center sm:flex-row sm:items-end gap-4'>
          {displayMovie?.poster_path && (
            <img src={`https://image.tmdb.org/t/p/w500${displayMovie.poster_path}`} alt={`${displayMovie.title} poster`} className="w-30 border border-solid border-white rounded-md" />
          )}
          <div>
            <h3 className="font-semibold text-3xl mb-2">{displayMovie?.title}</h3>
            <div className="rating flex w-full justify-center sm:justify-start gap-1 items-center">
              <img src={StarImg} alt={`Rating ${displayMovie?.vote_average}`} className='w-6 h-6'/>
              <span>{displayMovie?.vote_average}</span>
          </div>
          </div>
        </div>

        <button aria-label='Close modal' className="absolute top-0 right-0 rounded-full bg-red-400 cursor-pointer p-1" onClick={closeModal}>
          <X size='md' color='white' />
        </button>
      </div>

      {/* Body */}
      <div className="w-full pt-4">
        <p>{displayMovie?.overview}</p>
      </div>
    </div>
  )
}