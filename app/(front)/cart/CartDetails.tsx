'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useCartService from '@/lib/hooks/useCartStore';
import { VNDFormatter } from '@/lib/utils';

const CartDetails = () => {
  const { items, itemsPrice, decrease, increase } = useCartService();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, [items, itemsPrice, decrease, increase]);

  if (!mounted) return <>Loading...</>;

  return (
    <div>
      <h1 className='py-4 text-2xl'>Giỏ hàng</h1>
      {items.length === 0 ? (
        <div>
          <p className='mb-2'>Giỏ hàng trống :(</p>
          <Link href='/' className='btn'>
            Mua sắm
          </Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.slug}>
                    <td className='flex items-center'>
                      <Link
                        href={`/product/${item.slug}`}
                        className='flex items-center'
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                      </Link>
                      <span className='px-2'>{item.name}</span>
                    </td>
                    <td>
                      <div>
                        <button
                          className='btn'
                          type='button'
                          onClick={() => decrease(item)}
                        >
                          -
                        </button>
                        <span className='px-2'>{item.qty}</span>
                        <button
                          className='btn'
                          type='button'
                          onClick={() => increase(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{VNDFormatter.format(item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='card' bg-base-300>
            <div className='card-body'>
              <ul>
                <li className='pb-3 text-xl'>
                  Số lượng: {items.reduce((acc, item) => acc + item.qty, 0)}
                  <br />{VNDFormatter.format(itemsPrice)}
                </li>
                <li>
                  <button
                    type='button'
                    className='btn btn-primary w-full'
                    onClick={() => router.push('/shipping')}
                  >
                    Tiến hành đặt hàng
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetails;
