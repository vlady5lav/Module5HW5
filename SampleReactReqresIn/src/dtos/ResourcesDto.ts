import { ResourceDto } from './ResourceDto';

export interface ResourcesDto {
  data: ResourceDto[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
