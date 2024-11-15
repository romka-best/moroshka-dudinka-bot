import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMoreProducts, getProducts } from "../../store/products/actions";
import css from './Category.module.scss';
import { Grid, InfiniteScroll, SpinLoading } from "antd-mobile";
import { selectProducts } from "../../store/products/selector";
import ProductItem from "../../components/ProductItem";
import ProductInfo from "../../components/ProductInfo";

const Category = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, products, productsPagination, loadingMore } = useSelector(selectProducts);
  const [infoVisible, setInfoVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    if (params.id === 'ALL') {
      dispatch(getProducts());
    } else {
      dispatch(getProducts(params?.id));
    }
  }, [params]);

  const handleChangeInfoVisible = () => setInfoVisible(!infoVisible);

  const handleProductClick = (product) => {
    setCurrentProduct(product);
    handleChangeInfoVisible();
  };

  const productsItems = useMemo(() => (
    products.map(product => (
      <ProductItem key={product?.id} product={product} onClick={() => handleProductClick(product)} />
    ))
  ), [products]);

  const handleLoadMore = async () => {    
    if (!loadingMore) {
      await dispatch(getMoreProducts(productsPagination?.page + 1));
    }
  };

  const hasMore = productsPagination?.page < productsPagination?.pages;

  return (
    <div>
      <h1>{params?.name}</h1>
      <div className={css['Category-container']}>
        {!loading
          ? (
            <>
              <ProductInfo 
                product={currentProduct}
                visible={infoVisible}
                onClose={handleChangeInfoVisible}
              />
              <Grid columns={2} gap={10}>
                {productsItems}
              </Grid>
              <InfiniteScroll loadMore={handleLoadMore} hasMore={hasMore} />
            </>
          )
          : <SpinLoading />
        }
      </div>
    </div>
  );
};

export default Category;
