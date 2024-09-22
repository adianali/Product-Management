import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../utils/api'; 
import Swal from 'sweetalert2';  

const Edit: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); 
  const navigate = useNavigate();

  const [productField, setProductField] = useState({
    product_name: '',
    category: '',
    price: 0,
    discount: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) { 
        try {
          const result = await getProductById(id);
          setProductField(result.data.data); 
        } catch (err) {
          console.log("Something went wrong", err);
        }
      } else {
        console.log("Product ID is undefined");
      }
    };
    fetchProduct();
  }, [id]);

  const changeProductFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductField({
      ...productField,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) { 
      try {
        await updateProduct(id, productField); 
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Product updated successfully',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate('/'); 
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Something went wrong. Please try again.',
        });
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="card">
        <div className="card-header">
          <h3 className="text-center">Edit Product</h3>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmitChange}>
            <div className="mb-3">
              <label className="form-label">Product Name:</label>
              <input
                type="text"
                className="form-control"
                name="product_name"
                value={productField.product_name}
                onChange={changeProductFieldHandler}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category:</label>
              <input
                type="text"
                className="form-control"
                name="category"
                value={productField.category}
                onChange={changeProductFieldHandler}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price:</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={productField.price}
                onChange={changeProductFieldHandler}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Discount:</label>
              <input
                type="number"
                className="form-control"
                name="discount"
                value={productField.discount}
                onChange={changeProductFieldHandler}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Update Product</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Back To Home</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
