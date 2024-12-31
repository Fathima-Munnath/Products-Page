import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
 


  const getProducts = async () => {
    
    try {
       const response = await axios.get('http://localhost:3000/products');
       setProducts(response.data);
    }  catch (error) {
       console.error(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);
  
 
  return (
    <Container style={{ marginTop: "2rem" }}>
      <h1 className="text-center mb-4">Our Products</h1>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {products.map((product) => (
          <li key={product._id}>
            <Card>
              <Card.Img
                variant="top"
                src={product.image || "https://via.placeholder.com/150"}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(product.price)}
                </Card.Text>
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Products;
