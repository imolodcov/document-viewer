import {
    ChangeDetectionStrategy,
    Component, computed,
    effect, inject,
    input,
    InputSignal,
    output,
    OutputEmitterRef, Signal,
} from '@angular/core';
import { AnnotationInterface } from '../../interfaces';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiTextarea } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { DragDirective, DragPosition } from '../../../drag';
import { DocumentService } from '../../services/document.service';

@Component({
    selector: 'app-annotation-component',
    imports: [
        TuiTextfield,
        TuiTextarea,
        FormsModule,
        TuiButton,
        DragDirective,
    ],
    templateUrl: './annotation.component.html',
    styleUrl: './annotation.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class AnnotationComponent {
    private readonly documentService: DocumentService = inject(DocumentService);
    public annotation: InputSignal<AnnotationInterface> = input.required();
    protected text: Signal<string> = computed(() => this.annotation().text);

    public onclickRemove(): void {
        this.documentService.removeAnnotation(this.annotation().id);
    }

    public changePosition(position: DragPosition): void {
        this.documentService.changeAnnotation({...this.annotation(), ...{position}});
    }

    public changeTextAnnotation(text: string): void {
        this.documentService.changeAnnotation({...this.annotation(), ...{text}});
    }
}
