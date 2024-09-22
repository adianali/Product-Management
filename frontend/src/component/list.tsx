import React from 'react';
import { NavLink } from 'react-router-dom';
import apiClient from '../utils/api'; 
import Swal from 'sweetalert2';  

interface Product {
  id: number;
  product_name: string;
  category: string;
  price: string;
  discount?: number;
}

interface ListProps {
  products: Product[] | undefined; 
  refreshProducts: () => void; 
}

const formatCurrency = (value: string) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(Number(value));
};

const formatDiscount = (discount: number | undefined) => {
  return discount ? `${discount}%` : '0%';
};

const List: React.FC<ListProps> = ({ products = [], refreshProducts }) => { 
  console.log("Product list in List component:", products);  

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await apiClient.delete(`/products/${id}`);
        
        Swal.fire(
          'Deleted!',
          'The product has been deleted.',
          'success'
        );

        refreshProducts();
      } catch (err) {
        Swal.fire(
          'Failed!',
          'The product could not be deleted.',
          'error'
        );
        console.error("Failed to delete product", err);
      }
    }
  };

  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>S No.</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (  
            products.map((product, i) => (
              <tr key={product.id}>
                <td>{i + 1}</td>
                <td>{product.product_name}</td>
                <td>{product.category}</td>
                <td>{formatCurrency(product.price)}</td> 
                <td>{formatDiscount(product.discount)}</td> 
                <td>
                  <NavLink to={`/view/${product.id}`} className="btn btn-success mx-2">
                    View
                  </NavLink>
                  <NavLink to={`/edit/${product.id}`} className="btn btn-info mx-2">
                    Edit
                  </NavLink>
                  <button onClick={() => handleDelete(product.id)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
