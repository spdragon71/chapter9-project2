import { useState } from "react";
import { Link } from "react-router";
import styles from "./Home.module.css";

import useFetchProducts from "../../hooks/useFetchProducts";

const Home = () => {
    const { products, isProductsLoading, isProductsError } = useFetchProducts();
    const [selectedCategoy, setSelectedCategoy] = useState("전체");

    const filteredProducts = products.filter(({category}) => {
        if (selectedCategoy === "전체") {
            return true;
        } else {
            return selectedCategoy === category;
        }
    })

    if (isProductsLoading) {
        return <div>상품을 로딩 중입니다...</div>
    }

    if (isProductsError) {
        return <div>상품 목록을 가져오는 중에 에러가 발생했습니다.</div>
    }
    
    return (
        <div>
            <ul className={styles.categoryList}>
                {[ "전체", "상의", "하의", "신발", "가방", "악세서리" ].map(
                    (category) => {
                        return (
                            <li
                                key={category}
                                className={selectedCategoy === category ? styles.selected : null}
                                onClick={() => {
                                    setSelectedCategoy(category);
                                }}
                            >
                                {category}
                            </li>
                        )
                    }
                )}
            </ul>
            <h3>상품 목록({filteredProducts.length})</h3>
            <div className={styles.productList}>
                {filteredProducts.map((product) => {
                    return (
                        <Link key={product.id} to={`/products/${product.id}`} className={styles.productListItem}>
                            <img src={product.image} />
                            <div className={styles.productInfo}>
                                <div className={styles.productCategory}>{product.category}</div>
                                <div className={styles.productName}>{product.name}</div>
                                <div className={styles.productPrice}>{product.price.toLocaleString()}원</div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}

export default Home;
