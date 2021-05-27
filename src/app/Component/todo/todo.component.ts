import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../Services/todo.service';
import {switchMap, tap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoList$: ITodo[];
  message: FormControl = new FormControl('');

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodo().subscribe((todo: ITodo[]) => {
      this.todoList$ = todo;
    });
  }

  /**
   * Création d'une nouvelle tache
   */
  create() {
    const data: {message: string} = {message: this.message.value};
    this.todoService.createTodo(data).pipe(
      switchMap(() => this.todoService.getTodo()),
      tap((todo: ITodo[]) => this.todoList$ = todo)
    ).subscribe();
  }

  /**
   * Suppression d'une tache
   */
  delete(id: number) {
    this.todoService.deleteTodo(id).pipe(
      switchMap(() => this.todoService.getTodo()),
      tap((todo: ITodo[]) => this.todoList$ = todo)
    ).subscribe();
  }

  /**
   * Mets a jour la tache si checked
   * @param event any
   * @param id number
   */
  checked(event: any, id: number) {
    const data = {checked: event.target.checked};
    this.todoService.updateTodo(data, id).subscribe();
  }

}
