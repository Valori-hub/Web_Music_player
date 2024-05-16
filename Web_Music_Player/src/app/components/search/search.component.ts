import { Component, OnDestroy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { HttpService } from '../../http-service.service';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 400;
  inputText: string = '';
  constructor(private httpClient: HttpService,){}
  ngOnInit() {
    this.searchSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {
      this.performSearch(searchValue);
    });
  }
  ngOnDestroy() {
    this.searchSubject.complete();
  }
  onSearch(searchValue: string) {
    this.searchSubject.next(searchValue);
  }
  performSearch(searchValue: string) {
    if(searchValue !== ''){
      console.log('Performing search for:', searchValue);
      this.httpClient.search(searchValue).subscribe(
        (response:any) => {
          console.log('idk')
        })
      // ... Your search logic ...
    }

  }
}
