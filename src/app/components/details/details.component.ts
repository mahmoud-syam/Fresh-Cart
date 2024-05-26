import { Product } from 'src/app/shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute, private _EcomdataService: EcomdataService) { }


  // productDetails:any;
  productDetails:Product = {} as Product;
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let idproduct: any = params.get('id');
        // console.log(idproduct);
        this._EcomdataService.GetProductDetails(idproduct).subscribe({
          next: (response) => {
            // console.log(response.data); 
            this.productDetails = response.data;
          },
        })

      }
    })

  }
  MainCustomOptions: OwlOptions  = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true ,
    items: 1,
    nav: false
  }
}
