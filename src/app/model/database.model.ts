import { Observable } from 'rxjs';

export default interface DataBase<T> {
  list(path, options?: Object): Observable<T[]>;
  add(path, value): Promise<any>;
  update(path, key, value): Promise<any>;
  delete(path, key?): Promise<any>;
}
