import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../store/order/actions';
import { selectUser } from '../../store/user/selector';
import css from './Profile.module.scss';
import { selectOrders } from '../../store/order/selector';
import OrderItem from '../../components/OrderItem';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { orders } = useSelector(selectOrders);

  useEffect(() => {
    user?.id && dispatch(getUserOrders(user?.id));
  }, [user?.id]);

  const ordersRender = useMemo(() => (
    orders?.map?.(order => <OrderItem key={order?.id} order={order} />)
  ), [orders]);

  return (
    <div className={css['Profile']}>
      <h1 className={css['Profile-title']}>Профиль</h1>
      {user?.cart?.id}
      {ordersRender}
    </div>
  );
};

export default Profile;
