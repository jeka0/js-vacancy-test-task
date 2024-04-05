import { useState, useEffect } from 'react';
import { Image, ActionIcon, Button } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { productApi } from 'resources/product';
import { Product } from 'types';
import noImage from 'public/images/no-photo--lg.png';
import { useCart } from 'pages/cart/cartContext';

import classes from './index.module.css';

const ProductView = (props:{
  data:Product,
  update: ()=>void,
  showControlls:boolean,
  addButton:boolean
}) => {
  const {
    mutate: deleteProduct,
  } = productApi.useDeleteProducts();
  const { addToCart, cartData } = useCart();
  const [inCart, setInCart] = useState<boolean>(false);

  const { data, update, showControlls, addButton } = props;
  useEffect(() => {
    if (cartData && addButton) {
      setInCart(cartData.cartArray.some((item) => item.productId === data._id));
    }
  }, [data, cartData, setInCart, addButton]);

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
        {showControlls
        && (
        <ActionIcon className={classes.delete} onClick={deleteClick}>
          <IconTrash />
        </ActionIcon>
        )}
        {showControlls
        && (
        <div className={classes.sale} style={data.isSold ? sold : onsale}>
          <b>{data.isSold ? 'Sold' : 'On sale'}</b>
        </div>
        )}
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
        {addButton
          ? (
            <Button
              className={classes.addBut}
              disabled={inCart}
              onClick={() => addToCart(data._id)}
            >
              {inCart ? 'In Cart' : 'Add to Cart'}
            </Button>
          ) : null}
      </div>
    </div>
  );
};

export default ProductView;
