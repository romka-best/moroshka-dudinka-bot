import { useNavigate } from 'react-router-dom';
import css from './CategoryItem.module.scss';
import PropTypes from 'prop-types';

const CategoryItem = ({ category }) => {
  const navigate = useNavigate();

  const handleRedirectCategory = () => {
    navigate(`/category/${category?.id}/${category?.name}`);
  };

  return (
    <div className={css['CategoryItem']} onClick={handleRedirectCategory}>
      {category?.name}
    </div>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  })
};

export default CategoryItem;
