import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {api} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  constructor(private http: HttpClient) { }

  /**
   * Récupération de toutes les taches
   * @return Observable<ITodo[]>
   */
  getTodo(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(api.back + '/todo');
  }

  /**
   * Création d'une nouvelle tâche
   * @param data object
   * @return Observable<ITodo[]>
   */
  createTodo(data) {
    return this.http.post(api.back + '/todo', data, this.httpOptions);
  }

  /**
   * Suppression d'une tâche
   * @param id object
   * @return Observable<ITodo[]>
   */
  deleteTodo(id: number): Observable<ITodo[]> {
    return this.http.delete<ITodo[]>(api.back + '/todo/' + id);
  }

  /**
   * MAJ d'une tâche
   * @param data object
   * @param id number
   * @return Observable<ITodo[]>
   */
  updateTodo(data, id: number): Observable<ITodo[]> {
    return this.http.put<ITodo[]>(api.back + '/todo/' + id, data, this.httpOptions);
  }
}
