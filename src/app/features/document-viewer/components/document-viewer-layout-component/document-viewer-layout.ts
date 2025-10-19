import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
    InputSignal,
    output, OutputEmitterRef,
    Signal,
} from '@angular/core';
import { UpperCaseFirstPipe } from '../../pipes';
import { TuiButton, TuiGroup } from '@taiga-ui/core';
import { ZoomService } from '../../../zoom';

@Component({
    selector: 'app-document-viewer-layout-component',
    templateUrl: './document-viewer-layout.html',
    styleUrl: './document-viewer-layout.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        UpperCaseFirstPipe,
        TuiGroup,
        TuiButton,
    ],
})
export class DocumentViewerLayoutComponent {
    public readonly title: InputSignal<string> = input.required();
    public readonly save: OutputEmitterRef<void> = output();
    private readonly zoomService: ZoomService = inject(ZoomService);
    public readonly zoomFactor = this.zoomService.zoomFactor;
    public readonly blockDownZoom: Signal<boolean> = computed(()=> this.zoomFactor()<= 5);


    public upZoom(): void {
        this.zoomService.changeZoomFactor(this.zoomFactor() + 5);
    }

    public downZoom(): void {
        if (this.blockDownZoom()) {
            return;
        }
        this.zoomService.changeZoomFactor(this.zoomFactor() - 5);
    }
}
