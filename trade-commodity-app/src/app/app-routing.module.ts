import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradesComponent } from './views/trades/trades.component';
import { CommodityListComponent } from './views/commodity-list/commodity-list.component';

const routes: Routes = [

  {path: 'trades', component: TradesComponent},
  
  {path: 'commodities', component: CommodityListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}


