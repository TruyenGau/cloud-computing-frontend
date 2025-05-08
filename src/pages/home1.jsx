import "./css/style.css"
import "./css/bootstrap.min.css"
import { Link } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import Banner from "../components/layout/banner";
import Feature from "../components/layout/feature";
import { getAllProduct, getAProduct, getProductDetail } from "../util/api";  //lay out api call
import { notification } from "antd";

const HomeTest = () => {

    const [data, setData] = useState([]);   // To store all products
    const [filteredData, setFilteredData] = useState([]); // To store filtered products based on search
    const [searchQuery, setSearchQuery] = useState(''); // Search query state

    const getProduct = async () => {
        const data = await getAllProduct();
        setData(data);
        setFilteredData(data); // Initially, show all products
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
        setSearchQuery(query);

        // Filter products based on the query matching either name or short description
        const filtered = data.filter((product) =>
            product.name.toLowerCase().includes(query) ||
            product.shortDesc.toLowerCase().includes(query)
        );
        setFilteredData(filtered); // Set the filtered products to display
    }


    useEffect(() => {
        getProduct();
    }, []);

    return (
        <>
            <Banner />
            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <div className="tab-class text-center">
                        <div className="row g-4">
                            <div className="col-lg-4 text-start">
                                <h1 style={{ color: "#81c408" }}>Sản phẩm nổi bật</h1>
                            </div>
                            <div className="col-lg-8 text-end">
                                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                                    <li className="nav-item">
                                        <a
                                            className="d-flex m-2 py-2 bg-light rounded-pill active"
                                            href="/products"
                                        >
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="row mb-5">
                            <div className="col-12">
                                <input
                                    type="text"
                                    placeholder="Tìm sản phẩm..."
                                    value={searchQuery}
                                    onChange={handleSearch} // Handle search query change
                                    className="form-control search-bar"
                                    style={{
                                        width: "100%",
                                        padding: "12px 20px",
                                        fontSize: "16px",
                                        borderRadius: "30px",
                                        border: "2px solid #ddd",
                                        transition: "all 0.3s ease-in-out",
                                        boxShadow: "0 4px 6px rgba(9, 52, 16, 0.1)",
                                        backgroundColor: "#f8f8f8"
                                    }}
                                />
                            </div>
                        </div>

                        <div className="tab-content">
                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            {filteredData.map((product) => (
                                                <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
                                                    <div className="rounded position-relative fruite-item">
                                                        <div className="fruite-img">
                                                            <img
                                                                src={`${import.meta.env.VITE_BACKEND_URL}/routes/productLaptop/${product.image}`}
                                                                alt="Product"
                                                                className="img-fluid w-100 rounded-top"
                                                            />
                                                        </div>
                                                        <div
                                                            className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                                                            style={{ top: "10px", left: "10px" }}
                                                        >
                                                            Laptop
                                                        </div>
                                                        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                            <h4 style={{ fontSize: "15px" }}>
                                                                <Link to={`/product/${product._id}`} state={{ product }}>
                                                                    {product.name}
                                                                </Link>
                                                            </h4>
                                                            <p style={{ fontSize: "13px" }}>{product.shortDesc}</p>
                                                            <div className="d-flex flex-lg-wrap justify-content-center flex-column">
                                                                <p
                                                                    style={{
                                                                        fontSize: "15px",
                                                                        textAlign: "center",
                                                                        width: "100%",
                                                                    }}
                                                                    className="text-dark fw-bold mb-3"
                                                                >
                                                                    {product.price}.000.000 VNĐ
                                                                </p>

                                                                <button

                                                                    className="mx-auto btn border border-secondary rounded-pill px-3 text-primary"
                                                                >
                                                                    <i className="fa fa-shopping-bag me-2 text-primary"></i>
                                                                    Mua ngay
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Feature />
        </>
    );
};

export default HomeTest;
