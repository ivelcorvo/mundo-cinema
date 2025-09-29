import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// #### HOOKS ####
  import { useAuth } from "./context/AuthContext";

// #### COMPONENTES ####
  import NavBar from "./components/NavBar";
  import Footer from "./components/Footer";
  import Loading from "./components/Loading";

// #### PÁGINAS ####
  import Home from "./pages/Home";
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import About from "./pages/About";
  import Favorites from "./pages/Favorites";
  import MovieDetail from "./pages/MovieDetail";

function App() {

  const {loading,user} = useAuth();

  if(loading){
    return(
      <Loading></Loading>
    );
  }

  return (
    <div className="bg-black text-gray-400 flex flex-col min-h-screen p-0 m-0">
      <BrowserRouter>
        <NavBar></NavBar>
        <main className="pt-30 flex-grow max-w-[95%] min-w-[80%] sm:max-w-[80%] sm:min-w-[80%] mx-auto ">
          <Routes>
            <Route path="/home/:currentPage?"            element={<Home/>}/>
            <Route path="/login"                         element={(!user)?<Login/>:<Home/>}/>
            <Route path="/register"                      element={(!user)?<Register/>:<Home/>}/>
            <Route path="/about"                         element={<About/>}/>
            <Route path="/favorites"                     element={(user)?<Favorites/>:<Home/>}/>
            <Route path="/movie/detail/:id/:currentPage" element={<MovieDetail/>}/>
            <Route path="*"                              element={<Navigate to="/home"/>}/>
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
