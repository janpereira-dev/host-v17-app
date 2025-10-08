import { Directive, HostListener } from '@angular/core';
import { PerformanceTimingService } from './performance-timing.service';

@Directive({
  selector: '[perfRouterLink]',
  standalone: true,
})
export class RouterLinkTimingDirective {
  constructor(private perf: PerformanceTimingService) {}

  @HostListener('click')
  onClick() {
    this.perf.markClickStart();
  }
}
