import { Table, Button, CloseButton, ActionIcon } from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { Record } from 'types';
import { useCart } from 'pages/cart/cartContext';
import { recordApi } from 'resources/record';
import ProductRow from 'pages/product/productRow';
import classes from './index.module.css';

const CartTable = (props: { cartArray: Array<Record> | undefined }) => {
  const { cartArray } = props;
  const { removeFromCart } = useCart();
  const {
    mutate: increment,
  } = recordApi.useIncrement();
  const {
    mutate: decrement,
  } = recordApi.useDecrement();

  if (!cartArray) return null;
  const incrementQ = (id:string, quantity:number) => {
    if (quantity < 50) {
      increment({ id, quantity }, {
        onSuccess: (res) => {
          const foundIndex = cartArray.findIndex((record) => record._id === res._id);
          cartArray[foundIndex].quantity = res.quantity;
        },
      });
    }
  };
  const decrementQ = (id:string, quantity:number) => {
    if (quantity > 1) {
      decrement({ id, quantity }, {
        onSuccess: (res) => {
          const foundIndex = cartArray.findIndex((record) => record._id === res._id);
          cartArray[foundIndex].quantity = res.quantity;
        },
      });
    }
  };
  const rows = cartArray.map((record) => {
    if (!record?.product) return <Table.Tr key={record._id} />;
    return (
      <Table.Tr key={record._id}>
        <Table.Td><ProductRow product={record.product} /></Table.Td>
        <Table.Td>
          $
          {record.product.price}
        </Table.Td>
        <Table.Td>
          <div className={classes.counter}>
            <ActionIcon
              size="xs"
              variant="default"
              className={classes.icon}
              onClick={() => decrementQ(record._id, record.quantity)}
            >
              <IconMinus />
            </ActionIcon>
            {record.quantity}
            <ActionIcon
              size="xs"
              variant="default"
              className={classes.icon}
              onClick={() => incrementQ(record._id, record.quantity)}
            >
              <IconPlus />
            </ActionIcon>
          </div>
        </Table.Td>
        <Table.Td>
          <Button
            variant="default"
            size="sm"
            className={classes.rowBut}
            onClick={() => removeFromCart(record._id)}
          >
            <CloseButton className={classes.rowBut} />
            Remove
          </Button>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table>
      <Table.Thead>
        <Table.Tr className={classes.colums}>
          <Table.Th>Item</Table.Th>
          <Table.Th>Unit Price</Table.Th>
          <Table.Th>Quantity</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default CartTable;
