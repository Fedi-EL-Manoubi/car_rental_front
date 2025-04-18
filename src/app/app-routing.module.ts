import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', component: CarListComponent }, // Page principale
  { path: 'cars/:id', component: CarDetailsComponent }, // Détails d'un véhicule
  { path: 'admin', component: AdminComponent }, // Interface d'administration
  { path: '**', redirectTo: '' } // Redirection par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
