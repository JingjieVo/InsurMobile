interface Term {
    id: number;
    productId: number;
    name: string;
    description: string;
    amount: number;
    icon: string;
  }
  
  export interface ProductDetail {
    id: number;
    categoryId: number;
    fromAge: number;
    toAge: number;
    status: string;
    name: string;
    description: string;
    gender: string;
    applicableObject: string;
    scope: string;
    exclusion: string;
    highlight: string;
    price: number;
    thumbnail: string;
    attachment: string;
    mainTerms: Term[];
    sideTerms: Term[];
  }
  interface ProductItem {
    id: number;
    name: string;
    highlight: string;
    price: number;
    thumbnail: string;
    icon: string;
  }
  
  interface Product {
    content: ProductItem[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
    first: boolean;
  }
  export type ProductsResponse = Product[];
  
  export type ProductDetailResponse = ProductDetail;
  