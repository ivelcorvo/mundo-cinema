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
        <main className="pt-30 flex-grow">
          <Routes>
            <Route path="/"          element={<Home/>}/>
            <Route path="/login"     element={(!user)?<Login/>:<Home/>}/>
            <Route path="/register"  element={(!user)?<Register/>:<Home/>}/>
            <Route path="/about"     element={<About/>}/>
            <Route path="/favorites" element={(user)?<Favorites/>:<Home/>}/>
            <Route path="*"          element={<Navigate to="/"/>}/>
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
