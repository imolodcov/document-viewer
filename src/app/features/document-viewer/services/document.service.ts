import { inject, Injectable, Signal } from '@angular/core';
import { distinctUntilChanged, map, Observable, startWith, switchMap } from 'rxjs';
import { AnnotationInterface, DocumentInterface } from '../interfaces';
import { DocumentViewerRequestService } from './document-viewer-request.service';
import { ActivatedRoute, Params } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class DocumentService {
    private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private readonly documentViewerRequestService: DocumentViewerRequestService = inject(DocumentViewerRequestService);

    public readonly annotations: Map<string, AnnotationInterface> = new Map<string, AnnotationInterface>([],
    );

    private readonly documentId$: Observable<string> = this.activatedRoute.params.pipe(
        map((params: Params) => params['id']),
        distinctUntilChanged(),
    );

    private readonly document$: Observable<DocumentInterface | null> = this.documentId$.pipe(
        switchMap((documentId: string) => this.documentViewerRequestService.getDocumentById(documentId)),
        startWith(null),
    );

    public readonly document: Signal<DocumentInterface | null> = toSignal(this.document$);

    public saveDocument(): void {
        console.log(Object.assign(this.document(), {annotations: [...this.annotations.values()]}));
    }


    public addAnnotation(): void {
        const id = new Date().toString();
        this.annotations.set(id, {id, text: '', position: {x: 0, y: 0}, documentId: this.document().id});
    }

    public changeAnnotation(changeAnnotation: AnnotationInterface): void {
        this.annotations.set(changeAnnotation.id, changeAnnotation);
    }

    public removeAnnotation($event: string): void {
        this.annotations.delete($event);
    }

}
