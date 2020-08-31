import { Observable } from 'rxjs';

export default interface DataBase {
  list(): Observable<any[]>;
  add(data): Promise<any>;
  update(key: string, data): Promise<any>;
  set(key: string, data): Promise<any>;
  delete(key?: string): Promise<any>;
  get?(key: string): Observable<any>;
  filterByCategory?(category): void;
  setLimit?(num: number);
}
