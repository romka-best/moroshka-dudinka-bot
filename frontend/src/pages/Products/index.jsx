import { List, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/products/productsSlice';

const { Title } = Typography;

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getProducts({}));
  }, []);

  return (
    <div>
      <Title level={2}>Продукты</Title>
      <List>
        
      </List>
    </div>
  );
};

export default Products;