import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable()
export class ZoomService {
    private readonly zoomFactorState: WritableSignal<number> = signal<number>(100);
    public readonly zoomFactor: Signal<number> = computed(() => this.zoomFactorState());

    public changeZoomFactor(zoomFactor: number): void {
        this.zoomFactorState.set(zoomFactor);
    };
}
