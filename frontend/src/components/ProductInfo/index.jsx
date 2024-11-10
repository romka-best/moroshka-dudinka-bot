import PropTypes from "prop-types"
import { Ellipsis, Image, Popup, Swiper } from 'antd-mobile';
import css from './ProductInfo.module.scss';
import { useMemo } from "react";

const { Item: SwiperItem } = Swiper;

const ProductInfo = ({ product, visible, onClose }) => {
  const swiperImages = useMemo(() => {
    if (Array.isArray(product?.photos) && product?.photos.length > 0) {
      return product.photos.map(photo => (
        <SwiperItem key={photo}>
          <Image src={photo} height='100%' />
        </SwiperItem>
      ));
    } else {
      return (
        <SwiperItem>
          <Image src='/404' height='100%' />
        </SwiperItem>
      )
    }
  }, [product]);

  return (
    <Popup
      visible={visible}
      onClose={onClose}
      closeOnSwipe
      closeOnMaskClick
      position='bottom'
      bodyClassName={css['ProductInfo-body']}
    >
      <Swiper className={css['ProductInfo-swiper']}>
        {swiperImages}
      </Swiper>
      <h2>{product?.title}</h2>
      <Ellipsis
        rows={2}
        content={product?.description}
        expandText='ещё'
        collapseText='свернуть'
      />
    </Popup>
  );
};

ProductInfo.propTypes = {
  onClose: PropTypes.func,
  product: PropTypes.object,
  visible: PropTypes.func
}

export default ProductInfo;
