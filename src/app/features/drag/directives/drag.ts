import {
    Directive,
    ElementRef,
    HostListener,
    inject,
    input,
    InputSignal,
    OnInit,
    output,
    OutputEmitterRef,
    Renderer2,
} from '@angular/core';
import { DragPosition } from '../interfaces/drag-position.interface';

@Directive({
    selector: '[appDrag]',
    standalone: true,
})
export class Drag implements OnInit {
    public readonly initialPosition: InputSignal<DragPosition> = input({x: 0, y: 0}, {alias: 'appDrag'});
   public readonly dragHandle: InputSignal< string | null> = input( null);
    public readonly changePosition: OutputEmitterRef<DragPosition> = output();

    private readonly el: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly renderer: Renderer2 = inject(Renderer2);

    private isDragging = false;

    private startX = 0;
    private startY = 0;
    private startElementX = 0;
    private startElementY = 0;

    private handleElement: HTMLElement | null = null;

    public ngOnInit(): void {
        this.setPosition(this.initialPosition().x, this.initialPosition().y);

        if (this.dragHandle()) {
            this.handleElement = this.el.nativeElement.querySelector(this.dragHandle());
        }

        this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
        this.renderer.setStyle(this.el.nativeElement, 'cursor', this.dragHandle() ? 'default' : 'move');
    }

    private isDragTarget(target: HTMLElement): boolean {
        if (!this.dragHandle()) {
            return target === this.el.nativeElement;
        }
        return this.handleElement?.contains(target) ?? false;
    }

    @HostListener('mousedown', ['$event'])
    public onMouseDown(event: MouseEvent): void {
        if (!this.isDragTarget(event.target as HTMLElement)) {
            return;
        }

        const style: CSSStyleDeclaration = getComputedStyle(this.el.nativeElement);
        this.startElementX = parseFloat(style.left) || 0;
        this.startElementY = parseFloat(style.top) || 0;

        this.startX = event.clientX;
        this.startY = event.clientY;

        this.isDragging = true;
        event.preventDefault();
    }

    @HostListener('document:mousemove', ['$event'])
    public onMouseMove(event: MouseEvent): void {
        if (!this.isDragging) return;

        const deltaX = event.clientX - this.startX;
        const deltaY = event.clientY - this.startY;

        const newX = this.startElementX + deltaX;
        const newY = this.startElementY + deltaY;

        this.setPosition(newX, newY);
    }

    @HostListener('document:mouseup')
    public onMouseUp(): void {
        this.isDragging = false;
        const style: CSSStyleDeclaration = getComputedStyle(this.el.nativeElement);
        this.changePosition.emit({x: parseFloat(style.left), y: parseFloat(style.top)});
    }

    private setPosition(x: number, y: number): void {
        this.renderer.setStyle(this.el.nativeElement, 'left', `${ x }px`);
        this.renderer.setStyle(this.el.nativeElement, 'top', `${ y }px`);
    }
}
