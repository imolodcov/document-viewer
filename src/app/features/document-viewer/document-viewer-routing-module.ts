import { Route } from '@angular/router';

export const documentViewerRoutingModule: Route[] = [
    {
        path: 'view/:id',
        loadComponent: () => import('./components/document-viewer-component/document-viewer.component').then(c => c.DocumentViewerComponent),
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'view/1',

    },
];
