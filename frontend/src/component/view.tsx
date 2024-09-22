import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../utils/api'; 

const View: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) { 
        try {
          const result = await getProductById(id);
          setProduct(result.data.data); 
        } catch (err) {
          console.log("Error fetching product:", err);
        }
      } else {
        console.log("Product ID is undefined");
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container my-5">
      <div className="card">
        <div className="card-header">
          <h3 className="text-center">Product Details</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5 className="card-title">Product Name:</h5>
              <p className="card-text">{product.product_name}</p>
            </div>
            <div className="col-md-6">
              <h5 className="card-title">Category:</h5>
              <p className="card-text">{product.category}</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <h5 className="card-title">Price:</h5>
              <p className="card-text">{product.price}</p>
            </div>
            <div className="col-md-6">
              <h5 className="card-title">Discount:</h5>
              <p className="card-text">{product.discount !== undefined ? product.discount : 0}%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={() => navigate('/')}>Back To Home</button>
      </div>
    </div>
  );
};

export default View;
