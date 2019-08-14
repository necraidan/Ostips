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
      bill: [0],
      tips: [0],
      total: [0],
      percentTips: [15],
      split: [1]
    });

    this.form.get('bill').valueChanges.subscribe(() => {
      this.compute();
    });

    this.form.get('percentTips').valueChanges.subscribe(() => {
      this.compute();
    });
  }

  private compute() {
    const tips = this.form.get('percentTips').value * 0.01 * this.form.get('bill').value;
    const total = parseFloat(this.form.get('bill').value) + tips;

    this.form.get('tips').patchValue(Math.round(tips * 100) / 100);
    this.form.get('total').patchValue(Math.round(total * 100) / 100);
  }

  get percentTips() {
    return this.form.get('percentTips').value;
  }

  get split() {
    return this.form.get('split').value;
  }
}

// [max]="max" [min]="min" [step]="step" [thumbLabel]="thumbLabel" [tickInterval]="tickInterval"
/*
  Bill total
  tip
  total

  tip%
  split
  split total
*/
