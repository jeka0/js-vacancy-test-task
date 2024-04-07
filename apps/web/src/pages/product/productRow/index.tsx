import { Image, Title } from '@mantine/core';
import { Product } from 'types';
import noImage from 'public/images/no-photo--lg.png';

import classes from './index.module.css';

const ProductRow = (props:{ product:Product }) => {
  const { product } = props;
  return (
    <div className={classes.row}>
      <Image src={product?.imageUrl ? product.imageUrl : noImage.src} className={classes.image} />
      <Title className={classes.title} order={5}>{product.title}</Title>
    </div>
  );
};

export default ProductRow;
