import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinComponent } from './coin.component';

describe('CoinComponent', () => {
  let component: CoinComponent;
  let fixture: ComponentFixture<CoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
