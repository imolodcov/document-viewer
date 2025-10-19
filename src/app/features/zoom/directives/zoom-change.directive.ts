import { Directive, effect, ElementRef, inject, OnInit, Signal } from '@angular/core';
import { ZoomService } from '../services/zoom.service';

@Directive({
    selector: '[appZoomChange]',
    standalone: true,
})
export class ZoomChangeDirective implements OnInit {
    private readonly zoomService: ZoomService = inject(ZoomService);
    private readonly el: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly zoomFactor: Signal<number> = this.zoomService.zoomFactor;

    constructor() {
        effect(() => this.zoomChange(this.zoomFactor()));
    }

    public ngOnInit(): void {
        this.el.nativeElement.style.setProperty('transition', 'transform 0.3s ease');
        this.el.nativeElement.style.setProperty('transform-origin', 'center');
    }


    private zoomChange(value: number): void {
        this.el.nativeElement.style.setProperty('transform', `scale(${ value / 100 })`);
    }
}
