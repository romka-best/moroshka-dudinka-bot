import PropTypes from "prop-types"
import css from './ProductItem.module.scss';

const ProductItem = ({ product, onClick }) => {
  
  return (
    <div className={css['ProductItem']} onClick={onClick}>
      {product?.title}
    </div>
  );
};

ProductItem.propTypes = {
  onClick: PropTypes.func,
  product: PropTypes.shape({
    photos: PropTypes.array,
    title: PropTypes.string,
  })
}

export default ProductItem;
