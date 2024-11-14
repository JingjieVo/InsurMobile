interface Term {
    id: number;
    productId: number;
    name: string;
    description: string;
    amount: number;
    icon: string;
  }
  
  export interface Product {
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
  
  export type ProductsResponse = Product[];
  