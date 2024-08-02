import { CloseOutlined } from '@ant-design/icons';
import { Button, Carousel, Drawer, Typography } from 'antd';

const { Title } = Typography;

const ProductDetails = ({ open, product, onClose }) => {
  return (
    <Drawer
      open={open}
      title={product?.title}
      onClose={onClose}
      placement='bottom'
      height='90%'
      closeIcon={false}
      extra={<Button type='text' icon={<CloseOutlined/>} onClick={onClose} />}
    >
      <Carousel></Carousel>
      <Title>{product?.title}</Title>
    </Drawer>
  );
};

export default ProductDetails;