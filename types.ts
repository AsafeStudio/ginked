
export enum Category {
  Cyberpunk = 'Cyberpunk',
  Anime = 'Anime',
  Essential = 'Essential',
  SciFi = 'Sci-Fi',
  Underground = 'Underground'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  details: string[];
}

export interface CartItem extends Product {
  quantity: number;
  size: string;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export interface LocationState {
  from?: string;
}
