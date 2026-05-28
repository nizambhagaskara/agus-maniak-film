import { X } from '@boxicons/react';

export default function Modal({movie, isOpen, closeModal}) {
  return (
    <div className={`flex flex-col rounded-2xl bg-white max-w-xl drop-shadow-2xl h-fit p-8 transition-all duration-400 ease-in-out ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}>
      <div className="border-b border-b-slate-900 pb-4 w-full flex justify-between">
        <div className='flex items-end'>
          {(movie?.imageUrl != "") && <img src={movie?.imageUrl} alt="" className="inline w-20 border border-solid border-white rounded-md" />}
          <h3 className="font-semibold text-3xl px-4">{movie?.title}</h3>
        </div>
        <div>
          <button className="rounded-xl cursor-pointer" onClick={closeModal}>
            <X size='md' />
          </button>
        </div>
      </div>

      <div className="w-full pt-4">
        <p>{movie?.desc}</p>
      </div>
    </div>
  )
}