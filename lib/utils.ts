import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const round2 = (num: number) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export const convertDocToObj = (doc: any) => {
  doc._id = doc._id.toString();
  return doc;
};

export const formatNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatId = (x: string) => {
  return `..${x.substring(20, 24)}`;
};

export const delay = (ms: number) => {
  new Promise((resolve) => setTimeout(resolve, ms));
}

export const VNDFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })

// get UTC + 7
export const timeZoneVietNam = () => {
  const now = new Date(Date.now())
  now.setHours(now.getHours() + 7)

  return now
}

export const formattedDate = (now: Date) => {
  const nowString = new Date(now)
  const day = String(nowString.getDate()).padStart(2, '0')
  const month = String(nowString.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  const year = nowString.getFullYear()

  const hours = String(nowString.getHours()).padStart(2, '0')
  const minutes = String(nowString.getMinutes()).padStart(2, '0')
  const seconds = String(nowString.getSeconds()).padStart(2, '0')

  const date = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
  return date
}
