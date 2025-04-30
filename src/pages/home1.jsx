import "./css/style.css"
import "./css/bootstrap.min.css"
import { Link } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import Banner from "../components/layout/banner";
import Feature from "../components/layout/feature";
import { getAllProduct, getAProduct, getProductDetail } from "../util/api";
import { notification } from "antd";

const HomeTest = () => {


    const [data, setData] = useState([]);
    const [countProduct, setCountProduct] = useState(0);
    const getProduct = async () => {
        const data = await getAllProduct();
        setCountProduct(data.length);
        setData(data);
    }


    const handleBuyProduct = async (product) => {

        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        if (address !== auth.user.address) {
            alert("Địa chỉ ví MetaMask hiện tại không trùng với ví của người dùng!. Vui lòng chọn đúng tài khoản");
            return;
        }
        // const product = await getAProduct(id);
        // alert(id)

        const transaction = await dappazon
            .connect(signer)
            .buy(product.id, 1, { value: product.price });
        await transaction.wait();

        // alert("Purchase successful!", address);
        notification.success({
            message: "Mua sản phẩm thành công!",
            showProgress: true


        })
    }

    useEffect(() => {
        // Gọi hàm để lấy số lượng sản phẩm và sau đó gọi loadBlockchainData
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
                                <h1>Sản phẩm nổi bật</h1>
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
                        <div className="tab-content">
                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            {data.map((product) => (
                                                <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
                                                    <div className="rounded position-relative fruite-item">
                                                        <div className="fruite-img">
                                                            <img
                                                                src={`${import.meta.env.VITE_BACKEND_URL}/routes/productLaptop/${product.image}`} alt="Product"
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
                                                                {/* Sử dụng Link và truyền dữ liệu qua state */}
                                                                <Link to={`/product/${product._id}`} state={{
                                                                    product
                                                                }}>
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

                                                                <button onClick={() => { handleBuyProduct(product) }} className="mx-auto btn border border-secondary rounded-pill px-3 text-primary"
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
            </div >
            <Feature />

        </>
    );
};

export default HomeTest;