import { Routes } from '@angular/router';
import { TodosPage } from './components/todos-page/todos-page';

export const routes: Routes = [
  { path: 'todos/:status', component: TodosPage },
  { path: '', redirectTo: 'todos/all', pathMatch: 'full' },
];
