import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { DocumentViewerLayoutComponent } from '../document-viewer-layout-component/document-viewer-layout';
import { DocumentViewerRequestService } from '../../services/document-viewer-request.service';
import { TuiLoader } from '@taiga-ui/core';
import { AnnotationInterface, DocumentInterface } from '../../interfaces';
import { PageViewComponent } from '../page-view-component/page-view.component';
import { ZoomChangeDirective, ZoomService } from '../../../zoom';
import { AnnotationComponent } from '../annotation-component/annotation.component';
import { DocumentService } from '../../services/document.service';

@Component({
    selector: 'app-document-viewer-component',
    templateUrl: './document-viewer.component.html',
    styleUrl: './document-viewer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        DocumentViewerLayoutComponent,
        TuiLoader,
        PageViewComponent,
        ZoomChangeDirective,
        AnnotationComponent,
    ],
    providers: [DocumentViewerRequestService, DocumentService, ZoomService],
})
export class DocumentViewerComponent {
    private readonly documentService: DocumentService = inject(DocumentService);
    protected readonly document: Signal<DocumentInterface | null> = this.documentService.document;
    protected readonly showLoader: Signal<boolean> = computed<boolean>(() => !this.document());
    public readonly annotations: Map<string, AnnotationInterface> = this.documentService.annotations;

    public saveDocument(): void {
        this.documentService.saveDocument();
    }

    public addAnnotation(): void {
        this.documentService.addAnnotation();
    }
}
