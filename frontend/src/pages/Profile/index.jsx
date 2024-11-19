import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../store/order/actions';
import { selectUser } from '../../store/user/selector';
import css from './Profile.module.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  useEffect(() => {
    user?.id && dispatch(getUserOrders(user?.id));
  }, [user?.id]);

  return (
    <div className={css['Profile']}>Profile</div>
  );
};

export default Profile;
