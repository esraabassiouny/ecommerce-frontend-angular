import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/productService';
import { Iproduct } from '../models/iproduct';
import { Icategory } from '@models/iCategory';
import { ServiceCart } from '@services/service-cart';
import { Cart } from '@models/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
})
export class Products {
  products: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];

  categories: Icategory[] = [];
  selectedCatId: string = '0';

  showForm = false;
  editingProduct: Iproduct | null = null;

  formProduct: Iproduct = this.getEmptyProduct();

  constructor(private productService: ProductService, private cartService: ServiceCart, private router:Router) {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        console.log('Products from API:', res);
        this.products = res;
        this.filteredProducts = res;
        this.extractCategories(res);
      },
      error: (err) => console.error('Error fetching products', err)
    });
  }

  private extractCategories(products: Iproduct[]): void {
  const unique = new Map<string, string>();

  products.forEach((p) => {
    if (p.categoryId && typeof p.categoryId === 'object') {
      const cat = p.categoryId as any; // Icategory
      unique.set(cat._id, cat.name);
    }
  });


  this.categories = Array.from(unique).map(([id, name]) => ({ _id: id, name }));
}


  filterProducts(): void {
  if (this.selectedCatId === '0') {
    this.filteredProducts = this.products;
  } else {
    this.filteredProducts = this.products.filter((p) => {
      if (p.categoryId && typeof p.categoryId === 'object') {
        return (p.categoryId as any)._id === this.selectedCatId;
      }
      return false;
    });
  }
}


  startAddProduct(): void {
    this.showForm = true;
    this.editingProduct = null;
    this.formProduct = this.getEmptyProduct();
  }

  editProduct(product: Iproduct): void {
    this.showForm = true;
    this.editingProduct = product;
    this.formProduct = { ...product };
  }

  saveProduct(): void {
  const productToSend: any = {
    ...this.formProduct,
    categoryId: typeof this.formProduct.categoryId === 'object'
      ? (this.formProduct.categoryId as any)._id
      : this.formProduct.categoryId
  };

  console.log('Sending product:', productToSend);

  if (this.editingProduct) {
    this.productService.updateProduct(productToSend).subscribe(() => {
      this.loadProducts();
      this.cancelForm();
    });
  } else {
    this.productService.addProduct(productToSend).subscribe(() => {
      this.loadProducts();
      this.cancelForm();
    });
  }
}


  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingProduct = null;
    this.formProduct = this.getEmptyProduct();
  }

  private getEmptyProduct(): Iproduct {
    return {
      _id: '',
      name: '',
      price: 0,
      stock: 0,
      description: '',
      images: [''],
      categoryId: '',
      isFeatured: false
    };
  }

  trackById(index: number, item: Iproduct): string {
    return item._id;
  }

  buy(count: number, price: number, product: Iproduct): void {
    console.log(`Buying ${count} of ${product.name} for $${price * count}`);
  }

  addToCart(productId: string, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe({
      next: (cart) => {
        console.log('Item added successfully', cart);
        this.router.navigate(['/cart'])
      },
      error: (err) => {
        console.error('Error adding item', err);
      },
    });
  }
}
