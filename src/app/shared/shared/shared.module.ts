import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSliderModule, MatCardModule],
  exports: [MatFormFieldModule, MatInputModule, MatSliderModule, MatCardModule]
})
export class SharedModule {}
