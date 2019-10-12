import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      bill: [],
      tips: [0],
      total: [0],
      percentTips: [15],
      split: [1],
      partOfBillIndividualy: [0],
      tipsIndividualy: [0],
      totalIndividualy: [0]
    });

    this.form.get('bill').valueChanges.subscribe(() => {
      this.compute();
    });

    this.form.get('percentTips').valueChanges.subscribe(() => {
      this.compute();
    });

    this.form.get('split').valueChanges.subscribe(() => {
      this.compute();
    });
  }

  private compute() {
    const tips = this.form.get('percentTips').value * 0.01 * this.form.get('bill').value;
    const bill = parseFloat(this.form.get('bill').value);
    const total = bill + tips;

    if (isNaN(total)) {
      return;
    }
    const split = this.form.get('split').value;

    const newTips = this.round(tips);
    const newTotal = this.round(total);
    this.form.get('tips').patchValue(newTips);
    this.form.get('total').patchValue(newTotal);

    if (split > 1) {
      this.form.get('partOfBillIndividualy').patchValue(this.round(bill / split));
      this.form.get('tipsIndividualy').patchValue(this.round(newTips / split));
      this.form.get('totalIndividualy').patchValue(this.round(newTotal / split));
    } else {
      this.form.get('partOfBillIndividualy').patchValue(0);
      this.form.get('tipsIndividualy').patchValue(0);
      this.form.get('totalIndividualy').patchValue(0);
    }
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  get percentTips() {
    return this.form.get('percentTips').value;
  }

  get split() {
    return this.form.get('split').value;
  }
}
