import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './todo-form.html',
})
export class TodoForm {
  @Output() save = new EventEmitter<string>();

  protected todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  get title() {
    return this.todoForm.get('title') as FormControl;
  }

  handleFormSubmit() {
    if (this.todoForm.invalid) {
      return;
    }

    this.save.emit(this.title.value);
    this.todoForm.reset();
  }
}
