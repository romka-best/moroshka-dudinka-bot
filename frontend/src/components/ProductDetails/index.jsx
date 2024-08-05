import { CloseOutlined } from '@ant-design/icons';
import { Button, Carousel, Drawer, Typography } from 'antd';
import Utils from '../../Utils';
import css from './ProductDetails.module.scss';
import ProductButton from '../ProductButton';

const { Title, Paragraph } = Typography;

const ProductDetails = ({ open, product, onClose }) => {
  return (
    <Drawer
      open={open}
      title={product?.title}
      onClose={onClose}
      placement='bottom'
      height='90%'
      closeIcon={false}
      extra={
        <Button
          className={css['ProductDetails-close']}
          type='text'
          icon={<CloseOutlined/>}
          onClick={onClose}
        />
      }
      footer={
        <ProductButton
          productId={product?.id}
          totalCount={product?.count}
        />
      }
    >
      <Carousel></Carousel>
      {product?.cost && <p className={css['ProductDetails-price']}>{Utils.priceToRubles(product?.cost)}</p>}
      <Title level={2}>{product?.title}</Title>
      {product?.description && <Paragraph>{product?.description}</Paragraph>}
      {product?.composition && <Paragraph>Состав: {product?.composition}</Paragraph>}
    </Drawer>
  );
};

export default ProductDetails;