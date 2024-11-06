import AdminLayout from '@/components/admin/AdminLayout';

import Dashboard from './Dashboard';

export const metadata = {
  title: 'Tổng quan Admin',
};
const DashbaordPage = () => {
  return (
    <AdminLayout activeItem='dashboard'>
      <Dashboard />
    </AdminLayout>
  );
};

export default DashbaordPage;
