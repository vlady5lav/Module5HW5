import { SupportDto } from './SupportDto';

export interface ResponseDto<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T;
  suppport: SupportDto;
}
