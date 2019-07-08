import { NgModel } from "@angular/forms";
import { CheckoutComponent } from './checkout.component';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@NgModel({
    declarations: [CheckoutComponent],
    import: [],
    entryComponents: [PlaceOrderComponent]
})

export class checkOutModel { }