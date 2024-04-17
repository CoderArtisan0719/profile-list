import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private apiUrl = 'https://dummyjson.com/users?limit=100';
  private usersSubject = new BehaviorSubject<User[]>(this.loadInitialData());
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  private loadInitialData(): User[] {
    const storedData = localStorage.getItem('users');
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      this.fetchUsers().subscribe();
      return [];
    }
  }

  fetchUsers(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(this.apiUrl).pipe(
      map(response => response.users),  // Transforming the data structure here
      tap(users => {
        this.usersSubject.next(users);
        localStorage.setItem('users', JSON.stringify(users));
      }),
      catchError(error => {
        console.error('Failed to fetch users', error);
        return throwError(() => new Error('Failed to fetch users'));
      })
    );
  }

  addUser(user: User): void {
    const users = this.getUsers();
    const maxId = users.length > 0 ? Math.max(...users.map(u => u.id!)) : 0; // Use non-null assertion operator !
    const newUser = { ...user, id: maxId + 1 }; // Generate new id
    users.push(newUser);
    this.usersSubject.next(users);
    localStorage.setItem('users', JSON.stringify(users));
  }

   updateUser(user: User): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      this.usersSubject.next(users);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  deleteUser(userId: number): void {
    const users = this.getUsers().filter(u => u.id !== userId);
    this.usersSubject.next(users);
    localStorage.setItem('users', JSON.stringify(users));
  }

  private getUsers(): User[] {
    return this.usersSubject.value;
  }
}
