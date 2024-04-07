import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
  useCallback,
} from 'react';

import { cartApi } from 'resources/cart';
import { recordApi } from 'resources/record';
import { accountApi } from 'resources/account';
import { Cart } from 'types';

type CartContextType = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  addToCart: (productId:string)=>void;
  removeFromCart: (recordId:string)=>void;
  cartData: Cart | undefined;
  updateData:()=>void
};

const cartContextDefaultValues: CartContextType = {
  count: 0,
  setCount: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  cartData: {
    _id: '',
    cart: [],
    history: [],
    userId: '',
    cartArray: [],
    historyArray: [],
  },
  updateData: () => {},
};

const CartContext = createContext<CartContextType>(cartContextDefaultValues);

export function useCart() {
  return useContext(CartContext);
}

type Props = {
  children: ReactNode;
};

export const CartProvider = ({ children }: Props) => {
  const [count, setCount] = useState<number>(0);
  const [cartData, setCartData] = useState<Cart>();
  const { data: account } = accountApi.useGet();
  const {
    mutate: get,
  } = cartApi.useGet();

  const {
    mutate: add,
  } = cartApi.useAddRecord();
  const {
    mutate: removeRecord,
  } = cartApi.useRemoveRecord();
  const {
    mutate: createRecord,
  } = recordApi.useCreate();
  const updateData = useCallback(() => {
    if (account) {
      get({ userId: account?._id }, {
        onSuccess: (res) => {
          setCartData(res);
          setCount(res.cartArray.length);
        },
      });
    }
  }, [account, get]);
  useEffect(() => {
    updateData();
  }, [updateData]);
  const addToCart = useCallback((productId:string) => {
    createRecord({ productId }, {
      onSuccess: (res) => {
        if (account) {
          add({ userId: account?._id, recordId: res._id }, {
            onSuccess: (cart) => {
              setCartData(cart);
              setCount(cart.cartArray.length);
            },
          });
        }
      },
    });
  }, [account, createRecord, add]);

  const removeFromCart = useCallback((recordId:string) => {
    if (account) {
      removeRecord({ userId: account?._id, recordId }, {
        onSuccess: (res) => {
          setCartData(res);
          setCount(res.cartArray.length);
        },
      });
    }
  }, [account, removeRecord]);

  const values = useMemo(() => ({
    count,
    setCount,
    cartData,
    addToCart,
    removeFromCart,
    updateData,
  }), [count,
    setCount,
    cartData,
    addToCart,
    removeFromCart,
    updateData]);

  return (
    <CartContext.Provider value={values}>
      {children}
    </CartContext.Provider>
  );
};
