import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BestSellers } from 'app/shared/best-sellers/best-sellers';

@Component({
  selector: 'app-home',
  imports: [RouterLink, BestSellers],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit {

  @ViewChild('categoriesScroll') scrollContainer!: ElementRef;

  private scrollAmount = 0;
  private cardWidth = 220; // card width + gap
  private scrollInterval: any;

  ngAfterViewInit(): void {
    this.startAutoScroll();
  }

  startAutoScroll(): void {
    this.scrollInterval = setInterval(() => {
      const container = this.scrollContainer.nativeElement;

      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        // Reached end → reset to start
        container.scrollTo({ left: 0, behavior: 'smooth' });
        this.scrollAmount = 0;
      } else {
        this.scrollAmount += this.cardWidth;
        container.scrollTo({ left: this.scrollAmount, behavior: 'smooth' });
      }
    }, 3000); // every 3s
  }

  ngOnDestroy(): void {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  }
}