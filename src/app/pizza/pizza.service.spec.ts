import { TestBed, inject } from '@angular/core/testing';

import { PizzaServiceService } from './pizza-service.service';

describe('PizzaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PizzaServiceService]
    });
  });

  it('should be created', inject([PizzaServiceService], (service: PizzaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
