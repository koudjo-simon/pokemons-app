import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[pkmnBorderCard]",
})
export class BorderCardDirective {
  private initialColor: string = "#f5f5f5";
  private defaultColor: string = "#009688";
  private defaultHeight: number = 100;

  constructor(private el: ElementRef) {
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
  }

  @Input("pkmnBorderCard") borderColor: string; // alias
  // @Input() pkmnBorderCard: string; // ans alias

  // Quand on survaule un pokemon de la liste
  @HostListener("mouseenter") onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }
  // Quand on quitte après avoir survolé un pokemon de la liste
  @HostListener("mouseleave") onMouseLeave() {
    this.setBorder(this.initialColor);
  }

  setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}`;
  }

  setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }
}
