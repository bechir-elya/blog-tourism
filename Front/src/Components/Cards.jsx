import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import { Link } from "react-router-dom";

function Cards({article}) {

  console.log(article);
  
  return (
    <>
      
        <Col lg='4' className='mb-4'>
          <Card>
            <Card.Img variant="top" src={`http://localhost:1963/uploads/${article.image}`} />
            <Card.Body>
              <Card.Title>
                <Link to={`/articledetails/${article._id}`}>{article.category.title} : {article.title}</Link>
              </Card.Title>
              <Card.Text>
                {article.content.substr(0, 100)}...
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{new Date(article.date).toLocaleDateString()}</small>
            </Card.Footer>
          </Card>
        </Col>
      
    </>
  )
}

export default Cards