import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { DocumentViewerLayoutComponent } from '../document-viewer-layout-component/document-viewer-layout';
import { ActivatedRoute, Params } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Observable, switchMap, tap } from 'rxjs';
import { DocumentViewerRequestService } from '../../services';
import { TuiLoader } from '@taiga-ui/core';
import { Document } from '../../interfaces';
import { AsyncPipe } from '@angular/common';
import { PageViewComponent } from '../page-view-component/page-view.component';

@Component({
    selector: 'app-document-viewer-component',
    templateUrl: './document-viewer.component.html',
    styleUrl: './document-viewer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        DocumentViewerLayoutComponent,
        TuiLoader,
        AsyncPipe,
        PageViewComponent,
    ],
    providers: [DocumentViewerRequestService],
})
export class DocumentViewerComponent {
    public readonly showLoader: WritableSignal<boolean> = signal<boolean>(true);
    private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private readonly documentViewerRequestService: DocumentViewerRequestService = inject(DocumentViewerRequestService);

    private readonly documentId$: Observable<string> = this.activatedRoute.params.pipe(
        map((params: Params) => params['id']),
        debounceTime(500),
        distinctUntilChanged()
    );

    public readonly document$: Observable<Document> = this.documentId$.pipe(
        tap(() => this.showLoader.set(true)),
        switchMap((documentId: string) => this.documentViewerRequestService.getDocumentById(documentId)),
        tap(() => this.showLoader.set(false)),
    );


}
