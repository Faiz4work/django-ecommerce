import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, FormControl } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'


function ProductScreen({ history }) {
  const dispatch = useDispatch()
  const {id} = useParams()
  const [qty, setQty] = useState(1)

  const productDetails = useSelector(state => state.productDetails)
  const {error, loading, product} =  productDetails
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(listProductDetails(id))  

  }, [dispatch, id])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>

      {loading ?
        <Loader/> 
        : error 
        ? <Message variant="danger">{error}</Message>
        : (
              <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                      <h3>{product.name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                      <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Price: ${product.price}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col><strong>${product.price}</strong></Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                        </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col xs='auto' className='my-1'>
                            <FormControl
                            as="select"
                            value={qty}
                            onChange={(e)=>(setQty(e.target.value))}
                            >
                                {
                                  [...Array(product.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x+1} value={x+1}>{x+1}</option>
                                    )
                                  )
                                }
                            </FormControl>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                    }

                    <ListGroup.Item>
                        <Row>
                          <Button disabled={product.countInStock === 0} 
                          type='button' onClick={addToCartHandler}
                          className='btn-block'>Add to cart</Button>
                        </Row>
                    </ListGroup.Item>

                  </ListGroup>
                </Card>
            </Col>


          </Row>
        )


      }

    </div>
  )
}

export default ProductScreen
