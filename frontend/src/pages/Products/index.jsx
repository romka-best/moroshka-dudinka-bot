import { Carousel, Flex, Input, List, Skeleton, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/products/productsSlice';
import { SearchOutlined } from '@ant-design/icons';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import css from './Products.module.scss';

const { Title } = Typography;

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, pages, page, size, total } = useSelector(state => state.products);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getProducts({}));
  }, []);

  const onSearchProduct = (title) => {
    setSearch(title.target.value);
    dispatch(getProducts({ title: title.target.value }));
  };

  const getProductsDebounced = useCallback(_.debounce(onSearchProduct, 1000), []);

  const loadMoreData = () => {
    if (loading) return

    dispatch(getProducts({ title: search, page: page + 1 }));
  };

  return (
    <div>
      <Title>Каталог</Title>
      <Input
        placeholder='Поиск по товарам'
        suffix={<SearchOutlined />}
        onChange={getProductsDebounced}
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
                <Carousel>
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
                <Title level={5}>{item?.title}</Title>
              </Flex>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Products;