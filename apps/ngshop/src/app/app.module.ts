import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@bluebits/ui';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { ProductModule } from '@bluebits/product';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { OrdersModule } from '@bluebits/orders';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'category/:categoryId', component: ProductListComponent },

];
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ProductModule,
    CheckboxModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    UiModule,
    AccordionModule,
    FormsModule,
    OrdersModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
