import PropTypes from 'prop-types';
import css from './ProductItem.module.scss';
import { Ellipsis, Image } from 'antd-mobile';
import Utils from '../../Utils';

const ProductItem = ({ product, onClick }) => {
  return (
    <div className={css['ProductItem']} onClick={onClick}>
      <div className={css['ProductItem-wrapper']}>
        <Image className={css['ProductItem-image']} src={product?.photos?.[0] ?? '/404'} fit='cover' />
        <div className={css['ProductItem-text']}>
          <h3 className={css['ProductItem-text-cost']}>{Utils.formatPrice(product?.cost)}</h3>
          <Ellipsis rows={2} content={product?.title} className={css['ProductItem-text-title']} />
          <p className={css['ProductItem-text-weight']}>{Utils.getWeight(product?.weight)}</p>
        </div>
      </div>
      {/* ЗДЕСЬ КНОПКА */}
    </div>
  );
};

ProductItem.propTypes = {
  onClick: PropTypes.func,
  product: PropTypes.shape({
    photos: PropTypes.array,
    title: PropTypes.string,
    cost: PropTypes.number,
    weight: PropTypes.number,
  })
};

export default ProductItem;
