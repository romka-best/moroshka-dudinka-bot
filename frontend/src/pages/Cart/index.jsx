import { DeleteOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../store/cart/cartSlice';

const { Title } = Typography;

const Cart = () => {
  const dispatch = useDispatch();
  const [modal, contextHolder] = Modal.useModal();
  const { user } = useSelector(state => state.user);

  const onClearCart = () => {
    modal.confirm({
      title: 'Вы действительно хотите очистить корзину?',
      content: 'Все добавленные товары удалятся',
      onOk: () => dispatch(clearCart(user?.cart?.id)),
    });
  };

  return (
    <div>
      {contextHolder}
      <Flex justify='space-between' align='center'>
        <Title>Корзина</Title>
        <Button
          type='text'
          danger
          icon={<DeleteOutlined />}
          onClick={onClearCart}
          size='large'
        />
      </Flex>
    </div>
  );
};

export default Cart;