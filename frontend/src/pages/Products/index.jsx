import { Input, List, Typography } from 'antd';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/products/productsSlice';
import { SearchOutlined } from '@ant-design/icons';
import _ from 'lodash';

const { Title } = Typography;

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getProducts({}));
  }, []);

  const onSearchProduct = (title) => {
    dispatch(getProducts({ title: title.target.value }))
  };

  const getProductsDebounced = useCallback(_.debounce(onSearchProduct, 1000), []);

  return (
    <div>
      <Title>Каталог</Title>
      <Input
        placeholder='Поиск по товарам'
        prefix={<SearchOutlined />}
        onChange={getProductsDebounced}
        size='large'
      />
      <List
        dataSource={products}
        // renderItem={}
      />
    </div>
  );
};

export default Products;