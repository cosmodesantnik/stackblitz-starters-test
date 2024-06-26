import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { IPlan } from '../../model/plan';
import { SalePipe } from '../../pipes/sale.pipe';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, SalePipe],
  templateUrl: 'dialog.component.html',
  styleUrl: 'dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  private cdr = inject(ChangeDetectorRef);
  @Input() show = false;
  @Input() plans: IPlan[] = [];
  @Output() close = new EventEmitter<void>();
  protected sales = [30, 50, 60];
  protected selectdeIndex = 1;

  protected onClose() {
    this.show = false;
    this.close.next();
    this.cdr.markForCheck();
  }
}
