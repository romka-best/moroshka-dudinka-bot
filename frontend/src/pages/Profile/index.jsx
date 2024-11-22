import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../store/order/actions';
import { selectUser } from '../../store/user/selector';
import css from './Profile.module.scss';
import { selectOrders } from '../../store/order/selector';
import dayjs from 'dayjs';
import { Grid, Image, Steps } from 'antd-mobile';

const { Step } = Steps;

const ORDER_STATUSES = ['PLACED', 'CONFIRMED', 'PAID', 'COMPLETED'];

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { orders } = useSelector(selectOrders);

  useEffect(() => {
    user?.id && dispatch(getUserOrders(user?.id));
  }, [user?.id]);

  const ordersRender = useMemo(() => (
    orders?.map?.(order => {
      const orderImages = order?.items?.slice(0, 4)?.map?.((item, index) => (
        <Image
          key={item?.product?.id}
          className={css[`Profile-order-card-image-${index}`]}
          fit='cover'
          height={32}
          width={32}
          src={item?.product?.photos?.[0] ?? '/404'} 
        />
      ));

      console.log(ORDER_STATUSES.indexOf(order?.status))

      return (
        <div key={order?.id} className={css['Profile-order-card']}>
          <Grid columns={2} gap={4} className={css['Profile-order-card-images']}>
            {orderImages}
          </Grid>
          <div>
            <p>Заказ от {dayjs(order?.created_at).format('LLL')}</p>
            <Steps current={ORDER_STATUSES.indexOf(order?.status)}>
              <Step title='Создан' />
              <Step title='Собран' />
              <Step title='Оплачен' />
              <Step title='Завершен' />
            </Steps>
          </div>
        </div>
      );
    })
  ), [orders]);

  return (
    <div className={css['Profile']}>
      <h1 className={css['Profile-title']}>Профиль</h1>
      {ordersRender}
    </div>
  );
};

export default Profile;
