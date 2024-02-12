import { config } from '@/config/constants';
import { getErrorData } from '@/shared/helpers';
import { Logger } from '@/shared/logger';
import { handleResponse } from './handle.api';
import { Inews } from '@/types/news';
import { Istore } from '@/types/store';
import { IproductNew } from '@/types/productsNews';
import { IproductsFilter } from '@/types/productsFilter';
import { IproductList } from '@/types/product_list';
import { IproductFull } from '@/types/product_full';

export async function cipoListGoods(params: { [key: string]: string }) {
  // on server
  let stringParams = '';
  for (const param in params) {
    if (params[param] !== undefined && params[param] !== '') {
      stringParams += `&${param}=${params[param]}`;
    }
  }

  const url =
    config.backendUrl +
    '/api/products/' +
    (stringParams !== '' ? '?' + stringParams : '');

  const res = await fetch(url, {
    next: { tags: ['goods'], revalidate: 60 },
  });
  return await handleResponse<IproductList>(res, url);
}

export async function cipoFilterList() {
  // on client
  const url = config.NEXT_PUBLIC_backendUrl + '/api/productsFilter';
  const res = await fetch(url, { next: { revalidate: 60 } });
  return await handleResponse<IproductsFilter>(res, url);
}

export async function cipoListStores() {
  // on client
  const url = config.NEXT_PUBLIC_backendUrl + '/api/stores';
  const res = await fetch(url, { next: { revalidate: 60 } });
  return await handleResponse<Istore[]>(res, url);
}

export async function cipoListNews() {
  // on client
  const url = config.NEXT_PUBLIC_backendUrl + '/api/news?news=4';
  const res = await fetch(url, { next: { revalidate: 60 } });
  return await handleResponse<Inews[]>(res, url);
}

export async function cipoGetNews(id: string) {
  // on server
  const url = config.NEXT_PUBLIC_backendUrl + '/api/newsID?id=' + id;
  const res = await fetch(url, { next: { revalidate: 60 } });
  return await handleResponse<Inews>(res, url);
}

export async function cipoGetProduct(id: string) {
  // on server
  const url = config.NEXT_PUBLIC_backendUrl + '/api/product?id=' + id;
  const res = await fetch(url, { next: { revalidate: 60 } });
  return await handleResponse<IproductFull>(res, url);
}


export async function cipoProductNews() {
  // on client
  const url = config.NEXT_PUBLIC_backendUrl + '/api/productsNews?news=10';
  const res = await fetch(url, { next: { revalidate: 60 } });
  return await handleResponse<IproductNew[]>(res, url);
}
