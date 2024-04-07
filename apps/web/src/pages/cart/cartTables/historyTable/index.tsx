import { Table } from '@mantine/core';
import { Record } from 'types';
import ProductRow from 'pages/product/productRow';
import classes from './index.module.css';

const HistoryTable = (props: { historyArray: Array<Record> }) => {
  const { historyArray } = props;

  const dateFormat = (date:string | undefined | null) => {
    if (date) {
      const d = date.toString().split('T')[0].split('-');
      return `${d[2]}.
          ${d[1]}.
          ${d[0].slice(-2)}`;
    }
    return '';
  };

  if (!historyArray) return null;
  const rows = historyArray.map((record) => {
    if (!record?.product) return <Table.Tr key={record._id} />;
    return (
      <Table.Tr key={record._id}>
        <Table.Td><ProductRow product={record.product} /></Table.Td>
        <Table.Td>
          $
          {record.product.price}
        </Table.Td>
        <Table.Td>
          {dateFormat(record?.date)}
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
          <Table.Th>Date</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default HistoryTable;
