import { Component } from '@angular/core';
import { Todo } from '../../types/todo';
import { TodosService } from '../../services/todos';
import { MessageService } from '../../services/message';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Status } from '../../types/status';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoForm } from '../todo-form/todo-form';
import { TodoComponent } from '../todo/todo';
import { Message } from '../message/message';
import { Filter } from '../filter/filter';

@Component({
  selector: 'app-todos-page',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TodoForm,
    TodoComponent,
    Message,
    Filter,
  ],
  templateUrl: './todos-page.html',
})
export class TodosPage {
  todos$;
  activeTodos$;
  completedTodos$;
  activeCount$;
  visibleTodos$;

  constructor(
    private todosService: TodosService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) {
    this.todos$ = this.todosService.todos$;
    this.activeTodos$ = this.todos$.pipe(map((todos) => todos.filter((t) => !t.completed)));
    this.completedTodos$ = this.todos$.pipe(map((todos) => todos.filter((t) => t.completed)));
    this.activeCount$ = this.activeTodos$.pipe(map((todos) => todos.length));
    this.visibleTodos$ = this.route.params.pipe(
      switchMap((params) => {
        const status = (params['status'] as Status) || 'all';
        console.log('Filter status:', status);
        switch (status) {
          case 'active':
            return this.activeTodos$;
          case 'completed':
            return this.completedTodos$;
          default:
            return this.todos$;
        }
      }),
    );
  }

  ngOnInit(): void {
    this.todosService.getTodos().subscribe({
      error: () => {
        this.messageService.showMessage('Unable to load todos');
      },
    });
  }

  handleTodoToggle(event: Event, todo: Todo) {
    todo.completed = (event.target as HTMLInputElement).checked;
  }

  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle).subscribe({
      error: () => {
        this.messageService.showMessage('Failed to add a todo');
      },
    });
  }

  renameTodo(todo: Todo, title: string) {
    this.todosService.updateTodo({ ...todo, title }).subscribe({
      error: () => {
        this.messageService.showMessage('Failed to update a todo');
      },
    });
  }

  toggleTodo(todo: Todo) {
    this.todosService.updateTodo({ ...todo, completed: !todo.completed }).subscribe({
      error: () => {
        this.messageService.showMessage('Failed to update a todo');
      },
    });
  }

  deleteTodo(todo: Todo) {
    this.todosService.deleteTodo(todo).subscribe({
      error: () => {
        this.messageService.showMessage('Failed to delete a todo');
      },
    });
  }
}
