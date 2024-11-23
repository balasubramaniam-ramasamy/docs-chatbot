import { NgModule } from '@angular/core';
import { DocumentsComponent } from './documents/documents.component';
import { QueryComponent } from './query/query.component';
import { UploadComponent } from './upload/upload.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';

const docsRoutes: Routes = [
    { path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard] },
    { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
    { path: 'query', component: QueryComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(docsRoutes)],
    exports: [RouterModule],
})
export class DocsModule { }
