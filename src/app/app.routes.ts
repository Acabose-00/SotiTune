import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'menu-instrumentos',
    loadComponent: () => import('./menu-instrumentos/menu-instrumentos.page').then( m => m.MenuInstrumentosPage)
  },
  {
    path: 'medidor-afinacion',
    loadComponent: () => import('./medidor-afinacion/medidor-afinacion.page').then( m => m.MedidorAfinacionPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'partituras',
    loadComponent: () => import('./partituras/partituras.page').then( m => m.PartiturasPage)
  },
  {
    path: 'subir-partitura',
    loadComponent: () => import('./subir-partitura/subir-partitura.page').then( m => m.SubirPartituraPage)
  },
  {
    path: 'ver-partitura',
    loadComponent: () => import('./ver-partitura/ver-partitura.page').then( m => m.VerPartituraPage)
  },



];
