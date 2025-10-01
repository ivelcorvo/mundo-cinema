
interface Props {
  id_movie: number
  favorites: string[]
  addIdFavorites:(id:string)=>void;
  removeFavorite:(id:string)=>void;
}

const BtnFavorite = ({ 
  id_movie,
  favorites,
  addIdFavorites,
  removeFavorite
}: Props) => {  

  const toggleFavorite = ()=>{
    if(favorites.includes(String(id_movie))){
      removeFavorite(String(id_movie));
    }else{
      addIdFavorites(String(id_movie));
    }    
  }

  return (
    <>
      <button
        className="absolute top-5 left-5 hover:cursor-pointer"
        onClick={toggleFavorite}
      >
        <i className={`fa-solid fa-heart fa-xl ${favorites.includes(String(id_movie))?"text-red-700":"text-gray-400"}`}></i>
      </button>
    </>
  )
}

export default BtnFavorite