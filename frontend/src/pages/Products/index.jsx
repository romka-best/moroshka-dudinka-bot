import { Input, List, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/products/productsSlice';
import { SearchOutlined } from '@ant-design/icons';

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

  return (
    <div>
      <Title>Каталог</Title>
      <Input
        placeholder='Поиск по товарам'
        prefix={<SearchOutlined />}
        onChange={onSearchProduct}
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