import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';



function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:1963/login', { email, password });
      Cookies.set('token', response.data, { expires: 7 });

      navigate('/administrationPage')
    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <>
      <Container>
        <h2>Connectez-vous</h2>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-4 mt-4" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type='submit'>
            Se connecter
          </Button>
          <p>{error}</p>
          <p>Vous n'avez pas de compte ? <Link to={'/register'} target='_blank'> Inscrivez-vous !</Link></p>
        </Form>
      </Container>
    </>
  )
}

export default Login