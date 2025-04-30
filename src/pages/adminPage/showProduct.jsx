import React, { useEffect, useState } from 'react';
import { deleteProduct, getAllProduct } from '../../util/api';
import { use } from 'react';
import { Link } from 'react-router-dom';

const ShowProduct = () => {
    const [products, setProducts] = useState([]);
    const [id, setId] = useState("");
    const getAllProducts = async () => {
        const data = await getAllProduct();
        setProducts(data);
    }
    const handleDeleteProduct = async (id) => {
        setId(id);
        const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm này không?`);
        if (isConfirmed) {
            try {
                const result = await deleteProduct(id);
                if (result.EC === 1) {
                    // Xóa sản phẩm khỏi danh sách trên giao diện mà không cần gọi lại API
                    setProducts(products.filter(product => product._id !== id));
                    alert("Đã xóa sản phẩm thành công!");
                } else {
                    alert("Failed to delete the product.");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("An error occurred while deleting the product.");
            }
        }
    }


    useEffect(() => {
        getAllProducts()
    }, []);
    console.log("products", products);


    console.log("id", id);


    return (
        <div className="sb-nav-fixed">
            <div id="layoutSidenav">
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Quản lý sản phẩm</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item">
                                    <a href="/homeadmin">Trang chủ</a>
                                </li>
                                <li className="breadcrumb-item active">Danh sách sản phẩm</li>
                            </ol>
                            <div className="mt-5">
                                <div className="row">
                                    <div className="col-12 mx-auto">
                                        <div className="d-flex justify-content-between">
                                            <h3>Table Products</h3>
                                            <a href="/createproduct" className="btn btn-primary">Tạo sản phẩm</a>
                                        </div>
                                        <hr />
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Category</th>
                                                    <th>Image</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map((product) => (
                                                    <tr key={product.id}>
                                                        <th>{product._id}</th>
                                                        <td>{product.name}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.category}</td>
                                                        <img src={`${import.meta.env.VITE_BACKEND_URL}/routes/productLaptop/${product.image}`} alt="Product"
                                                            style={{ width: "150px", height: "150px" }} />


                                                        <td>
                                                            <Link to={`/getProductDetail/${product._id}`} className="btn btn-success">Xem</Link>
                                                            <a href={`/admin/product/update/${product.id}`} className="btn btn-warning mx-2">Chỉnh sửa</a>
                                                            <button className="btn btn-danger" onClick={() => { handleDeleteProduct(product._id) }}>Xóa</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer>
                        {/* You can include your footer component here */}
                    </footer>
                </div>
            </div >

            <script src="js/scripts.js"></script>
        </div >
    );
};

export default ShowProduct;
