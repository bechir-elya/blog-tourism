import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import ArticleDetails from './Pages/ArticleDetails';
import AdministrationPage from './Pages/AdministrationPage';
import GestionArticles from './Pages/GestionArticles';
import GestionCategories from './Pages/GestionCategories';
import Register from './Pages/Register'
import Login from './Pages/Login';
import ModifierArticle from './Pages/ModifierArticle';
import Footer from './Components/Footer';
import { Route, Routes } from 'react-router-dom';


function App() {


  return (
    <>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='articledetails/:id' element={<ArticleDetails />} />
          <Route path='administrationPage' element={<AdministrationPage />} />
          <Route path='gestionarticles' element={<GestionArticles />} />
          <Route path='gestioncategories' element={<GestionCategories />} />
          <Route path='modifierarticle/:id' element={<ModifierArticle />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
