import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/style.css";
import "./css/bootstrap.min.css";
import "./css/lightbox.min.css";
import "./css/owl.carousel.min.css";


const ProductDetail = () => {
    const location = useLocation();
    const { product } = location.state;  // Lấy sản phẩm từ state
    // Tạo state để lưu trữ số lượng
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        window.scrollTo(0, 0);  // Scroll lên đầu trang khi vào trang này
    }, []);
    // Hàm xử lý thay đổi số lượng
    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1); // Đảm bảo số lượng không nhỏ hơn 1
        setQuantity(value);
    };



    return (
        <div className="container-fluid  mt-5">
            <div className="container py-5">
                <div className="row g-4 mb-5">
                    <div>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="/">Trang chủ</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Chi Tiết Sản Phẩm
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-lg-8 col-xl-9">
                        <div className="row g-4">
                            <div className="col-lg-6">
                                <div className="border rounded">
                                    <a href="#">
                                        <img
                                            src={`${import.meta.env.VITE_BACKEND_URL}/routes/productLaptop/${product.image}`} alt="Product"
                                            className="img-fluid rounded"

                                        />
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <h4 className="fw-bold mb-3">{product.name}</h4>
                                <p className="mb-3">{product.factory}</p>
                                <h5 className="fw-bold mb-3">
                                    {product.price}.000.000 VND
                                </h5>
                                <div className="d-flex mb-4">
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <p className="mb-4">Mô tả sản phẩm: {product.shortDesc}</p>
                                <p className="mb-4">Số lượng sản phẩm: {product.stock}</p>

                                <div className="input-group quantity mb-5" style={{ width: "100px" }}>
                                    <div className="input-group-btn">
                                        <button
                                            className="btn btn-sm btn-minus rounded-circle bg-light border"
                                            onClick={() => setQuantity(quantity - 1)}  // Giảm số lượng
                                        >
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm text-center border-0"
                                        value={quantity} // Gắn giá trị quantity vào input
                                        onChange={handleQuantityChange} // Thêm onChange để xử lý sự thay đổi
                                    />
                                    <div className="input-group-btn">
                                        <button
                                            className="btn btn-sm btn-plus rounded-circle bg-light border"
                                            onClick={() => setQuantity(quantity + 1)}  // Tăng số lượng
                                        >
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>

                                <button className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                                >
                                    <i className="fa fa-shopping-bag me-2 text-primary"></i>
                                    Mua
                                </button>

                            </div>
                            <div className="col-lg-12">
                                <nav>
                                    <div className="nav nav-tabs mb-3">
                                        <button
                                            className="nav-link active border-white border-bottom-0"
                                            type="button"
                                            role="tab"
                                            id="nav-about-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#nav-about"
                                            aria-controls="nav-about"
                                            aria-selected="true"
                                        >
                                            Mô tả sản phẩm
                                        </button>
                                    </div>
                                </nav>
                                <div className="tab-content mb-5">
                                    <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                        <p>{product.shortDesc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-xl-3">
                        <div className="row g-4 fruite">
                            <div className="col-lg-12">
                                <div className="mb-4">
                                    <h4>Hãng sản xuất</h4>
                                    <ul className="list-unstyled fruite-categorie">
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#">
                                                    <i className="fas fa-apple-alt me-2"></i>Apples
                                                </a>
                                                <span>(3)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#">
                                                    <i className="fas fa-apple-alt me-2"></i>Dell
                                                </a>
                                                <span>(5)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#">
                                                    <i className="fas fa-apple-alt me-2"></i>Asus
                                                </a>
                                                <span>(2)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#">
                                                    <i className="fas fa-apple-alt me-2"></i>Acer
                                                </a>
                                                <span>(8)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#">
                                                    <i className="fas fa-apple-alt me-2"></i>Lenovo
                                                </a>
                                                <span>(5)</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
