'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { User } from '@/lib/models/UserModel';
import { formatId } from '@/lib/utils';

export default function Users() {
  const { data: users, error } = useSWR(`/api/admin/users`);
  const { trigger: deleteUser } = useSWRMutation(
    `/api/admin/users`,
    async (url, { arg }: { arg: { userId: string } }) => {
      const toastId = toast.loading('Deleting user...');
      const res = await fetch(`${url}/${arg.userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.clone().json();
      res.ok
        ? toast.success('Xoá user thành công', {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          });
    },
  );
  if (error) return 'An error has occurred.';
  if (!users) return 'Loading...';

  return (
    <div>
      <h1 className='py-4 text-2xl'>Users</h1>

      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th>id</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user?._id}>
                <td>{formatId(user?._id)}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.isAdmin ? 'YES' : 'NO'}</td>

                <td>
                  <Link
                    href={`/admin/users/${user?._id}`}
                    type='button'
                    className='btn btn-ghost btn-sm'
                  >
                    Sửa
                  </Link>
                  &nbsp;
                  <button
                    onClick={() => deleteUser({ userId: user?._id })}
                    type='button'
                    className='btn btn-ghost btn-sm'
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
