import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  #formBuilder = inject(FormBuilder);
  form: FormGroup = this.#formBuilder.group({
    bill: [],
    tips: [0],
    total: [0],
    percentTips: [15],
    split: [1],
    partOfBillIndividualy: [0],
    tipsIndividualy: [0],
    totalIndividualy: [0],
  });

  ngOnInit(): void {
    this.form.get('bill')!.valueChanges.subscribe(() => {
      this.compute();
    });

    this.form.get('percentTips')!.valueChanges.subscribe(() => {
      this.compute();
    });

    this.form.get('split')!.valueChanges.subscribe(() => {
      this.compute();
    });
  }

  private compute() {
    const tips =
      (this.form.get('percentTips')?.value ?? 0) *
      0.01 *
      (this.form.get('bill')?.value ?? 0);
    const bill = parseFloat(this.form.get('bill')?.value ?? '0');
    const total = bill + tips;

    if (isNaN(total)) {
      return;
    }
    const split = this.form.get('split')?.value ?? 1;

    const newTips = this.round(tips);
    const newTotal = this.round(total);
    this.form.get('tips')!.patchValue(newTips);
    this.form.get('total')!.patchValue(newTotal);

    if (split > 1) {
      this.form
        .get('partOfBillIndividualy')!
        .patchValue(this.round(bill / split));
      this.form.get('tipsIndividualy')?.patchValue(this.round(newTips / split));
      this.form
        .get('totalIndividualy')!
        .patchValue(this.round(newTotal / split));
    } else {
      this.form.get('partOfBillIndividualy')?.patchValue(0);
      this.form.get('tipsIndividualy')?.patchValue(0);
      this.form.get('totalIndividualy')?.patchValue(0);
    }
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  get percentTips() {
    return this.form.get('percentTips')?.value ?? 0;
  }

  get split() {
    return this.form.get('split')?.value ?? 0;
  }
}
