import { Button, Carousel, Flex, Input, List, Skeleton, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/products/productsSlice';
import { SearchOutlined } from '@ant-design/icons';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import css from './Products.module.scss';

const tg = window.Telegram.WebApp;

const { Title, Paragraph } = Typography;

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, pages, page, size, total } = useSelector(state => state.products);
  const [search, setSearch] = useState('');

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

  const onAddCart = () => {
    tg.HapticFeedback.impactOccurred('medium');
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
        <InfiniteScroll
          dataLength={total}
          next={loadMoreData}
          hasMore={pages >= page}
          loader={loading && <Skeleton title={false} paragraph={{ rows: 4 }} active />}
          // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={products}
            renderItem={(item) => (
              <Flex key={item?.id} className={css['Products-item']} vertical>
                <Carousel onSwipe={e => e.preventDefault()}>
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
                <Title level={4}>{item?.title}</Title>
                <Paragraph ellipsis={true}>
                  {item?.description}
                </Paragraph>
                <Button
                  type='primary'
                  size='large'
                  onClick={onAddCart}
                >
                  В корзину
                </Button>
              </Flex>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Products;