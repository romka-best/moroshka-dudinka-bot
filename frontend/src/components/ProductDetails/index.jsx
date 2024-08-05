import { CloseOutlined } from '@ant-design/icons';
import { Button, Carousel, Drawer, Typography } from 'antd';
import Utils from '../../Utils';
import css from './ProductDetails.module.scss';

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
        <Button
          className={css['ProductDetails-button']}
          type='primary'
          size='large'
        >
          Добавить в корзину
        </Button>
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