import { Component } from '@angular/core';

@Component({
  selector: 'app-best-sellers',
  imports: [],
  templateUrl: './best-sellers.html',
  styleUrl: './best-sellers.css'
})
export class BestSellers {
  categories = [
    'All', 'Skin Care', 'Make Up', 'Hair Care', 'Fragrances', 'Nail Care', 'Body Care', 'Accessories & Tools'
  ];

  products = [
    {
      id: 1,
      image: 'https://technave.com/data/files/article/202501070421452567.jpg',
      discount: 50,
      title: 'SliikSculpt Serum',
      oldPrice: 60,
      newPrice: 25,
      rating: 5.0,
      category: 'Skin Care',
      timer: { days: 5, hours: 12, mins: 30, secs: 24 },
    },
    {
      id: 2,
      image: 'https://tse3.mm.bing.net/th/id/OIP.6yfg3YlAsogezPqQ9_hFzwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      discount: 30,
      title: 'SliikSculpt Serum',
      oldPrice: 60,
      newPrice: 35,
      rating: 5.0,
      category: 'Skin Care',
    },
    {
      id: 3,
      image: 'https://f.nooncdn.com/p/v1663251264/N35996285A_2.jpg?width=800',
      discount: 40,
      title: 'SliikSculpt Serum',
      oldPrice: 60,
      newPrice: 73,
      rating: 5.0,
      category: 'Skin Care',
    },
  ];

  selectedCategory = 'All';

  selectCategory(cat: string) {
    this.selectedCategory = cat;
  }

  filteredProducts() {
    if (this.selectedCategory === 'All') return this.products;
    return this.products.filter(p => p.category === this.selectedCategory);
  }
}
