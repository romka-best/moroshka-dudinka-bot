import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMoreProducts, getProducts } from '../../store/products/actions';
import css from './Category.module.scss';
import { Grid, InfiniteScroll, NavBar, SearchBar, SpinLoading } from 'antd-mobile';
import { selectProducts } from '../../store/products/selector';
import ProductItem from '../../components/ProductItem';
import ProductInfo from '../../components/ProductInfo';
import Utils from '../../Utils';

const tg = window.Telegram.WebApp;

const Category = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, products, productsPagination, loadingMore } = useSelector(selectProducts);
  const [infoVisible, setInfoVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [search, setSearch] = useState('');

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
    const typeId = params?.id === 'ALL' ? '' : params?.id;
    
    if (!loadingMore) {
      await dispatch(getMoreProducts(productsPagination?.page + 1, search, typeId));
    }
  };
  
  const hasMore = productsPagination?.page < productsPagination?.pages;
  
  const searchBarPlaceholder = params.id === 'ALL' ? 'Поиск' : `Поиск по категории ${params?.name.toLowerCase()}`;

  const handleChangeSearch = Utils.debounce(title => {
    dispatch(getProducts(title, params.id === 'ALL' ? '' : params?.id));
    setSearch(title);
    window.scrollTo({
      top: 0,
    });
  }, 1000);

  useEffect(() => {
    if (params.id === 'ALL') {
      dispatch(getProducts());
    } else {
      dispatch(getProducts('', params?.id));
    }
  }, [params]);

  useEffect(() => {
    tg?.BackButton?.show();
    tg?.BackButton?.onClick(() => navigate('/catalog'));
  }, []);

  return (
    <div className={css['Category-wrapper']}>
      <NavBar className={css['Category-header-nav']} onBack={() => navigate('/catalog')} back='Каталог'>
        <p className={css['Category-title']}>
          {params?.name}
        </p>
      </NavBar>
      <div className={css['Category-header']}>
        <SearchBar placeholder={searchBarPlaceholder} onChange={handleChangeSearch} />
      </div>
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
          ) : <SpinLoading />
        }
      </div>
    </div>
  );
};

export default Category;
