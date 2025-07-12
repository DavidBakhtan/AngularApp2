import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { TaskModel } from 'src/app/models/task.model';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent]  // ✅ لأن component standalone
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;

    component.task = {
      id: "1",
      title: 'Test Task',
      completed: false
    } as TaskModel;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle task', () => {
    spyOn(component.toggle, 'emit');
    component.onToggle();
    expect(component.toggle.emit).toHaveBeenCalledWith(component.task); // ✅ task object, not just id
  });
});
