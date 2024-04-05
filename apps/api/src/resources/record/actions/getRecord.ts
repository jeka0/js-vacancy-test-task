import { productService } from 'resources/product';
import recordService from '../record.service';

export const getRecord = async (recordId:string)=>{
  const record = await recordService.findOne({ _id:recordId });
  record.product = await productService.findOne({ _id:record.productId });
  return record;
};