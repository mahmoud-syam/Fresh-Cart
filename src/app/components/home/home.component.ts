import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
//
// import {carioselMod}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private _EcomdataService: EcomdataService, private _CartService: CartService, private _ToastrService: ToastrService) { };

  products: any[] = [];
  // Proprty to save data categories (response)
  categories: any[] = [];

  //Search for products 
  searchTerm: string = '';

  // To Add Anew Cart
  addCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message, 'Fresh Cart')


      },
      error: (err) => {
        console.log(err);

      }
    })
  }




  //Main Owel-Cariosel
  MainCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    items: 1,
    nav: true
  }
  //Cariosel
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  // -----------------------------------------//
  ngOnInit(): void {
    this._EcomdataService.GetAllProducts().subscribe({
      next: (response) => {
        // console.log(response);
        this.products = response.data

      }

    });

    // Get CAtegoires
    this._EcomdataService.getCategories().subscribe({
      next: (response) => {
        // console.log(response);
        this.categories = response.data
      },
    })
  }


}
