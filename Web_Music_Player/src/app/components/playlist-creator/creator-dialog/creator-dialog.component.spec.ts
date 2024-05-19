import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorDialogComponent } from './creator-dialog.component';

describe('CreatorDialogComponent', () => {
  let component: CreatorDialogComponent;
  let fixture: ComponentFixture<CreatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
