import { Carousel, Drawer, Typography } from 'antd';

const { Title } = Typography;

const ProductDetails = ({ open, product, onClose }) => {
  return (
    <Drawer
      open={open}
      title={product?.title}
      onClose={onClose}
      placement='bottom'
      height='90%'
    >
      <Carousel></Carousel>
      <Title>{product?.title}</Title>
    </Drawer>
  );
};

export default ProductDetails;