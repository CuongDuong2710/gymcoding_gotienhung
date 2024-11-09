import { Metadata } from 'next';
import { Suspense } from 'react';

import Carousel, { CarouselSkeleton } from '@/components/carousel/carousel';
import Categories from '@/components/categories/Categories';
import Icons from '@/components/icons/Icons';
import ProductItems, {
  ProductItemsSkeleton,
} from '@/components/products/ProductItems';
import ReadMore from '@/components/readMore/ReadMore';
import Text from '@/components/readMore/Text';
import Slider from '@/components/slider/Slider';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description:
    process.env.NEXT_PUBLIC_APP_DESC,
};

export const revalidate = 0;

const HomePage = () => {
  return (
    <div className='my-8 flex flex-col gap-4 md:gap-16'>
      {/* <div>
        <Suspense fallback={<CarouselSkeleton />}>
          <Carousel />
        </Suspense>
      </div> */}
      <div className='flex flex-col gap-8 md:flex-row'>
        <div className='flex-1'>
          <p className='text-nowrap text-4xl font-semibold md:text-6xl'>
            Đơn giản & Chất lượng
          </p>
        </div>
        <div className='flex flex-1 items-center'>
          <div>
            <span className='font-bold'>Gỗ Tiến Hưng</span> chuyên cung cấp các loại gỗ nhập khẩu từ khắp nơi trên thế giới
            <br className='hidden sm:inline' />
            Nha Trang - Việt Nam. Since 2024.
          </div>
        </div>
      </div>
      <Categories />
      <Icons />

      {/* <Suspense
        fallback={<ProductItemsSkeleton qty={8} name='Latest Products' />}
      >
        <ProductItems />
      </Suspense> */}
      <div>
        <ProductItems />
      </div>

      {/* <Suspense fallback={<ProductItemsSkeleton qty={4} name='Top Rated' />}>
        <Slider />
      </Suspense> */}
      <div>
        <Slider />
      </div>

      <ReadMore>
        <Text />
      </ReadMore>
    </div>
  );
};

export default HomePage;
