import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cards from '../Components/Cards';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function Home() {

  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adminConnected, setAdminConnected] = useState();
  const [userConnected, setUserConnected] = useState();
  let decoded;

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const response = await axios.get('http://localhost:1963');
        setArticles(response.data.articles);
        setCategories(response.data.categories);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    retrieveData()
  }, []);

  useEffect(() => {
    if (!token) {
      setAdminConnected(false);
      setUserConnected(false);
    } else {
      decoded = jwtDecode(token);
      if (decoded?.role == 'admin') {
        setAdminConnected(true);
      }else if(decoded?.role == 'user'){
        setUserConnected(true);
      }
    }
  }, []);

  const logOut = () => {
    Cookies.remove("token");
    navigate('/');
  }

  const token = Cookies.get("token");

  return (
    <>
      <header id="home" >
        <Row>
          <Col>
            <div className="linkBackground link1">
              <Link to={'/'}>Blog de tourisme</Link>
            </div>
          </Col>
          <Col>
            <div className="linkBackground">
              <div className='d-flex justify-content-around'>
                <a href="#">A PROPOS</a>
                <a href="#">CONTACT</a>
                
                <Link to={'administrationPage'} target='_blank' style={{display:adminConnected?'inline-block': 'none'}}>ADMINISTRATION</Link>

                <Link to={'login'} target='_blank' style={{display:adminConnected||userConnected?'none':'inline-block'}}>CONNEXION</Link>

                <Link to={'/'} target='_blank' style={{display:adminConnected||userConnected?'inline-block':'none'}} onClick={logOut}>DECONNEXION</Link>
              </div>
            </div>
          </Col>
        </Row>
        <div className='discover'>
          <h1>LE BLOG DU VOYAGE DURABLE ET RESPONBALE</h1>
          <a href="#">Découvrir</a>
        </div>
      </header>

      <main className='mt-5'>
        <Container>
          <h2>Conseils et Idées pour vos prochaines vacances</h2>

          <Navbar expand="lg" className='mb-5'>
            <Container fluid>
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: '100px' }}
                  navbarScroll
                >
                  <Nav.Link href="#action1">Themes: </Nav.Link>
                  {categories.map((category, index) => (
                    <Nav.Link key={index} href="#action2">{category.title}</Nav.Link>
                  ))}
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>

        <Container>
          <Row>
            {articles && articles.map((article, index) => (
              <Cards key={index} article={article} />
            ))}
          </Row>
        </Container>

        <Container className='infos'>
          <Row>
            <Col lg='6'>
              <h5>Voulez-vous recevoir nos dernières mises à jour ?</h5>
              <p>Veuillez vous inscrire à notre espace  pour les nouveaux articles à venir et les dernières informations sur notre travail</p>
              <div className='d-flex justify-content-between'>
                <Form.Control type="email" placeholder="Email.." />
                <button type='submit'>S'inscrire</button>
              </div>
            </Col>
            <Col>
              <h5>Notre objectif</h5>
              <p>Nous parcourons le monde à la recherche de bons plans, d'astuces pour vous aider à voyager plus facilement.</p>
            </Col>
            <Col>
              <h5>Réseaux Sociaux</h5>
              <div className='d-flex justify-content-between mt-4 socialNetworks'>
                <FaXTwitter />
                <FaFacebookF />
                <FaInstagram />
                <FaYoutube />
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default Home