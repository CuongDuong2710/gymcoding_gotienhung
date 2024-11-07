'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import useCartService from '@/lib/hooks/useCartStore';
import { VNDFormatter } from '@/lib/utils';

import image_qr_bank from '../../../public/images/bidv_qr_Tin.png'
import image_qr_momo from '../../../public/images/qr_momo_Tin.png'

const Form = () => {
  const router = useRouter();
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
  } = useCartService();

  // mutate data in the backend by calling trigger function
  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async (url) => {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        clear();
        toast.success('Đặt hàng thành công');
        return router.push(`/order/${data.order._id}`);
      } else {
        toast.error(data.message);
      }
    },
  );

  useEffect(() => {
    if (!paymentMethod) {
      return router.push('/payment');
    }
    if (items.length === 0) {
      return router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, router]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>Loading...</>;

  return (
    <div>
      <CheckoutSteps current={4} />

      <div className='my-4 grid md:grid-cols-4 md:gap-5'>
        <div className='overflow-x-auto md:col-span-3'>
          <div className='card bg-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>Địa chỉ giao hàng</h2>
              <p>{shippingAddress.fullName}</p>
              <p>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.phone}
              </p>
              <div>
                <Link className='btn' href='/shipping'>
                  Sửa
                </Link>
              </div>
            </div>
          </div>

          <div className='card mt-4 bg-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>Phương thức thanh toán</h2>
              <p>{paymentMethod}</p>
              <div>
                <Link className='btn' href='/payment'>
                  Sửa
                </Link>
              </div>
            </div>
          </div>

          <div className='card mt-4 bg-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>Danh sách sản phẩm</h2>
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
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className='flex items-center'
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          <span className='px-2'>
                            {item.name}({item.color} {item.size})
                          </span>
                        </Link>
                      </td>
                      <td>
                        <span>{item.qty}</span>
                      </td>
                      <td>{VNDFormatter.format(item.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link className='btn' href='/cart'>
                  Sửa
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className='card bg-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>Tổng đơn hàng</h2>
              <ul className='space-y-3'>
                <li>
                  <div className=' flex justify-between'>
                    <div>Sản phẩm</div>
                    <div>{VNDFormatter.format(itemsPrice)}</div>
                  </div>
                </li>
                <li>
                  <div className=' flex justify-between'>
                    <div>Tổng cộng</div>
                    <div>{VNDFormatter.format(totalPrice)}</div>
                  </div>
                </li>
                <div className="flex items-center justify-center my-4">
                  <div className="border-b border-gray-400 w-full"></div>
                </div>
                {
                  paymentMethod === 'Bank' ? (
                <>
                  <li>
                    <div className=' flex justify-between'>
                      <div>Ngân hàng BIDV</div>
                    </div>
                  </li>
                  <li>
                    <div className=' flex justify-between'>
                      <div>Chủ TK: Dương Đăng Hưng</div>
                    </div>
                  </li>
                  <li>
                    <div className=' flex justify-between'>
                      <div>Số TK : 6150076552</div>
                    </div>
                  </li>
                  <li>
                    <div className=' flex justify-between'>
                      <div>
                        <Image 
                          src={image_qr_bank}
                          alt='image_qr'
                          width={220}
                          height={220}
                        ></Image>
                      </div>
                    </div>
                  </li>
                </>
                  ) : (
                    <>
                    <li>
                      <div className=' flex justify-between'>
                        <div>Momo</div>
                      </div>
                    </li>
                    <li>
                      <div className=' flex justify-between'>
                        <div>Chủ TK: Dương Đăng Hưng</div>
                      </div>
                    </li>
                    <li>
                      <div className=' flex justify-between'>
                        <div>Phone: 0907210127</div>
                      </div>
                    </li>
                    <li>
                      <div className=' flex justify-between'>
                        <div>
                          <Image 
                            src={image_qr_momo}
                            alt='image_qr_momo'
                            width={330}
                            height={330}
                          ></Image>
                        </div>
                      </div>
                    </li>
                  </>
                  )
                }
                <li>
                  <button
                    onClick={() => placeOrder()}
                    disabled={isPlacing}
                    className='btn btn-primary w-full'
                  >
                    {isPlacing && (
                      <span className='loading loading-spinner'></span>
                    )}
                    Đặt hàng
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
