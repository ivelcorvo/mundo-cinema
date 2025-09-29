import React from 'react'

type Props = {
  page:number;
  nextPage:()=>void;
  prevPage:()=>void;
}

const BtnProxAnt = ({page,nextPage,prevPage}: Props) => {
  return (
    <div className="text-center space-x-3 mt-10">
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
    </div>
  )
}

export default BtnProxAnt