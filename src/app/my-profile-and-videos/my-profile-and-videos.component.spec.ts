import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileAndVideosComponent } from './my-profile-and-videos.component';

describe('MyProfileAndVideosComponent', () => {
  let component: MyProfileAndVideosComponent;
  let fixture: ComponentFixture<MyProfileAndVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProfileAndVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileAndVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
