import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:1963/register', { email, password, username });
      navigate('/login');
    } catch (error) {
      setError(error.response.data);
    }

  }

  return (
    <>
      <Container>
        <h2>Register</h2>
        <Form>
          <Form.Group className="mb-4 mt-4" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={username} placeholder="Enter username" className="mb-4" onChange={(e) => setUsername(e.target.value)} />
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <p>{error}</p>
          <p>Déjà inscrit ? <Link to={'/login'} target='_blank'> Connectez-vous ici !</Link></p>
        </Form>
      </Container>
    </>
  )
}

export default Register