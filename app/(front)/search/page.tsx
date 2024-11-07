import Link from 'next/link';

import ProductItem from '@/components/products/ProductItem';
import { Rating } from '@/components/products/Rating';
import productServices from '@/lib/services/productService';

const sortOrders = ['newest', 'lowest', 'highest', 'rating'];
const prices = [
  {
    name: '45.000 - 100.000',
    value: '45000-100000',
  },
  {
    name: '100.000 - 500.000',
    value: '100000-300000',
  },
  {
    name: '500.000 - 3.000.000',
    value: '300000-1000000',
  },
];

const ratings = [5, 4, 3, 2, 1];

export async function generateMetadata({
  searchParams: { q = 'all', category = 'all', price = 'all', rating = 'all' },
}: {
  searchParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  if (
    (q !== 'all' && q !== '') ||
    category !== 'all' ||
    rating !== 'all' ||
    price !== 'all'
  ) {
    return {
      title: `Search ${q !== 'all' ? q : ''}
          ${category !== 'all' ? ` : Category ${category}` : ''}
          ${price !== 'all' ? ` : Price ${price}` : ''}
          ${rating !== 'all' ? ` : Rating ${rating}` : ''}`,
    };
  } else {
    return {
      title: 'Search Products',
    };
  }
}

export default async function SearchPage({
  searchParams: {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  },
}: {
  searchParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    if (s) params.sort = s;
    return `/search?${new URLSearchParams(params).toString()}`;
  };
  const categories = await productServices.getCategories();
  const { countProducts, products, pages } = await productServices.getByQuery({
    category,
    q,
    price,
    rating,
    page,
    sort,
  });
  return (
    <div className='grid md:grid-cols-5 md:gap-5'>
      <div>
        <div className='py-2 text-xl'>Danh mục</div>
        <div>
          <ul>
            <li>
              <Link
                className={`link-hover link ${
                  'all' === category && 'link-primary'
                }`}
                href={getFilterUrl({ c: 'all' })}
              >
                Bất kỳ
              </Link>
            </li>
            {categories.map((c: string) => (
              <li key={c}>
                <Link
                  className={`link-hover link ${
                    c === category && 'link-primary'
                  }`}
                  href={getFilterUrl({ c })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className='py-2 text-xl'>Giá</div>
          <ul>
            <li>
              <Link
                className={`link-hover link ${
                  'all' === price && 'link-primary'
                }`}
                href={getFilterUrl({ p: 'all' })}
              >
                Bất kỳ
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  href={getFilterUrl({ p: p.value })}
                  className={`link-hover link ${
                    p.value === price && 'link-primary'
                  }`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className='py-2 text-xl'>Đánh giá</div>
          <ul className='flex flex-col gap-1'>
            <li>
              <Link
                href={getFilterUrl({ r: 'all' })}
                className={`link-hover link ${
                  'all' === rating && 'link-primary'
                }`}
              >
                Bất kỳ
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  href={getFilterUrl({ r: `${r}` })}
                  className={`link-hover link ${
                    `${r}` === rating && 'link-primary'
                  }`}
                >
                  <Rating caption={' & up'} value={r} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='md:col-span-4'>
        <div className='flex flex-col justify-between py-4 md:flex-row'>
          <div className='flex items-center'>
            {products.length === 0 ? 'No' : countProducts} Kết quả
            {q !== 'all' && q !== '' && ' : ' + q}
            {category !== 'all' && ' : ' + category}
            {price !== 'all' && ' : Price ' + price}
            {rating !== 'all' && ' : Rating ' + rating + ' & up'}
            &nbsp;
            {(q !== 'all' && q !== '') ||
            category !== 'all' ||
            rating !== 'all' ||
            price !== 'all' ? (
              <Link className='btn btn-ghost btn-sm' href='/search'>
                Xoá
              </Link>
            ) : null}
          </div>
          <div>
            Sort by:{' '}
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`link-hover link mx-2 ${
                  sort == s ? 'link-primary' : ''
                } `}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3  '>
            {products.map((product) => (
              <ProductItem key={product.slug} product={product} />
            ))}
          </div>
          <div className='join'>
            {products.length > 0 &&
              Array.from(Array(pages).keys()).map((p) => (
                <Link
                  key={p}
                  className={`btn join-item ${
                    Number(page) === p + 1 ? 'btn-active' : ''
                  } `}
                  href={getFilterUrl({ pg: `${p + 1}` })}
                >
                  {p + 1}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
