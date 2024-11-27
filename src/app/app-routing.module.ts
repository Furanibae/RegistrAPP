import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ListaRevisionPage } from './pages/lista-revision/lista-revision.page';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
   {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'menu-principal',
    loadChildren: () => import('./pages/menu-alumno/menu-principal.module').then( m => m.MenuPrincipalPageModule)
  },
  {
    path: 'revisar-asistencia',
    loadChildren: () => import('./pages/revisar-alumno/revisar-asistencia.module').then( m => m.RevisarAsistenciaPageModule)
  },
  {
    path: 'registrar-asistencia',
    loadChildren: () => import('./pages/registrar-alumno/registrar-asistencia.module').then( m => m.RegistrarAsistenciaPageModule)
  },
  {
    path: 'menu-profesor',
    loadChildren: () => import('./pages/menu-profesor/menu-profesor.module').then( m => m.MenuProfesorPageModule)
  },
  {
    path: 'revisar-asistencia-profesor',
    loadChildren: () => import('./pages/revisar-profesor/revisar-asistencia-profesor.module').then( m => m.RevisarAsistenciaProfesorPageModule)
  },
  {
    path: 'p404',
    loadChildren: () => import('./pages/p404/p404.module').then( m => m.P404PageModule)
  },
  {
    path: 'registrar-asistencia-profesor',
    loadChildren: () => import('./pages/registrar-profesor/registrar-asistencia-profesor.module').then( m => m.RegistrarAsistenciaProfesorPageModule)
  },
  {
    path: 'lista-revision',
    loadChildren: () => import('./pages/lista-revision/lista-revision.module').then( m => m.ListaRevisionPageModule)
  },
  { path: 'lista-revision', component: ListaRevisionPage },
  {
  path: 'qr-prof',
  loadChildren: () => import('./pages/qr-prof/qr-prof.module').then( m => m.QrProfPageModule)
},
{
  path: 'qr-alumn',
  loadChildren: () => import('./pages/qr-alumn/qr-alumn.module').then( m => m.QrAlumnPageModule)
},
{
  path: 'qr-exitoso',
  loadChildren: () => import('./pages/qr-exitoso/qr-exitoso.module').then( m => m.QrExitosoPageModule)
},
{
  path: 'perfil-alumno',
  loadChildren: () => import('./pages/perfil-alumno/perfil-alumno.module').then( m => m.PerfilAlumnoPageModule)
},
{
  path: 'perfil-prof',
  loadChildren: () => import('./pages/perfil-prof/perfil-prof.module').then( m => m.PerfilProfPageModule)
},
{ path: '**', redirectTo: 'p404', pathMatch: 'full' },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
