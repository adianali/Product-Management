import React, { useState, useEffect } from 'react';
import { createProduct, getProducts } from '../utils/api'; 
import List from './list'; 

interface HomeProps {
  onLogout: () => void; 
}

const Home: React.FC<HomeProps> = ({ onLogout }) => {
  const [productField, setProductField] = useState({
    product_name: '',
    category: '',
    price: 0,  
    discount: 0,
  });

  const [productData, setProductData] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    fetchProducts(); 
  }, []);

  const fetchProducts = async () => {
    setLoading(true); 
    setError(null); 

    try {
      const result = await getProducts(); 
      console.log("Fetched products:", result.data); 
      setProductData(result.data.data); 
    } catch (err) {
      console.error("Error fetching products:", err); 
      setError("Failed to load products. Please try again."); 
    } finally {
      setLoading(false); 
    }
  };

  const changeProductFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductField({
      ...productField,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createProduct(productField); 
      fetchProducts(); 
      setProductField({ product_name: '', category: '', price: 0, discount: 0 }); 
    } catch (err) {
      console.error("Error creating product:", err); 
      setError("Failed to create product. Please try again."); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center m-4">
        <h2 className="p-3 mx-auto">Product Management</h2>
        <button onClick={onLogout} className="btn btn-danger">Logout</button> 
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <h3>Add Product</h3>
          <form onSubmit={onSubmitChange}>
            <div className="mb-3 mt-3">
              <label className="form-label">Product Name:</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter Product Name" 
                name="product_name" 
                value={productField.product_name} 
                onChange={changeProductFieldHandler} 
                required 
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Category:</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter Category" 
                name="category" 
                value={productField.category} 
                onChange={changeProductFieldHandler} 
                required 
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Price:</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Enter Price" 
                name="price" 
                value={productField.price} 
                onChange={changeProductFieldHandler} 
                required 
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Discount:</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Enter Discount" 
                name="discount" 
                value={productField.discount} 
                onChange={changeProductFieldHandler} 
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </form>
        </div>
        <div className='col-md-8'>
          <h3>Product List</h3>
          {loading && <p>Loading...</p>} 
          {error && <p className="text-danger">{error}</p>}
          <List products={productData} refreshProducts={fetchProducts} /> 
        </div>
      </div>
    </div>
  );
};

export default Home;
