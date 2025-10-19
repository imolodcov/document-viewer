import {
    ChangeDetectionStrategy,
    Component,
    effect,
    input,
    InputSignal,
    output,
    OutputEmitterRef,
} from '@angular/core';
import { AnnotationInterface } from '../../interfaces';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiTextarea } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { Drag, DragPosition } from '../../../drag';

@Component({
    selector: 'app-annotation-component',
    imports: [
        TuiTextfield,
        TuiTextarea,
        FormsModule,
        TuiButton,
        Drag,
    ],
    templateUrl: './annotation.component.html',
    styleUrl: './annotation.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class AnnotationComponent {
    public readonly annotation: InputSignal<AnnotationInterface> = input.required();
    public readonly removeEvent: OutputEmitterRef<string> = output();
    public readonly changeAnnotation: OutputEmitterRef<AnnotationInterface> = output();
    public text: string;

    constructor() {
        effect(() => {
            this.text = this.annotation().text;
        });
    }

    public onclickRemove(): void {
        this.removeEvent.emit(this.annotation().id);
    }

    public changePosition(newPosition: DragPosition): void {
        this.changeAnnotation.emit({...this.annotation(), ...newPosition});
    }

    public changeTextAnnotation(text: string): void {
        this.changeAnnotation.emit({...this.annotation(), ...{text}});
    }
}
