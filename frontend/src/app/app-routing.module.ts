import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DocumentsComponent } from './docs/documents/documents.component';
import { UploadComponent } from './docs/upload/upload.component';
import { QueryComponent } from './docs/query/query.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthGuard } from './auth/services/auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  // { path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard] },
  // { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  // { path: 'query', component: QueryComponent, canActivate: [AuthGuard] },
  // { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'docs',
    loadChildren: () => import('./docs/docs.module').then((m) => m.DocsModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
