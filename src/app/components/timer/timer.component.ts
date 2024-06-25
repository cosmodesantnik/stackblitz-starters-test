import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  finalize,
  map,
  shareReplay,
  startWith,
  take,
  tap,
  timer,
} from 'rxjs';

import { MinutePipe } from '../../pipes/minute.pipe';
import { SecondsPipe } from '../../pipes/seconds.pipe';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, MinutePipe, SecondsPipe],
  templateUrl: 'timer.component.html',
  styleUrl: 'timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {
  @Input() startTime = 2 * 60;
  @Input() timeDanger = 30;
  @Output() timeStop = new EventEmitter<void>();
  protected time$!: Observable<number>;
  protected timeStop$ = new BehaviorSubject(false);
  protected timeDanger$ = new BehaviorSubject(false);

  ngOnInit() {
    this.time$ = timer(0, 1000).pipe(
      take(this.startTime + 1),
      map(() => this.startTime--),
      tap((num) => {
        if (num <= this.timeDanger) {
          this.timeDanger$.next(true);
        }
      }),
      finalize(() => {
        this.timeStop.emit();
        this.timeDanger$.next(false);
        this.timeStop$.next(true);
      }),
      shareReplay()
    );
  }
}
