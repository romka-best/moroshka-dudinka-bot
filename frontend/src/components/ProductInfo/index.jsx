import PropTypes from 'prop-types';
import { Button, Collapse, Ellipsis, Image, ImageViewer, Popup, Swiper } from 'antd-mobile';
import css from './ProductInfo.module.scss';
import React, { useEffect, useMemo, useRef } from 'react';
import Utils from '../../Utils';

const { Item: SwiperItem } = Swiper;
const { Panel: CollapsePanel } = Collapse;

const ProductInfo = ({ product, visible, onClose }) => {
  const swiperRef = useRef(null);

  const previewImage = (index) => {
    ImageViewer.Multi.show({
      images: product.photos,
      defaultIndex: index,
    })
  };

  const swiperImages = useMemo(() => {
    if (Array.isArray(product?.photos) && product?.photos.length > 0) {
      return product.photos.map((photo, index) => (
        <SwiperItem key={photo} onClick={() => previewImage(index)}>
          <Image src={photo} height='100%' fit='cover' />
        </SwiperItem>
      ));
    } else {
      return (
        <SwiperItem>
          <Image src='/404' height='100%' fit='cover' />
        </SwiperItem>
      )
    }
  }, [product]);

  useEffect(() => {
    !visible && swiperRef?.current?.swipeTo(0);
  }, [visible]);

  const isHasIndicator = useMemo(() => Array.isArray(product?.photos) && product?.photos?.length > 1, [product?.photos]);

  return (
    <>
      <Popup
        visible={visible}
        onClose={onClose}
        closeOnSwipe
        closeOnMaskClick
        position='bottom'
        bodyClassName={css['ProductInfo-body']}
      >
        <React.Fragment key={product?.id}>
          <header className={css['ProductInfo-header']}>
            <div className={css['ProductInfo-header-swipe']}></div>
          </header>

          <main className={css['ProductInfo-main']}>
            <Swiper className={css['ProductInfo-swiper']} ref={swiperRef} indicator={isHasIndicator}>
              {swiperImages}
            </Swiper>

            <div className={css['ProductInfo-main-text']}>
              <h2 className={css['ProductInfo-title']}>
                {product?.title}
              </h2>
              <h3 className={css['ProductInfo-weight']}>{Utils.getWeight(product?.weight)}</h3>
            </div>

            {product?.description &&
              <>
                <h4 className={css['ProductInfo-subtitle']}>Описание:</h4>
                <Ellipsis
                  key={product?.id}
                  className={css['ProductInfo-description']}
                  rows={2}
                  content={product?.description}
                  expandText='ЕЩЁ'
                />
              </>
            }

            {(product?.composition || product?.count) &&
              <Collapse key={product?.id}>
                <CollapsePanel key='description' title='Подробнее о товаре'>
                  {product?.composition &&
                    <>
                      <h4 className={css['ProductInfo-subtitle']}>Состав:</h4>
                      <Ellipsis
                        className={css['ProductInfo-description']}
                        rows={2}
                        content={product?.composition}
                        expandText='ЕЩЁ'
                      />
                    </>}
                  <h4 className={css['ProductInfo-subtitle']}>Количество:</h4>
                  <p>{product?.count ?? 0}</p>
                </CollapsePanel>
              </Collapse>
            }
          </main>

          <footer className={css['ProductInfo-footer']}>
            <h3 className={css['ProductInfo-footer-cost']}>
              {Utils.formatPrice(product?.cost)}
            </h3>
            <Button color='primary'>
              В корзину
            </Button>
          </footer>
        </React.Fragment>
      </Popup>
    </>
  );
};

ProductInfo.propTypes = {
  onClose: PropTypes.func,
  product: PropTypes.object,
  visible: PropTypes.bool,
}

export default ProductInfo;
