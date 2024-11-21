import { Button, Input, Popup, TextArea, Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
import css from './CreateOrderPopup.module.scss';
import { useState } from 'react';
import Utils from '../../Utils';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../store/order/actions';
import { selectCart } from '../../store/cart/selector';
import { selectOrders } from '../../store/order/selector';
import { useNavigate } from 'react-router-dom';
import { clearCartState } from '../../store/cart/actions';
import { useIMask } from 'react-imask';

const CreateOrderPopup = ({ visible, onClose, cartSum }) => {
  const dispatch = useDispatch();
  const { cartId: cart_id } = useSelector(selectCart);
  const { loading } = useSelector(selectOrders);
  const navigate = useNavigate();

  const [sendData, setSendData] = useState({
    description: '',
    phone: ''
  });

  const { ref } = useIMask(
    {
      mask: '+{7} (000) 000-0000',
    }
  );

  const handleChangeSendData = (value, name) => {
    setSendData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSuccessCreateOrder = () => {
    Toast.show({
      icon: 'success',
      content: <p className={css['CreateOrderPopup-toast']}>Заказ успешно создан</p>,
      duration: 2500
    });
    dispatch(clearCartState());
    navigate('/profile');
    onClose();
  };

  const onErrorCreateOrder = () => {
    Toast.show({
      icon: 'fail',
      content: <p className={css['CreateOrderPopup-toast']}>Ошибка в оформлении заказа, попробуйте позже</p>,
      duration: 2500
    })
  };

  const handleCreateOrder = () => {
    dispatch(createOrder({ ...sendData, cart_id }, onSuccessCreateOrder, onErrorCreateOrder))
  };

  return (
    <Popup
      visible={visible}
      bodyClassName={css['CreateOrderPopup']}
      onClose={onClose}
      closeOnMaskClick
      closeOnSwipe
    >
      <header className={css['CreateOrderPopup-header']}>
        <div className={css['CreateOrderPopup-header-swipe']}></div>
      </header>

      <main className={css['CreateOrderPopup-main']}>
        <h1 className={css['CreateOrderPopup-title']}>Уточнение деталей</h1>

        <div className={css['CreateOrderPopup-form-container']}>
          <p className={css['CreateOrderPopup-form-label']}>Номер телефона</p>
          <Input
            ref={el => ref.current = el?.nativeElement}
            className={css['CreateOrderPopup-form-input']}
            type='tel'
            placeholder='Введите номер телефона'
            value={sendData.phone}
            onChange={value => handleChangeSendData(value, 'phone')}
          />
        </div>

        <div className={css['CreateOrderPopup-form-container']}>
          <p className={css['CreateOrderPopup-form-label']}>Комментарий</p>
          <TextArea
            className={css['CreateOrderPopup-form-textarea']}
            placeholder='Комментарий к заказу'
            value={sendData.description}
            onChange={value => handleChangeSendData(value, 'description')}
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
        </div>
      </main>

      <footer className={css['CreateOrderPopup-footer']}>
        <div className={css['CreateOrderPopup-footer-sum-wrapper']}>
          <p>Итого:</p>
          <p className={css['CreateOrderPopup-footer-sum']}>
            {Utils.formatPrice(cartSum)}
          </p>
        </div>
        <Button
          onClick={handleCreateOrder}
          block
          disabled={sendData.phone.length !== 17}
          color='primary'
          loading={loading}
        >
          {sendData.phone.length === 17 ? 'Заказать' : 'Введите номер телефона'}
        </Button>
      </footer>
    </Popup>
  );
};

CreateOrderPopup.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  cartSum: PropTypes.number,
};

export default CreateOrderPopup;
