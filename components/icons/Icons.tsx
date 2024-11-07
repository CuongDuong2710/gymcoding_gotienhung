import { Truck, Wallet, LockKeyhole, Phone } from 'lucide-react';

const Icons = () => {
  return (
    <div className='grid grid-cols-2 gap-6 gap-x-2 md:gap-x-6 lg:grid-cols-4'>
      <div className='flex flex-col justify-center gap-4 bg-base-300 px-4 py-8 md:px-12'>
        <Truck width={48} height={48} strokeWidth={1} />
        <div className='flex flex-col gap-2'>
          <p>
            <strong>Giao hàng nhanh</strong>
          </p>
          <p>Nhanh chóng an toàn</p>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4 bg-base-300 px-4 py-8 md:px-12'>
        <Wallet width={48} height={48} strokeWidth={1} />
        <div className='flex flex-col gap-2'>
          <p>
            <strong>Thanh toán tiện lợi</strong>
          </p>
          <p>Chuyển khoản Ngân hàng & Momo</p>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4 bg-base-300 px-4 py-8 md:px-12'>
        <LockKeyhole width={48} height={48} strokeWidth={1} />
        <div className='flex flex-col gap-2'>
          <p>
            <strong>Chất lượng nhập khẩu</strong>
          </p>
          <p>Gỗ cao cấp nhập khẩu</p>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4 bg-base-300 px-4 py-8 md:px-12'>
        <Phone width={48} height={48} strokeWidth={1} />
        <div className='flex flex-col gap-2'>
          <p>
            <strong>Hotline: 0777.777.085</strong> hoặc
          </p>
          <p><strong>0907.210.127</strong> (Dương Hưng)</p>
        </div>
      </div>
    </div>
  );
};

export default Icons;
