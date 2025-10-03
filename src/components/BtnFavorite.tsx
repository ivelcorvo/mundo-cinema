import { useFavorites } from "../hooks/useFavorites";

interface Props {
  id_movie: number
}

const BtnFavorite = ({ 
  id_movie
}: Props) => {  

  const {favorites,addIdFavorites,removeFavorite} = useFavorites();
  
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
        className="bg-black/30 p-1 rounded-full shadow-md hover:cursor-pointer items center"
        onClick={toggleFavorite}
      >
        <i className={`fa-solid fa-heart fa-xl ${favorites.includes(String(id_movie))?"text-red-700":"text-white"}`}></i>
      </button>
    </>
  )
}

export default BtnFavorite