import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VasosComponent } from './pages/vasos/vasos.component';
import { CucharasComponent } from './pages/cucharas/cucharas.component';

export const routes: Routes = [
    
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'vasos',component:VasosComponent},
    {path:'cucharas',component:CucharasComponent}
];
