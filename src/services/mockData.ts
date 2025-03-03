export interface Product {
  id: string;
  name: string;
  price: number;
  farm: string;
  image: string;
  category: string;
  unit: string;
  stock: number;
}

export interface Farm {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  image: string;
  products: string[];
}

export const MOCK_DATA = {
  products: [
    {
      id: '1',
      name: 'Domates',
      price: 24.99,
      farm: 'Yeşil Tarım Çiftliği',
      image: 'https://www.upload.ee/image/16684000/Rectangle_55.png',
      category: 'vegetables',
      unit: 'kg',
      stock: 100
    },
    {
      id: '2',
      name: 'Salatalık',
      price: 19.99,
      farm: 'Güneşin Doğuşu Çiftliği',
      image: 'https://www.upload.ee/image/16684004/Rectangle_52.png',
      category: 'vegetables',
      unit: 'kg',
      stock: 150
    },
    // Diğer ürünler data.json'dan alınacak
  ],
  farms: [
    {
      id: '1',
      name: 'Yeşil Tarım Çiftliği',
      rating: 4.5,
      reviews: 128,
      location: 'Çubuk / Ankara',
      distance: '5.2 km',
      image: 'https://www.upload.ee/image/16683574/pp.png',
      products: ['1', '3', '5']
    },
    {
      id: '2',
      name: 'Güneşin Doğuşu Çiftliği',
      rating: 4.2,
      reviews: 96,
      location: 'Polatlı / Ankara',
      distance: '12.4 km',
      image: 'https://www.upload.ee/image/16683574/pp.png',
      products: ['2', '4', '6']
    }
  ]
}; 