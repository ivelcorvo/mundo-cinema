import React from 'react'

type Props = {
  page:number;
  nextPage:()=>void;
  prevPage:()=>void;
  iniPage:()=>void;
}

const BtnProxAnt = ({page,iniPage,nextPage,prevPage}: Props) => {
  return (
    <nav className="text-center space-x-3 mt-20 mb-10">
      {(page>1) &&
        <button
          type="button"
          className="bg-blue-900 hover:bg-blue-950 px-2 py-1 rounded-md shadow-md hover:cursor-pointer"
          onClick={()=>{iniPage()}}
        >
          Início
        </button>
      }
      {(page>1) &&
        <button
          type="button"
          className="bg-blue-900 hover:bg-blue-950 px-2 py-1 rounded-md shadow-md hover:cursor-pointer"
          onClick={()=>{prevPage()}}
        >
          Anteriores
        </button>
      }
      <button
        type="button"
        className="bg-blue-900 hover:bg-blue-950 px-2 py-1 rounded-md shadow-md hover:cursor-pointer"
        onClick={()=>{nextPage()}}
      >
        Próximos
      </button>
    </nav>
  )
}

export default BtnProxAnt