import { Link, useNavigate } from 'react-router-dom';
import { FaPowerOff } from "react-icons/fa6";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaHouseChimney } from "react-icons/fa6";
import { FaParagraph } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import Table from 'react-bootstrap/Table';
import { FaPencil } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import axios from "axios"
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

function AdministrationPage() {

  const token = Cookies.get("token");
  const navigate = useNavigate();
  let decoded

  if (token) {
    decoded = jwtDecode(token);

  }

  if (decoded?.role != 'admin') {
    navigate('/')
  }

  const [articles, setArticles] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const deleteArticle = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:1963/delete/${id}`);
      setDeleted(true);
      navigate('/administrationPage');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const response = await axios.get('http://localhost:1963');
        console.log(response.data.articles);
        setArticles(response.data.articles);
      } catch (error) {
        console.log(error);
      }
    }
    retrieveData()
  }, [deleted]);

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

          <Col lg='7' className='articlesTable'>
            <div className='d-flex justify-content-between'>
              <h5>Liste des articles</h5>
              <Link to={'/gestionarticles'} id='add'><FaPlus /> Ajouter un article</Link>
            </div>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Date de modification</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article, index) => (
                  <tr key={index}>
                    <td>{article.title}</td>
                    <td>{new Date(article.date).toLocaleDateString()}</td>
                    <td className='d-flex justify-content-around'>
                      <Link to={`/modifierarticle/${article._id}`} className='modif'><FaPencil /> Modifier</Link>
                      <button className='sup' onClick={() => deleteArticle(article._id)}><FaTrashCan /> Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </main>
    </>
  )
}

export default AdministrationPage