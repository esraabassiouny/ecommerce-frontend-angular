import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Iproduct } from '../models/iproduct';
import { ServiceCart } from '@services/service-cart';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products implements OnInit, OnChanges {
  @Input() recievedCatId = 0;
  @Output() onTotalPriceChanged: EventEmitter<number> =
    new EventEmitter<number>();

  // ✅ Categories for dropdown
  categories = [
    { id: 1, name: 'Mobiles' },
    { id: 2, name: 'Headphones' },
    { id: 3, name: 'Scooters' },
    { id: 4, name: 'Cameras' },
    { id: 5, name: 'Laptops' },
    { id: 6, name: 'Shoes' },
    { id: 7, name: 'Consoles' },
    { id: 8, name: 'Wearables' },
    { id: 9, name: 'Watches' },
    { id: 10, name: 'Home Appliances' },
    { id: 11, name: 'Tablets' },
  ];

  // ✅ products list
   products: Iproduct[] = [
    {
      _id: 1,
      name: 'Oppo Reno 13F 5G (Plume Purple, 12GB RAM, 256GB)',
      description: 'Mid-range smartphone with 6.67-inch AMOLED display, Snapdragon 6 Gen 1, 5800mAh battery, and IP69 water resistance.',
      price: 999,
      stock: 25,
      images: ['https://technave.com/data/files/article/202501070421452567.jpg'],
      categoryId: 1,
      isFeatured: true
    },
    {
      _id: 2,
      name: 'Sony WH-1000XM4',
      description: 'Premium over-ear headphones with industry-leading noise cancellation, 30-hour battery life, and high-resolution audio support.',
      price: 349,
      stock: 50,
      images: ['https://tse3.mm.bing.net/th/id/OIP.6yfg3YlAsogezPqQ9_hFzwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'],
      categoryId: 2,
      isFeatured: false
    },
    {
      _id: 3,
      name: 'Scooter',
      description: 'Merv - Kids And Adults - Jumbo - Height-Adjustable Foldable Kick Scooter Anti-Skid Wear Resistant Wheel',
      price: 1199,
      stock: 15,
      images: ['https://f.nooncdn.com/p/pzsku/Z64B3C2BBCB8446D2A079Z/45/1756818422/9ac583cc-479b-4e92-a241-631698158496.jpg?width=800'],
      categoryId: 3,
      isFeatured: true
    },
    {
      _id: 4,
      name: 'Canon EOS Rebel T7 (2000D)',
      description: 'Entry-level DSLR with a 24.1MP APS-C sensor, 9-point AF system, and Full HD 1080p video recording at 30fps.',
      price: 499,
      stock: 12,
      images: ['https://th.bing.com/th/id/OIP.LgZst4kC3Jl0Qy-CsjSxIgHaHa?w=194&h=194&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3'],
      categoryId: 4,
      isFeatured: false
    },
    {
      _id: 5,
      name: 'Nikon D3500',
      description: 'Beginner-friendly DSLR with a 24.2MP DX-format sensor, EXPEED 4 processor, and Full HD video at 60p.',
      price: 450,
      stock: 20,
      images: ['https://img1.kakaku.k-img.com/images/productimage/fullscale/K0000436257_0013.jpg'],
      categoryId: 4,
      isFeatured: true
    },
    {
      _id: 6,
      name: 'DSLR camera',
      description: 'EOS 90D camera with 18-135mm lens U EU.',
      price: 650,
      stock: 18,
      images: ['https://f.nooncdn.com/p/v1663251264/N35996285A_2.jpg?width=800'],
      categoryId: 4,
      isFeatured: true
    },
    {
      _id: 7,
      name: 'Logitech MX Master 3S',
      description: 'Ergonomic wireless mouse with a 8000 DPI sensor, multi-device connectivity, and 70-day battery life.',
      price: 99,
      stock: 60,
      images: ['https://tse3.mm.bing.net/th/id/OIP.AGkAIoXCQnKlUDYz6CQi1wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'],
      categoryId: 5,
      isFeatured: false
    },
    {
      _id: 8,
      name: 'ASOS',
      description: 'ROG Pelta Wireless RGB Gaming Headset ROG SpeedNova, Bluetooth, 2.4GHz, USB-C, 50mm RO',
      price: 249,
      stock: 40,
      images: ['https://f.nooncdn.com/p/pnsku/N70147292V/45/_/1738239441/1f6a77ca-d03b-40ed-8a2b-8bf1d6e38ce9.jpg?width=800'],
      categoryId: 2,
      isFeatured: false
    },
    {
      _id: 9,
      name: 'HP Pavilion Gaming 15 (2023)',
      description: 'Gaming laptop with AMD Ryzen 7 7840HS, NVIDIA GeForce RTX 4060, 16GB RAM, and 15.6-inch Full HD display.',
      price: 1099,
      stock: 10,
      images: ['https://m.media-amazon.com/images/I/512ZtGERa1L._AC_.jpg'],
      categoryId: 5,
      isFeatured: false
    },
    {
      _id: 10,
      name: 'Adidas',
      description: 'Copa Pure 2 Club Flexible Ground Football Boots.',
      price: 1399,
      stock: 8,
      images: ['https://f.nooncdn.com/p/pzsku/Z26ECFE42AB60368655A2Z/45/_/1740310412/71d250e5-ca82-4c57-b006-756acb918abc.jpg?width=800'],
      categoryId: 6,
      isFeatured: false
    },
    {
      _id: 11,
      name: 'Sony PlayStation 5',
      description: 'Next-gen console with 4K gaming, 825GB SSD, and backward compatibility with PS4 titles.',
      price: 499,
      stock: 30,
      images: ['https://sonyworld.ae/cdn/shop/files/ps5_pro_pr_01_right_RGB.jpg?v=1727355057&width=550'],
      categoryId: 7,
      isFeatured: false
    },
    {
      _id: 12,
      name: 'Xiaomi Smart Band 7',
      description: 'Fitness tracker with 1.62-inch AMOLED display, SpO2 monitoring, and up to 14-day battery life.',
      price: 49,
      stock: 80,
      images: ['https://lablaab.com/wp-content/uploads/2020/08/2edw-1024x1024.jpg'],
      categoryId: 8,
      isFeatured: true
    },
    {
      _id: 13,
      name: "Emporio Armani Men's Watch AR1124",
      description: "The Emporio Armani AR1124 is a luxury men's watch blending sleek, minimalist style with functionality, ideal for formal and daily wear.",
      price: 129,
      stock: 35,
      images: ['https://f.nooncdn.com/p/pzsku/ZF0503721B03CBC30DF94Z/45/1752106561/b12dd775-d320-4cb4-92d2-3fe47823a53f.jpg?width=800'],
      categoryId: 9,
      isFeatured: false
    },
    {
      _id: 14,
      name: 'Dyson V11 Torque Drive',
      description: 'Cordless vacuum with up to 60 minutes runtime, LCD screen, and whole-machine HEPA filtration.',
      price: 599,
      stock: 22,
      images: ['https://nypost.com/wp-content/uploads/sites/2/2021/11/vac4.jpg?quality=90&strip=all'],
      categoryId: 10,
      isFeatured: false
    },
    {
      _id: 15,
      name: 'Apple iPad Air (5th Generation, 2022)',
      description: '10.9-inch tablet with M1 chip, 12MP camera, and support for Apple Pencil and Magic Keyboard.',
      price: 599,
      stock: 18,
      images: ['https://tse1.mm.bing.net/th/id/OIP.klNZo0dOUhXWaP5oGTPSeQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'],
      categoryId: 11,
      isFeatured: false
    },
    {
      _id: 16,
      name: 'Samsung Galaxy Tab S7 FE',
      description: 'Android tablet with 12.4-inch TFT display, S Pen included, and 10,090mAh battery.',
      price: 649,
      stock: 20,
      images: ['https://www.geekman.in/wp-content/uploads/2021/05/Samsung-Galaxy-S7-FE-232-1024x683.jpg'],
      categoryId: 11,
      isFeatured: false
    },
    {
      _id: 17,
      name: 'Lenovo Tab P11 (2nd Gen)',
      description: '10.6-inch 2K display tablet with MediaTek Helio G99, 4GB RAM, and quad speakers.',
      price: 299,
      stock: 25,
      images: ['https://tse2.mm.bing.net/th/id/OIP.qOlbqq5lf67a5QJRYzV1QwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'],
      categoryId: 11,
      isFeatured: true
    },
    {
      _id: 18,
      name: "Tommy Hilfiger Women's Watch",
      description: "The Tommy Hilfiger Women's Watch 178197 (or a similar model in the 178XXXX series) is a stylish, fashion-forward wristwatch designed for women.",
      price: 79,
      stock: 0,
      images: ['https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/t/o/tommy-hilfiger-angela-rose-goldtone-dial-ladies-watch-1782124.jpg?width=350&height=350'],
      categoryId: 9,
      isFeatured: true
    }
  ];

  filteredProducts: Iproduct[] = [];
  totalOrderPrice = 0;

  // ✅ category filter state
  selectedCatId: number = 0;

  // ✅ Form state
  showForm = false;
  editingProduct: Iproduct | null = null;
  formProduct: Iproduct = this.getEmptyProduct();

  constructor(private cartService: ServiceCart) {
    this.filteredProducts = this.products;
  }

  // ✅ initialize filter on load
  ngOnInit(): void {
    this.filterProducts();
  }

  // ✅ react when parent sends recievedCatId
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recievedCatId']) {
      this.selectedCatId = this.recievedCatId;
      this.filterProducts();
    }
  }

  trackById(index: number, item: Iproduct) {
    return item._id;
  }

  // -------- Category Filter --------
 filterProducts() {
  if (this.selectedCatId == 0) {
    this.filteredProducts = this.products;
  } else {
    this.filteredProducts = this.products.filter(
      (prod) => prod.categoryId == this.selectedCatId
    );
  }
}

  // -------- Form Handling --------
  startAddProduct() {
    this.editingProduct = null;
    this.formProduct = this.getEmptyProduct();
    this.showForm = true;
  }

  editProduct(product: Iproduct) {
    this.editingProduct = product;
    this.formProduct = { ...product, images: [...product.images] };
    this.showForm = true;
  }

  saveProduct() {
    if (this.editingProduct) {
      const index = this.products.findIndex(
        (p) => p._id === this.editingProduct!._id
      );
      if (index !== -1) {
        this.products[index] = { ...this.formProduct };
      }
    } else {
      this.formProduct._id = this.getNextId();
      this.products.push({ ...this.formProduct });
    }
    this.filterProducts();
    this.cancelForm();
  }

  cancelForm() {
    this.showForm = false;
    this.editingProduct = null;
  }

  deleteProduct(id: number) {
    if (confirm('Delete this product?')) {
      this.products = this.products.filter((p) => p._id !== id);
      this.filterProducts();
    }
  }

  // -------- Buying --------
  buy(countStr: string, price: number, product: Iproduct) {
    const count = Number(countStr);
    if (count > product.stock) {
      alert('Not enough stock available!');
      return;
    }
    product.stock -= count;
    this.totalOrderPrice += count * price;
    this.onTotalPriceChanged.emit(this.totalOrderPrice);
  }

  // -------- Helpers --------
  private getNextId(): number {
    return this.products.length
      ? Math.max(...this.products.map((p) => p._id)) + 1
      : 1;
  }

  private getEmptyProduct(): Iproduct {
    return {
      _id: 0,
      name: '',
      description: '',
      price: 0,
      stock: 0,
      images: [''],
      categoryId: 0,
      isFeatured: false,
    };
  }

  onAddToCart(productId: string, quantity: string) {
    const qty = parseInt(quantity, 10);
    this.cartService.addToCart(productId, qty).subscribe({
      next: (cart) => {
      console.log("✅ Product added successfully:", cart);
    },
    error: (err) => {
      console.error("❌ Failed to add product:", err);
    }
    });
}

}
