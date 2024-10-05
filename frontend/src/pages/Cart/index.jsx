import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, List, Modal, Typography, InputNumber, Flex } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { clearCart } from '../../store/cart/cartSlice'; // Assuming these actions exist in your slice

const { Title, Text, Paragraph } = Typography;

const Cart = () => {
  const dispatch = useDispatch();
  const [modal, contextHolder] = Modal.useModal();
  const { user } = useSelector(state => state.user);
  const { cart } = useSelector(state => state.cart);

  const onClearCart = () => {
    modal.confirm({
      title: 'Вы действительно хотите очистить корзину?',
      content: 'Все добавленные товары удалятся',
      onOk: () => dispatch(clearCart(user?.cart?.id)),
    });
  };

  const onRemoveItem = (productId) => {
    // dispatch(removeFromCart(productId));
  };

  const onUpdateItemCount = (productId, newCount) => {
    // dispatch(updateItemCount({ productId, count: newCount }));
  };

  const getTotalCost = () => {
    return 0
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
      <List
        dataSource={cart}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => onRemoveItem(item.product.id)}
              />,
            ]}
          >
            <List.Item.Meta
              title={item.product.title}
              description={
                <Paragraph ellipsis={{ rows: 2 }}>
                  {item.product.description || 'Описание продукта отсутствует'}
                </Paragraph>
              }
            />
            <div>
              <Text strong>{`Цена: ${item.product.cost} руб.`}</Text>
              <br />
              <Text>{`Количество: `}</Text>
              <InputNumber
                min={1}
                max={item.product.count}
                defaultValue={item.count}
                onChange={(value) => onUpdateItemCount(item.product.id, value)}
              />
              <br />
              <Text strong>{`Всего: ${item.count * item.product.cost} руб.`}</Text>
            </div>
          </List.Item>
        )}
      />
      <Divider />
      <Title level={3}>{`Общая стоимость: ${getTotalCost()} руб.`}</Title>
    </div>
  );
};

export default Cart;