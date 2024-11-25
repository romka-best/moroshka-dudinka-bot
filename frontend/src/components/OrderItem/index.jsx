import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import css from './OrderItem.module.scss';
import { Image } from 'antd-mobile';
import { useMemo } from 'react';
import classNames from 'classnames';
import Utils from '../../Utils';

const ORDER_STATUSES = {
  'PLACED': 'Создан',
  'CONFIRMED': 'Собран',
  'PAID': 'Оплачен',
  'COMPLETED': 'Завершен',
  'CANCELED': 'Отменен'
};

const MAX_SHOWED_IMAGES = 3

const OrderItem = ({ order }) => {
  const orderImages = order?.items?.slice(0, MAX_SHOWED_IMAGES)?.map?.(item => (
    <Image
      key={item?.product?.id}
      className={css['OrderItem-images-item']}
      fit='cover'
      height={64}
      width={64}
      src={item?.product?.photos?.[0] ?? '/404'} 
    />
  ));

  const hasMoreProducts = order?.items?.length > MAX_SHOWED_IMAGES;

  const orderSum = useMemo(() => {
    return order?.items.reduce((total, item) => {
      const itemTotal = item.product.cost * item.count;
      return total + itemTotal;
    }, 0);
  }, [order?.items]);

  return (
    <div className={css['OrderItem']}>
      <div className={css['OrderItem-info']}>
        <div className={css['OrderItem-info-segment-left']}>
          <p className={css['OrderItem-title']}>Заказ</p>
          <p className={css['OrderItem-subtitle']}>от {dayjs(order?.created_at).format('LL')} в {dayjs(order?.created_at).format('H:M')}</p>
        </div>
        <div className={css['OrderItem-info-segment-right']}>
          <p className={css['OrderItem-title']}>{Utils.formatPrice(orderSum)}</p>
          <div className={classNames(css['OrderItem-status'], css[`OrderItem-status-${order?.status}`])}>
            {ORDER_STATUSES[order?.status]}
          </div>
        </div>
      </div>

      <div className={css['OrderItem-images']}>
        {orderImages}
        {hasMoreProducts && (
          <div className={css['OrderItem-images-more']}>
            <p>ещё</p>
            <p>{order?.items?.length - MAX_SHOWED_IMAGES}</p>
          </div>
        )}
      </div>
    </div>
  )
};

OrderItem.propTypes = {
  order: PropTypes.shape({
    created_at: PropTypes.string,
    items: PropTypes.array,
    status: PropTypes.string
  })
};

export default OrderItem;