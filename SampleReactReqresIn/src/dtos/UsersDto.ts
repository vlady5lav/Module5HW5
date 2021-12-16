import { UserDto } from './UserDto';

export interface UsersDto {
  data: UserDto[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
