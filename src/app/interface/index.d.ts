type TErrorMessage = {
  path: string;
  message: string;
};

export interface IQueryParams {
  rating?: number;
  price?: [number, number];
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}

export type TErrorMessages = TErrorMessage[];
