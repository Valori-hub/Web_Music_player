import { HttpService } from './http-service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor(private httpClient: HttpService) {}
}
