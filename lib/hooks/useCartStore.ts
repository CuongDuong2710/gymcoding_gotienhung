import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { OrderItem, ShippingAddress } from '../models/OrderModel';
import { round2 } from '../utils';

type Cart = {
  items: OrderItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;

  paymentMethod: string;
  shippingAddress: ShippingAddress;
};

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  paymentMethod: 'Bank',
  shippingAddress: {
    fullName: '',
    address: '',
    city: '',
    phone: '',
  },
};

export const cartStore = create<Cart>()(
  persist(() => initialState, {
    name: 'cartStore',
  }),
);

const useCartService = () => {
  const {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
  } = cartStore();

  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
    increase: (item: OrderItem) => {
      const exist = items.find((x) => x.slug === item.slug);

      const updatedCartItems = exist
        ? items.map((x) =>
            x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x,
          )
        : [...items, { ...item, qty: 1 }];

      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems);
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
    decrease: (item: OrderItem) => {
      const exist = items.find((x) => x.slug === item.slug);
      if (!exist) return;

      const updatedCartItems =
        exist.qty === 1
          ? items.filter((x) => x.slug !== item.slug)
          : items.map((x) =>
              x.slug === item.slug ? { ...exist, qty: exist.qty - 1 } : x,
            );

      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems);
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
    saveShippingAddress: (shippingAddress: ShippingAddress) => {
      cartStore.setState({
        shippingAddress,
      });
    },
    savePaymentMethod: (paymentMethod: string) => {
      cartStore.setState({
        paymentMethod,
      });
    },
    clear: () => {
      cartStore.setState({
        items: [],
      });
    },
    init: () => cartStore.setState(initialState),
  };
};

export default useCartService;

export const calcPrice = (items: OrderItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + item.price * item.qty, 0),
    ),
    shippingPrice = 0, //round2(itemsPrice > 100 ? 0 : 100),
    taxPrice = 0, // round2(Number(0.15 * itemsPrice)),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};
