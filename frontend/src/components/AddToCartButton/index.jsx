import { useMemo } from 'react';
import { Button, Stepper } from 'antd-mobile';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../store/cart/selector';
import { editCartItem, editCartItemCount } from '../../store/cart/actions';
import useDebounce from '../../hooks/ui/useDebounce';
import css from './AddToCartButton.module.scss';
import classNames from 'classnames';

const AddToCartButton = ({ product, size = 'middle' }) => {
  const dispatch = useDispatch();
  const { cart, cartId } = useSelector(selectCart);

  const cartItem = cart.find(item => item.product.id === product.id);

  const [debouncedEditCartItem, debouncedEditCartItemCancel] = useDebounce(count => {
    dispatch(editCartItem(cartId, product?.id, count));
  }, 600);

  const handleAddToCart = () => {
    dispatch(editCartItemCount(1, product?.id));
    dispatch(editCartItem(cartId, product?.id, 1))
  };

  const handleChangeStepper = count => {
    dispatch(editCartItemCount(count, product?.id));

    if (count !== 0) {
      debouncedEditCartItem(count);
    } else {
      debouncedEditCartItemCancel();
      dispatch(editCartItem(cartId, product?.id, count));
    }
  };

  const renderButton = useMemo(() => {
    switch (true) {
      case product.count === 0:
        return (
          <Button
            className={
              classNames(
                css['AddToCartButton-button'],
                css[`AddToCartButton-button-${size}`],
              )
            }
            disabled
            color='primary'
            size={size}
          >
            Нет в наличии
          </Button>
        );

      case Boolean(cartItem):
        return (
          <Stepper
            className={
              classNames(
                css['AddToCartButton-stepper'],
                css[`AddToCartButton-stepper-${size}`],
              )
            }
            min={0}
            max={product.count}
            value={cartItem.count}
            inputReadOnly
            onChange={handleChangeStepper}
          />
        );

      default:
        return (
          <Button
            className={
              classNames(
                css['AddToCartButton-button'],
                css[`AddToCartButton-button-${size}`],
              )
            }
            color='primary'
            size={size}
            onClick={handleAddToCart}
          >
            В корзину
          </Button>
        );
    }
  }, [product.count, cartItem, debouncedEditCartItem, cart, cartItem]);

  return renderButton;
};

export default AddToCartButton;