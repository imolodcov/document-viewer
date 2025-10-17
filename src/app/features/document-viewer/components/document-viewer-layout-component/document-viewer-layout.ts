import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { UpperCaseFirstPipe } from '../../pipes';
import { TuiButton, TuiGroup } from '@taiga-ui/core';

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

}
