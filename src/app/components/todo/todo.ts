import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Todo } from '../../types/todo';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './todo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnChanges {
  @Output() delete = new EventEmitter();
  @Output() toggle = new EventEmitter();
  @Output() rename = new EventEmitter<string>();

  @Input() todo!: Todo;

  @ViewChild('titleField')
  set titleField(field: ElementRef) {
    if (field) {
      field.nativeElement.focus();
    }
  }

  protected editing = signal(false);
  protected title = signal('');

  constructor() {}

  ngOnChanges({ todo }: SimpleChanges): void {
    if (todo.currentValue.title !== todo.previousValue?.title) {
      this.title.set(todo.currentValue.title);
    }
  }

  edit() {
    this.editing.set(true);
    this.title.set(this.todo.title);
  }

  save() {
    if (!this.editing()) {
      return;
    }
    this.editing.set(false);
    this.rename.emit(this.title());
  }
}
