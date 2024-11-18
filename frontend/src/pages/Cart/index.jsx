import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartById, editCartItem, getCartById } from '../../store/cart/actions';
import css from './Cart.module.scss';
import { Button, Dialog, Ellipsis, ErrorBlock, Image, List, SpinLoading, Stepper, SwipeAction } from 'antd-mobile';
import { selectCart } from '../../store/cart/selector';
import Utils from '../../Utils';
import { DeleteOutline } from 'antd-mobile-icons';
import { Player } from '@lordicon/react';
import EmptyCart from '../../assets/emptyCart.json';
import { useNavigate } from 'react-router-dom';
import ProductInfo from '../../components/ProductInfo';

const { Item: ListItem } = List;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, cartId } = useSelector(selectCart);
  const [infoVisible, setInfoVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  // Иконка
  const emptyIconRef = useRef(null);

  const isCartEmpty = useMemo(() => Array.isArray(cart) && cart.length === 0, [cart]);

  useEffect(() => {
    dispatch(getCartById(cartId));
  }, []);

  useEffect(() => {
    isCartEmpty && emptyIconRef?.current?.playFromBeginning();
  }, [cart, loading]);

  const handleDeleteCart = () => {
    Dialog.show({
      content: 'Вы уверенны, что хотите очистить корзину?',
      closeOnAction: true,
      closeOnMaskClick: true,
      actions: [
        [
          {
            key: 'cancel',
            text: 'Отмена',
          },
          {
            key: 'delete',
            text: 'Удалить',
            bold: true,
            danger: true,
            onClick: async () => dispatch(deleteCartById(cartId)),
          },
        ],
      ],
    });
  };

  const handleDeleteCartItem = productId => dispatch(editCartItem(cartId, productId, 0));

  const handleChangeCount = Utils.debounce((productId, count) => {
    dispatch(editCartItem(cartId, productId, count));
  }, 300);

  const handleChangeInfoVisible = () => setInfoVisible(!infoVisible);

  const onClickProduct = product => {
    setCurrentProduct(product);
    handleChangeInfoVisible();
  }

  const renderCartItems = useMemo(() => {
    if (!isCartEmpty) {
      return cart.map(item => (
        <SwipeAction
          key={item?.product?.id}
          rightActions={[
            {
              key: 'delete',
              text: 'Удалить',
              color: 'danger',
              onClick: () => handleDeleteCartItem(item?.product?.id)
            }
          ]}
        >
          <ListItem
            prefix={
              <Image
                className={css['Cart-product-image']}
                src={item?.product?.photos?.[0] ?? '/404'}
                fit='cover'
                width={64}
                height={64}
                onClick={() => onClickProduct(item?.product)}
              />
            }
            extra={
              <Stepper
                min={0}
                max={item?.product?.count}
                defaultValue={item?.count}
                onChange={(count) => handleChangeCount(item?.product?.id, count)}
                inputReadOnly
              />
            }
          >
            <div onClick={() => onClickProduct(item?.product)}>
              <Ellipsis content={item?.product?.title} rows={1} />
              <div className={css['Cart-product-info']}>
                <p>{Utils.formatPrice(item?.product?.cost * item?.count)}</p>
                {!!item?.product?.weight && <p>{Utils.getWeight(item?.product?.weight * item?.count)}</p>}
              </div>
            </div>
          </ListItem>
        </SwipeAction>
      ));
    } else {
      return <></>;
    }
  }, [cart, isCartEmpty]);

  const cartSum = useMemo(() => {
    return cart.reduce((total, item) => {
      const itemTotal = item.product.cost * item.count;
      return total + itemTotal;
    }, 0);
  }, [cart]);

  return (
    <div className={css['Cart']}>
      <div className={css['Cart-header']}>
        <h1 className={css['Cart-title']}>Корзина</h1>
        {!isCartEmpty && (
          <Button color='danger' fill='none' onClick={handleDeleteCart}>
            <DeleteOutline />
          </Button>
        )}
      </div>

      {loading
        ? (
          <div className={css['Cart-main-loading']}>
            <SpinLoading className='' />
          </div>
        )
        : (
          <main className={css['Cart-main']}>
            <ProductInfo product={currentProduct} visible={infoVisible} onClose={handleChangeInfoVisible} />

            {(Array.isArray(cart) && cart.length > 0)
              ? (
                <>
                  <List className={css['Cart-main-list']}>
                    {renderCartItems}
                  </List>
                  <footer className={css['Cart-footer']}>
                    <div className={css['Cart-footer-sum-wrapper']}>
                      <p>Итого:</p>
                      <p className={css['Cart-footer-sum']}>
                        {Utils.formatPrice(cartSum)}
                      </p>
                    </div>
                    <Button block color='primary'>Оформить заказ</Button>
                  </footer>
                </>
              )
              : (
                <div className={css['Cart-empty-wrapper']}>
                  <ErrorBlock
                    className={css['Cart-empty']}
                    status='empty'
                    description='Видимо Ваша корзина пуста'
                    image={
                      <div className={css['Cart-empty-icon']}>
                        <Player icon={EmptyCart} ref={emptyIconRef} size={160} />
                      </div>
                    }
                  >
                    <Button onClick={() => navigate('/catalog')} color='primary'>Перейти в каталог</Button>
                  </ErrorBlock>
                </div>
              )
            }
          </main>
        )
      }
    </div>
  );
};

export default Cart;
