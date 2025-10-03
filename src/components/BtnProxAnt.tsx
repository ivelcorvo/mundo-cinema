import React from 'react'

type Props = {
  page:number;
  movies_length:number;
  nextPage:()=>void;
  prevPage:()=>void;
  iniPage:()=>void;
}

const BtnProxAnt = ({
  page,
  movies_length,
  iniPage,
  nextPage,
  prevPage
}: Props) => {

  // console.log(movies_length);
  const classBtn:string = "bg-gray-800 hover:bg-gray-700 text-white px-2 py-1 rounded-md shadow-md hover:cursor-pointer"

  return (
    <nav className="text-center space-x-3 mt-20 mb-10">
      {(page>1) &&
        <button
          type="button"
          className={classBtn}
          onClick={()=>{iniPage()}}
        >
          Início
        </button>
      }
      {(page>1) &&
        <button
          type="button"
          className={classBtn}
          onClick={()=>{prevPage()}}
        >
          Anteriores
        </button>
      }        
      {/* Tenho que garantir essa lógica. A api continua consultando memo que não tenha mais resultados */}
      {(movies_length>0&&page>=1) &&
        <button
        type="button"
        className={classBtn}
        onClick={()=>{nextPage()}}
        >
          Próximos
        </button>
      }

    </nav>
  )
}

export default BtnProxAnt