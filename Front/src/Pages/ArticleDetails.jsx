import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { FaUser } from "react-icons/fa";



function ArticleDetails() {

  const navigate = useNavigate()
  const { id } = useParams();
  let decoded
  let userId

  const [article, setArticle] = useState();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [adminConnected, setAdminConnected] = useState();
  const [userConnected, setUserConnected] = useState();

  useEffect(() => {
    const retrieveDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:1963/articledetails/${id}`);
        console.log(response.data.article);
        setArticle(response.data.article);
      } catch (error) {
        console.log(error);
      }
    }
    retrieveDetails();
  }, []);

  const token = Cookies.get("token");

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (!token) {
        navigate('/login')
      } else {
        decoded = jwtDecode(token);
        if (decoded?.role == 'admin' || decoded?.role == 'user') {
          userId = decoded.userId
          console.log(userId);
          const response = await axios.post(`http://localhost:1963/articledetails/${id}`, {
            title: title,
            content: content,
            user: userId
          }, { headers: { "Authorization": token } }); 
        } else {
          navigate('/login')
        }
      }

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
      <header id="details">
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
                <Link to={'administrationPage'} target='_blank' style={{ display: adminConnected ? 'inline-block' : 'none' }}>ADMINISTRATION</Link>

                <Link to={'/login'} target='_blank' style={{ display: adminConnected || userConnected ? 'none' : 'inline-block' }}>CONNEXION</Link>

                <Link to={'/'} target='_blank' style={{ display: adminConnected || userConnected ? 'inline-block' : 'none' }} onClick={logOut}>DECONNEXION</Link>
              </div>
            </div>
          </Col>
        </Row>
      </header>

      <main>
        <Container>
          <Row>
            <Col className='descriptionAndComment'>
              <h2>{article?.title}</h2>
              <img src={`http://localhost:1963/uploads/${article?.image}`} />
              <p>{article?.content}</p>
              <p className='posted'>{new Date(article?.date).toLocaleDateString()}</p>

              <Form onSubmit={handleSubmit}>
                <Form.Control type="text" placeholder="Votre titre" onChange={(e) => setTitle(e.target.value)} />
                <Form.Control as="textarea" rows={4} placeholder='Votre message' onChange={(e) => setContent(e.target.value)} />
                <button type='submit'>Soumettre</button>
              </Form>
            </Col>

            <Col className='descriptionAndComment'>
              <h2>Liste des commentaires</h2>
              {article ? article.comments.map((item, index) => (
                <div key={index} className='comments mb-3'>
                  <p className='userCom'><FaUser />  {item.user.username}</p>
                  <h4>{item.title}</h4>
                  <p>"{item.content}"</p>
                  <p className='dateCom'>Commenté le {new Date(item.date).toLocaleDateString()}</p>
                </div>
              )) : <p>loading...</p>}
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default ArticleDetails