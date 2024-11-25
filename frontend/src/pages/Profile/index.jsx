import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../store/order/actions';
import { selectUser } from '../../store/user/selector';
import css from './Profile.module.scss';
import { selectOrders } from '../../store/order/selector';
import OrderItem from '../../components/OrderItem';
import { Button, ErrorBlock, SpinLoading } from 'antd-mobile';
import { Player } from '@lordicon/react';
import { useNavigate } from 'react-router-dom';
import EmptyProfile from '../../assets/emptyProfile.json';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading: userLoading } = useSelector(selectUser);
  const { orders, loading } = useSelector(selectOrders);
  const navigate = useNavigate();

  // Иконка
  const emptyIconRef = useRef(null);

  useEffect(() => {
    user?.id && dispatch(getUserOrders(user?.id));
  }, [user?.id]);

  const hasOrders = !!orders?.length;

  const ordersRender = useMemo(() => (
    orders?.map?.(order => <OrderItem key={order?.id} order={order} />)
  ), [orders]);

  useEffect(() => {
    hasOrders && emptyIconRef?.current?.playFromBeginning();
  }, [orders]);

  return (
    <div className={css['Profile']}>
      <h1 className={css['Profile-title']}>Профиль</h1>
      {(loading || userLoading)
        ? (
          <div className={css['Profile-loading']}>
            <SpinLoading className='' />
          </div>
        )
        : (
          <div>
            {hasOrders
              ? ordersRender
              : (
                <div className={css['Profile-empty-wrapper']}>
                  <ErrorBlock
                    className={css['Profile-empty']}
                    status='empty'
                    description='Вы ещё не делали заказов'
                    image={
                      <div className={css['Profile-empty-icon']}>
                        <Player icon={EmptyProfile} ref={emptyIconRef} size={160} />
                      </div>
                    }
                  >
                    <Button onClick={() => navigate('/catalog')} color='primary'>Перейти в каталог</Button>
                  </ErrorBlock>
                </div>
              )
            }
          </div>
        )
      }
    </div>
  );
};

export default Profile;
