import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { MyCartComponent } from './my-cart/my-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'events',
    pathMatch:'full'
  },
  {
    path: 'allproducts',
    component: EventsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path: 'mycart',
    component: MyCartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'adminlogin',
    component: AdminloginComponent
  },
  {
    path: 'adminhome',
    component: AdminhomeComponent
  },
  {
    path: 'manageProducts',
    component: ManageProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
