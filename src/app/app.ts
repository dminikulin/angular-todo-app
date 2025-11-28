import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterOutlet],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
