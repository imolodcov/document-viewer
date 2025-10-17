import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'viewer',
        loadChildren: () => import('./features/document-viewer/document-viewer-routing-module').then(r => r.documentViewerRoutingModule),
    },
    {
        path: '**',
        redirectTo: 'viewer',
    },
];
