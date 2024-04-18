import { Link } from 'react-router-dom';
import { FaPowerOff } from "react-icons/fa6";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaHouseChimney } from "react-icons/fa6";
import { FaParagraph } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa6";
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from "react";

function GestionCategories() {

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const token = Cookies.get("token");
  let decoded

  useEffect(() => {
    if (!token) {
      navigate('/')
    } else {
      decoded = jwtDecode(token);
      if (decoded?.role != 'admin') {
        navigate('/')
      }
    }
  }, [])

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:1963/gestioncategories', {
        title: title,
        content: content
      }, { headers: { "Authorization": token } });
      alert('Category added');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const logOut = () => {
    Cookies.remove("token");
    navigate('/');
  }

  return (
    <>
      <header className='d-flex justify-content-around adminPage'>
        <Link to={'/'}>Mon blog</Link>
        <a href="#" onClick={logOut}><FaPowerOff /> Se déconnecter</a>
      </header>

      <main className='adminMain'>
        <Row>
          <Col lg='4' className='dashBoard'>
            <ul>
              <li><Link to={'/administrationPage'}><FaHouseChimney /> Tableau de bord</Link></li>
              <li><Link to={'/gestionarticles'}><FaParagraph /> Gestion des articles</Link></li>
              <li><Link to={'/gestioncategories'}><FaFolder /> Gestion des catégories</Link></li>
            </ul>
          </Col>

          <Col lg='7' className='addArticle'>
            <Form>
              <div className='d-flex justify-content-between mb-4'>
                <h5>Ajouter une catégorie</h5>
                <a href="#" onClick={handleSubmit}>Valider</a>
              </div>

              <Form.Label>Titre de la catégorie</Form.Label>
              <Form.Control type="text" value={title} className='mb-4' onChange={(e) => setTitle(e.target.value)} />

              <Form.Label>Contenu de la catégorie</Form.Label>
              <Form.Control as="textarea" value={content} rows={10} onChange={(e) => setContent(e.target.value)} />
            </Form>
          </Col>
        </Row>
      </main>
    </>
  )
}

export default GestionCategories