import { TestBed } from '@angular/core/testing';

import { TasksGridService } from './tasks-grid.service';

describe('TasksGridService', () => {
  let service: TasksGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
