export default function Card({imageUrl, title, year, genre, onClick}) {
  return (
    <div className="card bg-white rounded-2xl drop-shadow-xl flex flex-col w-full justify-self-center cursor-pointer hover:scale-105 hover:z-40 transition duration-300 ease-in-out" onClick={onClick}>
      <div className="poster mb-3 w-full flex justify-center">
        <img src={imageUrl} className='w-full h-full rounded-t-2xl' />
      </div>

      <div className="w-full h-full px-4 pb-4">
        <h2 className='font-semibold text-[1.35rem] mb-4 leading-snug'>{title}</h2>
        <span className="font-normal text-[0.9rem]">{`${year} - ${genre}`}</span>
      </div>
    </div>
  )
}