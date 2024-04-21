import { HttpClient } from  '@angular/common/http';
import { Injectable } from  '@angular/core';

@Injectable({
providedIn:  'root'
})
export class HttpService {
private url = 'http://localhost:3000/'
constructor(private http: HttpClient) { }
getSongsByGenre(){
  return this.http.get(this.url + 'songs/list-byGenre');
}
}
