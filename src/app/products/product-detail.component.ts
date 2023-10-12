import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { Subscription } from "rxjs";
import { ProductService } from "./product.service";

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle : string = 'Product Detail';
  product: IProduct | undefined;
  sub!: Subscription;
  errorMessage : string = '';
  imageWidth = 100;
  imageMargin = 20;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService){}
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        products.forEach(p => {
          if (p.productId == id){
            this.product = p;
          }
        });
      },
      error: err => this.errorMessage = err
    });
  }
  ngOnDestroy(): void{
    this.sub.unsubscribe(); 
  }
  onBack() : void{
    this.router.navigate(['/products']);
  }

}
