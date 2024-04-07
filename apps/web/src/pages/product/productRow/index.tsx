import { Image, Title } from '@mantine/core';
import { Product } from 'types';

import classes from './index.module.css';

const ProductRow = (props:{ product:Product }) => {
  const { product } = props;
  return (
    <div className={classes.row}>
      <Image src={product?.imageUrl ? product.imageUrl : '/images/no-photo--lg.png'} className={classes.image} />
      <Title className={classes.title} order={5}>{product.title}</Title>
    </div>
  );
};

export default ProductRow;
