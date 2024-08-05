import { Button, Carousel, Flex, Input, List, Skeleton, Spin, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/products/productsSlice';
import { SearchOutlined } from '@ant-design/icons';
import _, { has, isEmpty } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import css from './Products.module.scss';
import ProductDetails from '../../components/ProductDetails';
import Utils from '../../Utils';
import ProductButton from '../../components/ProductButton';

const tg = window.Telegram.WebApp;

const { Title, Paragraph } = Typography;

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, pages, page, size, total } = useSelector(state => state.products);
  const { cart } = useSelector(state => state.cart);
  const [search, setSearch] = useState('');
  const [details, setDetails] = useState({
    product: {},
    open: false,
  });

  useEffect(() => {
    dispatch(getProducts({}));
  }, []);

  const onSearchProductDebounce = (title) => {
    dispatch(getProducts({ title: title.target.value }));
  };

  const getProductsDebounced = useCallback(_.debounce(onSearchProductDebounce, 1000), []);

  const onSearchProduct = (e) => {
    getProductsDebounced(e);
    setSearch(e.target.value);
  };

  const loadMoreData = () => {
    if (loading) return

    dispatch(getProducts({ title: search, page: page + 1 }));
  };

  const handleOpenDetails = (product) => {
    setDetails({
      product,
      open: true,
    });
    tg.HapticFeedback.impactOccurred('medium');
  };

  const handleCloseDetails = () => {
    setDetails({
      ...details,
      open: false,
    });
  };

  return (
    <div>
      <Title>Каталог</Title>
      <Input
        placeholder='Поиск по товарам'
        suffix={<SearchOutlined />}
        onChange={onSearchProduct}
        size='large'
        variant='filled'
        value={search}
        allowClear
      />
      <div
        id='scrollableDiv'
        className={css['Products-container']}
      >
        <Spin
          spinning={isEmpty(products) && loading}
          fullscreen
          size='large'
        />
        <InfiniteScroll
          dataLength={total}
          next={loadMoreData}
          hasMore={pages >= page}
          loader={loading && <Spin spinning size='large' />}
          // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget='scrollableDiv'
        >
          <List
            dataSource={products}
            locale={{ emptyText: loading ? 'Загрузка...' : 'Ничего не нашлось' }}
            renderItem={(item) => (
              <Flex key={item?.id} className={css['Products-item']} vertical>
                <div onClick={() => handleOpenDetails(item)}>
                  <Carousel draggable onSwipe={e => e.preventDefault()}>
                    <div className={css['Products-item-img']}>
                      <h3>ТОРТ</h3>
                    </div>
                    <div className={css['Products-item-img']}>
                      <h3>ТОРТ 2</h3>
                    </div>
                    <div className={css['Products-item-img']}>
                      <h3>ТОРТ 3</h3>
                    </div>
                    <div className={css['Products-item-img']}>
                      <h3>ТОРТ 4</h3>
                    </div>
                  </Carousel>
                </div>
                <Flex className={css['Products-item-text']} vertical onClick={() => handleOpenDetails(item)}>
                  <div className={css['Products-item-text-price']}>{Utils.priceToRubles(item?.cost)}</div>
                  <Title level={4}>{item?.title}</Title>
                  <Paragraph ellipsis={true}>
                    {item?.description}
                  </Paragraph>
                </Flex>
                <ProductButton
                  productId={item?.id}
                  totalCount={item?.count}
                />
              </Flex>
            )}
          />
        </InfiniteScroll>
      </div>
      <ProductDetails
        open={details.open}
        product={details.product}
        onClose={handleCloseDetails}
      />
    </div>
  );
};

export default Products;