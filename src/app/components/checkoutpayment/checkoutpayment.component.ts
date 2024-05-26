import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkoutpayment',
  templateUrl: './checkoutpayment.component.html',
  styleUrls: ['./checkoutpayment.component.css']
})
export class CheckoutpaymentComponent {
  constructor(private _FormBuilder:FormBuilder){}

  chckout:FormGroup = this._FormBuilder.group({
    details:[''],
    phone:[],
    city:[],
  })
  handleForm():void{}


}
