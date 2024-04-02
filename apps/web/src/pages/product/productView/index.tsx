import { Image, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { productApi } from 'resources/product';
import { Product } from 'types';
import noImage from 'public/images/no-photo--lg.png';

import classes from './index.module.css';

const ProductView = (props:{ data:Product, update: ()=>void }) => {
  const {
    mutate: deleteProduct,
  } = productApi.useDeleteProducts();

  const { data, update } = props;

  const onsale = {
    backgroundColor: 'rgb(255, 241, 214)',
    color: 'orange',
  };
  const sold = {
    backgroundColor: 'rgb(214, 255, 230)',
    color: 'rgb(0, 205, 0)',
  };
  const deleteClick = () => {
    deleteProduct(data._id, {
      onSuccess: () => update(),
      onError: (err) => console.log(err),
    });
  };

  return (

    <div className={classes.area}>
      <div className={classes.imageArea}>
        <ActionIcon className={classes.delete} onClick={deleteClick}><IconTrash /></ActionIcon>
        <div className={classes.sale} style={data.isSold ? sold : onsale}>
          <b>{data.isSold ? 'Sold' : 'On sale'}</b>
        </div>
        <Image src={data?.imageUrl ? data.imageUrl : noImage.src} className={classes.image} />
      </div>
      <div className={classes.info}>
        <h3 style={{ margin: 8 }}>{data.title}</h3>
        <div className={classes.priceInfo}>
          <label style={{ opacity: 0.5, fontSize: 14, marginLeft: 8 }}>Price:</label>
          <label style={{ fontSize: 20, marginRight: 10 }}>
            <b>
              $
              {data.price}
            </b>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
