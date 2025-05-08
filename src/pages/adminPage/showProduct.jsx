import React, { useEffect, useState } from 'react';
import { deleteProduct, getAllProduct } from '../../util/api';
import { Link } from 'react-router-dom';
import { notification } from 'antd';

const ShowProduct = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const getAllProducts = async () => {
        const data = await getAllProduct();
        setProducts(data);
        setFilteredProducts(data); // Set initial filtered products to all products
    };

    const handleDeleteProduct = async (id) => {
        const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm này không?`);
        if (isConfirmed) {
            try {
                const result = await deleteProduct(id);
                if (result.EC === 1) {
                    // Xóa sản phẩm khỏi danh sách trên giao diện mà không cần gọi lại API
                    setProducts(products.filter(product => product._id !== id));
                    setFilteredProducts(filteredProducts.filter(product => product._id !== id)); // Also remove from filtered list
                    notification.success({
                        message: 'Đã xóa sản phẩm thành công',
                        showProgress: true
                    });
                } else {
                    alert("Failed to delete the product.");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("An error occurred while deleting the product.");
            }
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter products based on search query
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
    };

    useEffect(() => {
        getAllProducts();
    }, []);

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
                                            <h3>Sản phẩm</h3>
                                        </div>
                                        <hr />
                                        {/* Search Input */}
                                        <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="Tìm kiếm sản phẩm..."
                                            value={searchQuery}
                                            onChange={handleSearch}
                                        />
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
                                                {filteredProducts.map((product) => (
                                                    <tr key={product._id}>
                                                        <th>{product._id}</th>
                                                        <td>{product.name}</td>
                                                        <td>{product.price}.000.000 VND</td>
                                                        <td>{product.category}</td>
                                                        <td>
                                                            <img
                                                                src={`${import.meta.env.VITE_BACKEND_URL}/routes/productLaptop/${product.image}`}
                                                                alt="Product"
                                                                style={{ width: "150px", height: "150px" }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Link to={`/getProductDetail/${product._id}`} className="btn btn-success">Xem</Link>
                                                            <Link to={`/updateProduct/${product._id}`} className="btn btn-warning mx-2">Chỉnh sửa</Link>
                                                            <button className="btn btn-danger" onClick={() => handleDeleteProduct(product._id)}>Xóa</button>
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
                        {/* Footer component */}
                    </footer>
                </div>
            </div >

            <script src="js/scripts.js"></script>
        </div >
    );
};

export default ShowProduct;
