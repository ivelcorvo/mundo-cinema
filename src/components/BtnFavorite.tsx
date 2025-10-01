import { useFavorites } from "../hooks/useFavorites"
interface Props {
  id_movie: number
  favorites: string[]
  addIdFavorites:(id: string)=>void;
}

const BtnFavorite = ({ 
  id_movie,
  favorites,
  addIdFavorites
}: Props) => {  
  return (
    <>
      <button
        className="absolute top-5 left-5 hover:cursor-pointer"
        onClick={()=>{ addIdFavorites(String(id_movie)) }}
      >
        <i className={`fa-solid fa-heart fa-xl ${Object.keys(favorites).includes(String(id_movie))?"text-red-700":"text-gray-400"}`}></i>
      </button>
    </>
  )
}

export default BtnFavorite