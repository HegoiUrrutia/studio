import type { Product, Category } from './types';
import { PlaceHolderImages } from './placeholder-images';

function findImage(id: string): string {
    return PlaceHolderImages.find(img => img.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/400/300`;
}

export const categories: Category[] = [
  { id: 'games', name: 'Video Games' },
  { id: 'consoles', name: 'Consoles' },
  { id: 'merchandise', name: 'Merchandise' },
];

export const products: Product[] = [
    {
      id: 'cyberpunk-2077',
      name: 'Cyberpunk 2077',
      description: 'An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.',
      price: 59.99,
      imageUrl: findImage('cyberpunk-2077'),
      categoryId: 'games',
    },
    {
      id: 'playstation-5',
      name: 'PlayStation 5',
      description: 'Experience lightning-fast loading with an ultra-high-speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio.',
      price: 499.99,
      imageUrl: findImage('playstation-5'),
      categoryId: 'consoles',
    },
    {
      id: 'animal-crossing-plush',
      name: 'Animal Crossing Plush',
      description: 'A soft and cuddly plush of Tom Nook from the Animal Crossing series.',
      price: 24.99,
      imageUrl: findImage('animal-crossing-plush'),
      categoryId: 'merchandise',
    },
    {
      id: 'zelda-tears-of-the-kingdom',
      name: 'Zelda: Tears of the Kingdom',
      description: 'An epic adventure across the land and skies of Hyrule awaits in The Legend of Zelda: Tears of the Kingdom for Nintendo Switch.',
      price: 69.99,
      imageUrl: findImage('zelda-tears-of-the-kingdom'),
      categoryId: 'games',
    },
    {
      id: 'nintendo-switch-oled',
      name: 'Nintendo Switch - OLED',
      description: 'Feast your eyes on vivid colors and crisp contrast when you play on the go.',
      price: 349.99,
      imageUrl: findImage('nintendo-switch-oled'),
      categoryId: 'consoles',
    },
    {
      id: 'mario-kart-tshirt',
      name: 'Mario Kart T-Shirt',
      description: 'Show off your love for Mario Kart with this stylish graphic tee.',
      price: 19.99,
      imageUrl: findImage('mario-kart-tshirt'),
      categoryId: 'merchandise',
    },
    {
      id: 'elden-ring',
      name: 'Elden Ring',
      description: 'THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
      price: 59.99,
      imageUrl: findImage('elden-ring'),
      categoryId: 'games',
    },
    {
      id: 'xbox-series-x',
      name: 'Xbox Series X',
      description: 'Introducing Xbox Series X, the fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles.',
      price: 499.99,
      imageUrl: findImage('xbox-series-x'),
      categoryId: 'consoles',
    },
    {
      id: 'pokemon-hat',
      name: 'Pokémon Hat',
      description: 'A comfortable and stylish baseball cap featuring the iconic Poke Ball logo.',
      price: 15.99,
      imageUrl: findImage('pokemon-hat'),
      categoryId: 'merchandise',
    }
];
