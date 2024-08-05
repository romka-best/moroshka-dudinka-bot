import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import css from './ProductButton.module.scss';
import { editCart } from '../../store/cart/cartSlice';
import { find } from 'lodash';
import { useMemo } from 'react';

const ProductButton = ({ productId, totalCount }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartId, cart } = useSelector(state => state.cart);

  const productInCart = find(cart, obj => obj?.product?.id === productId);

  const onCartAdd = () => {
    dispatch(editCart({ cartId, count: 1, productId }));
  };
  
  const onCartEdit = (action) => {
    switch (action) {
      case 'plus':
        dispatch(editCart({ cartId, count: productInCart?.count + 1, productId }));
        break;
    
      case 'minus':
        dispatch(editCart({ cartId, count: productInCart?.count - 1, productId }));
        break;
    
      default:
        break;
    };
  };

  const buttons = useMemo(() => {
    switch (true) {
      case (productInCart?.count === 0 && !!totalCount):
        return <Button onClick={onCartAdd} className={css['ProductButton']} type='primary' size='large'>Добавить в корзину</Button>
  
      case (!totalCount):
        return <Button className={css['ProductButton']} type='primary' disabled size='large'>Нет в наличии</Button>
  
      case (!!productInCart?.count):
        return (
          <Flex gap={10}>
            <Button type='primary' size='large' onClick={() => onCartEdit('minus')} icon={<MinusOutlined />} />
            <Button className={css['ProductButton-centered']} type='primary' size='large' onClick={() => navigate('/cart')}>В корзине{productInCart?.count > 1 && `: ${productInCart?.count}`}</Button>
            <Button disabled={productInCart?.count >= totalCount} type='primary' size='large' onClick={() => onCartEdit('plus')} icon={<PlusOutlined />} />
          </Flex>
        )
      default:
        break;
    }
  }, [productInCart]);

  return buttons
};

export default ProductButton;