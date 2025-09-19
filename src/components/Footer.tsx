const Footer = () => {
  return (
    <footer className={` bg-gray-950 py-0.5 px-3 flex flex-col md:flex-row justify-between items-center`}>
        <p>&copy; 2025 Levi Alves Junior - Todos os direitos reservados</p>
        <div className="mx-auto md:mx-0 mt-5 md:mt-0 flex" >
          <a href="https://www.linkedin.com/in/levi-alves-junior-09b91a189/" target="_blank" rel="noreferrer" className="m-2 block hover:scale-150">
            <i className="fa-brands fa-linkedin fa-2x"></i>
          </a>
          <a href="https://github.com/ivelcorvo" target="_blank" rel="noreferrer" className="m-2 block hover:scale-150">
            <i className="fa-brands fa-square-github fa-2x"></i>
          </a>
        </div>
    </footer>    
  )
}

export default Footer