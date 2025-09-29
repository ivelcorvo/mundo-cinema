
const About = () => {
  return (
    <article>
      <section className="mb-10">
        <header>
          <h1 className="text-3xl font-bold mb-5">Bem vindo ao Mundo Cinema</h1>
        </header>
        <p>O Mundo Cinema é um projeto demonstrativo desenvolvido em React + TypeScript, que consome a API do TMDB utilizando Axios para trazer informações sobre filmes, incluindo títulos, sinopses, datas de lançamento e avaliações.</p>
      </section>
      <section className="mb-10">
        <header>
          <h2 className="text-xl">Ele conta com recursos como:</h2>
        </header>
        <ul className="list-disc list-inside p-3">
          <li>Listagem de filmes populares com paginação;</li>
          <li>Detalhes individuais de cada filme;</li>
          <li>Interface responsiva utilizando Tailwind CSS;</li>
          <li>Autenticação de usuários via Firebase para salvar favoritos (planejado para evolução futura).</li>
        </ul>
        <p>O objetivo do projeto é demonstrar habilidades em React + TypeScript, consumo de APIs externas, gerenciamento de estado e boas práticas de frontend, sendo uma referência para portfólio e aprendizado contínuo.</p>
      </section>

    </article>
  )
}

export default About