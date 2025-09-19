import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


// #### HOOKS ####

// #### COMPONENTES ####
  import NavBar from "./components/NavBar";
  import Footer from "./components/Footer";

// #### PÁGINAS ####
  import Home from "./pages/Home";
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import About from "./pages/About";
  import Favorites from "./pages/Favorites";

function App() {
  return (
    <div className="bg-black text-gray-300 flex flex-col min-h-screen p-0 m-0">
      <BrowserRouter>
        <NavBar></NavBar>
        <main className="pt-30 flex-grow">
          <Routes>
            <Route path="/"          element={<Home/>}/>
            <Route path="/login"     element={<Login/>}/>
            <Route path="/register"  element={<Register/>}/>
            <Route path="/about"     element={<About/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="*"          element={<Navigate to="/"/>}/>
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
