import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appPressEffect]'
})
export class PressEffectDirective {

  @HostBinding('class.pressed') isPressed = false;

  /* MÓVIL */
  @HostListener('touchstart')
  onTouchStart() {
    this.isPressed = true;
  }

  @HostListener('touchend')
  @HostListener('touchcancel')
  onTouchEnd() {
    this.isPressed = false;
  }

  /* DESKTOP */
  @HostListener('mousedown')
  onMouseDown() {
    this.isPressed = true;
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  onMouseUp() {
    this.isPressed = false;
  }
}