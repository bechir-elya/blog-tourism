import { Link } from 'react-router-dom';
import { FaPowerOff } from "react-icons/fa6";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaHouseChimney } from "react-icons/fa6";
import { FaParagraph } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa6";
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function GestionArticles() {

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  let decoded;

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

  useEffect(() => {
    const retrieveCategories = async () => {
      try {
        const response = await axios.get('http://localhost:1963');
        setCategories(response.data.categories);
        console.log(categories);

      } catch (error) {
        console.log(error);
      }
    }
    retrieveCategories()
  }, []);


  useEffect(() => {
    setCategory(categories[0]?._id);
  }, [title]);

  const token = Cookies.get("token");


  const handleOnSubmit = async (e) => {
    e.preventDefault();

    console.log(category);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('content', content);
    formData.append('image', image);

    const response = await axios.post('http://localhost:1963/gestionarticles', formData, { headers: { "Authorization": token } });

    navigate('/administrationPage');
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
            <Form onSubmit={handleOnSubmit} encType='multipart/form-data'>
              <div className='d-flex justify-content-between mb-4'>
                <h5>Rédiger un article</h5>
                <button type='submit'>Valider</button>
              </div>

              <Form.Label>Catégorie de l'article</Form.Label>

              <Form.Select aria-label="Default select example" className='mb-4' onChange={(e) => { setCategory(e.target.value) }}>
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>{category.title}</option>
                ))}
              </Form.Select>


              <Form.Label>Titre de l'article</Form.Label>
              <Form.Control type="text" value={title} className='mb-4' onChange={(e) => setTitle(e.target.value)} />

              <Form.Label>Image de l'article</Form.Label>
              <Form.Control type="file" className='mb-4' onChange={(e) => setImage(e.target.files[0])} />

              <Form.Label>Contenu de l'article</Form.Label>
              <Form.Control as="textarea" value={content} rows={10} onChange={(e) => setContent(e.target.value)} />
            </Form>
          </Col>
        </Row>
      </main>
    </>
  )
}

export default GestionArticles