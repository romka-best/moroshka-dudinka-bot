import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import css from './OrderItem.module.scss';
// import { Grid, Image, Steps } from 'antd-mobile';
import { Steps } from 'antd-mobile';

const { Step } = Steps;

const ORDER_STATUSES = ['PLACED', 'CONFIRMED', 'PAID', 'COMPLETED'];

const OrderItem = ({ order }) => {
  // const orderImages = order?.items?.slice(0, 4)?.map?.((item, index) => (
  //   <Image
  //     key={item?.product?.id}
  //     className={css[`OrderItem-card-image-${index}`]}
  //     fit='cover'
  //     height={32}
  //     width={32}
  //     src={item?.product?.photos?.[0] ?? '/404'} 
  //   />
  // ));

  return (
    <div className={css['OrderItem']}>
      {/* <Grid columns={4} gap={4} className={css['OrderItem-card-images']}>
        {orderImages}
      </Grid> */}
      <div>
        <p className={css['OrderItem-title']}>Заказ от {dayjs(order?.created_at).format('LLL')}</p>
        <Steps current={ORDER_STATUSES.indexOf(order?.status)}>
          <Step title='Создан' />
          <Step title='Собран' />
          <Step title='Оплачен' />
          <Step title='Завершен' />
        </Steps>
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