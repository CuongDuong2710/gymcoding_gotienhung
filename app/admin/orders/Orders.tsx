'use client';

import Link from 'next/link';
import useSWR from 'swr';

import { Order } from '@/lib/models/OrderModel';
import { VNDFormatter } from '@/lib/utils';

export default function Orders() {
  const { data: orders, error, isLoading } = useSWR(`/api/admin/orders`);

  if (error) return 'An error has occurred.';
  if (isLoading) return 'Loading...';

  return (
    <div>
      <h1 className='py-4 text-2xl'>Đơn hàng</h1>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Khách hàng</th>
              <th>Ngày</th>
              <th>Tổng cộng</th>
              <th>Thanh toán</th>
              <th>Giao hàng</th>
              <th>Xem chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order._id}>
                <td>..{order._id.substring(20, 24)}</td>
                <td>{order.user?.name || 'Deleted user'}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{VNDFormatter.format(order.totalPrice)}</td>
                <td>
                  {order.isPaid && order.paidAt
                    ? `${order.paidAt.substring(0, 10)}`
                    : 'Chưa thanh toán'}
                </td>
                <td>
                  {order.isDelivered && order.deliveredAt
                    ? `${order.deliveredAt.substring(0, 10)}`
                    : 'Chưa giao hàng'}
                </td>
                <td>
                  <Link href={`/order/${order._id}`} passHref>
                    Chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
