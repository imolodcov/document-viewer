import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { DocumentViewerLayoutComponent } from '../document-viewer-layout-component/document-viewer-layout';
import { ActivatedRoute, Params } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Observable, switchMap, tap } from 'rxjs';
import { DocumentViewerRequestService } from '../../services';
import { TuiButton, TuiLoader } from '@taiga-ui/core';
import { AnnotationInterface, Document } from '../../interfaces';
import { AsyncPipe } from '@angular/common';
import { PageViewComponent } from '../page-view-component/page-view.component';
import { ZoomChangeDirective, ZoomService } from '../../../zoom';
import { AnnotationComponent } from '../annotation-component/annotation.component';

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
        ZoomChangeDirective,
        AnnotationComponent,
        TuiButton,
    ],
    providers: [DocumentViewerRequestService, ZoomService],
})
export class DocumentViewerComponent {
    public readonly showLoader: WritableSignal<boolean> = signal<boolean>(true);

    private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private readonly documentViewerRequestService: DocumentViewerRequestService = inject(DocumentViewerRequestService);
    public readonly annotations: Map<string, AnnotationInterface> = new Map<string, AnnotationInterface>([],
    );

    private readonly documentId$: Observable<string> = this.activatedRoute.params.pipe(
        map((params: Params) => params['id']),
        debounceTime(500),
        distinctUntilChanged(),
    );

    public readonly document$: Observable<Document> = this.documentId$.pipe(
        tap(() => this.showLoader.set(true)),
        switchMap((documentId: string) => this.documentViewerRequestService.getDocumentById(documentId)),
        tap(() => this.showLoader.set(false)),
    );

    public saveDocument(document: Document): void {
        console.log(Object.assign(document, {annotations: [...this.annotations.values()]}));
    }

    public addAnnotation(document: Document): void {
        const id = new Date().toString();
        this.annotations.set(id, {id, text: '', position: {x: 0, y: 0}, documentId: document.id});
    }

    public changeAnnotation(changeAnnotation: AnnotationInterface): void {
        this.annotations.set(changeAnnotation.id, changeAnnotation);
    }

    public removeAnnotation($event: string): void {
        this.annotations.delete($event);
    }
}
