import { ChangeDetectionStrategy, Component, computed, input, InputSignal, Signal } from '@angular/core';
import { PageInterface } from '../../interfaces';

@Component({
    selector: 'app-page-view',
    templateUrl: './page-view.component.html',
    styleUrl: './page-view.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class PageViewComponent {
    public readonly page: InputSignal<PageInterface> = input.required();
    public readonly pageUrl: Signal<string> = computed(() => `assets/${ this.page().imageUrl }`);
}
