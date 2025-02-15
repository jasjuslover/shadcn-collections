export type BaseResponsePagination<T> = {
  data?: T;
  pagination?: Pagination;
};

export type Pagination = {
  last_visible_page?: number;
  has_next_page?: boolean;
  current_page?: number;
  items?: Items;
};

export type Items = {
  count?: number;
  total?: number;
  per_page?: number;
};
