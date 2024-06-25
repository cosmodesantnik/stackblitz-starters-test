import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { BehaviorSubject, map, combineLatest, shareReplay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IPlan } from './models/plan';
import { TimerComponent } from './components/timer/timer.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SalePipe } from './pipes/sale.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TimerComponent, DialogComponent, SalePipe],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private cdr = inject(ChangeDetectorRef);
  private http = inject(HttpClient);
  protected sales = [30, 40, 50, 70];
  protected salesText = [
    'Чтобы просто <br/> начать 👍🏻',
    'Привести тело <br/> впорядок 💪🏻',
    'Изменить <br/> образ жизни 🔥',
    'Всегда быть в форме и поддерживать своё <br/> здоровье ⭐️',
  ];
  protected timeStop$ = new BehaviorSubject<boolean>(false);
  protected plans$ = this.http
    .get<IPlan[]>('https://t-pay.iqfit.app/subscribe/list-test')
    .pipe(shareReplay(1));

  protected plans1$ = combineLatest([this.plans$, this.timeStop$]).pipe(
    map(([list, stop]) => {
      if (stop) {
        return list.filter((a: IPlan) => !a.isPopular && !a.isDiscount);
      } else {
        return list.filter((a: IPlan) => a.isPopular);
      }
    })
  );
  protected plansDialog$: Observable<IPlan[]> = this.plans$.pipe(
    map((list: any) => list.filter((a: IPlan) => a.isDiscount)),
    map((list: []) => list.slice(0, 3))
  );

  protected onTimeStop() {
    this.timeStop$.next(true);
    this.cdr.markForCheck();
  }
}
