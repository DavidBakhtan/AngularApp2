
// src/app/components/todo/todo.component.ts
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Inject,
  PLATFORM_ID,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { from } from 'rxjs';
import { TaskModel } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ReminderService } from '../../services/reminder.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { fromRawTimestamp, RawTimestamp } from 'src/app/utils';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    TaskItemComponent,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoComponent implements OnInit, AfterViewInit {
  today = new Date();
  tasks: TaskModel[] = [];
  @ViewChild('picker') picker!: any;

  editingTaskId: string | null = null;
  showAddForm = false;
  editedTaskTitle = '';
  editedTaskDescription = '';
  editedTaskDate = '';
  editedTaskTime = '';
  editedReminderValue: number | null = null;
  editedReminderUnit: 'minutes' | 'hours' | 'days' | 'weeks' = 'minutes';
  editedTaskLabel = '';
  editedTaskImageUrl = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private taskService: TaskService,
    private reminder: ReminderService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (
      isPlatformBrowser(this.platformId) &&
      'Notification' in window &&
      Notification.permission !== 'granted'
    ) {
      Notification.requestPermission();
    }

    this.taskService.getTasks().subscribe(rawTasks => {
      this.tasks = rawTasks.map(t => {
        let dateStr: string;
        if (typeof t.date !== 'string') {
          const ts = t.date as unknown as RawTimestamp;
          dateStr = fromRawTimestamp(ts).toISOString().split('T')[0];
        } else {
          dateStr = t.date;
        }
        return { ...t, date: dateStr } as TaskModel;
      });

      this.tasks.forEach(task => {
        if (task.reminder && task.date && task.time) {
          this.reminder.scheduleFromStrings(
            task.id,
            task.date,
            task.time,
            task.reminder.value,
            task.reminder.unit,
            task.title
          );
        }
      });

      this.cd.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this.setDefaultTime();
    this.cd.markForCheck();
  }

  private setDefaultTime(): void {
    this.editedTaskTime = new Date().toTimeString().slice(0, 5);
  }

  onDateChange(): void {
    if (!this.editedTaskTime) this.setDefaultTime();
    setTimeout(() => this.picker.open(), 100);
    this.cd.markForCheck();
  }

  onSubmit(): void {
    if (!this.editedTaskTitle.trim() || !this.editedTaskImageUrl.trim()) return;

    const payload: TaskModel = {
      id: this.editingTaskId ?? Date.now().toString(),
      title: this.editedTaskTitle.trim(),
      description: this.editedTaskDescription.trim(),
      date: this.editedTaskDate,
      time: this.editedTaskTime,
      completed: false,
      reminder:
        this.editedReminderValue !== null
          ? { value: this.editedReminderValue, unit: this.editedReminderUnit }
          : undefined,
      label: this.editedTaskLabel,
      imageUrl: this.editedTaskImageUrl.trim()
    };

    const save$ = this.editingTaskId
      ? this.taskService.updateTask(payload)
      : this.taskService.addTask(payload);

    from(save$).subscribe(() => {
      if (this.editingTaskId) {
        const idx = this.tasks.findIndex(t => t.id === payload.id);
        if (idx > -1) this.tasks[idx] = payload;
      } else {
        this.tasks.push(payload);
      }

      if (payload.reminder && payload.date && payload.time) {
        this.reminder.scheduleFromStrings(
          payload.id,
          payload.date,
          payload.time,
          payload.reminder.value,
          payload.reminder.unit,
          payload.title
        );
      }


      this.cleanupForm();
      this.showAddForm = false;
      this.cd.markForCheck();
    });
  }

  onToggleTask(task: TaskModel): void {
    const updated = { ...task, completed: !task.completed };
    from(this.taskService.updateTask(updated)).subscribe(() => {
      this.tasks = this.tasks.map(t => (t.id === updated.id ? updated : t));
      if (updated.completed) this.reminder.cancel(updated.id);
      this.cd.markForCheck();
    });
  }

  onDeleteTask(id: string): void {
    this.reminder.cancel(id);
    from(this.taskService.deleteTask(id)).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.cd.markForCheck();
    });
  }

  startEditTask(task: TaskModel): void {
    this.editingTaskId = task.id;
    this.editedTaskTitle = task.title;
    this.editedTaskDescription = task.description || '';
    this.editedTaskDate =
      typeof task.date === 'string'
        ? task.date
        : fromRawTimestamp(task.date as unknown as RawTimestamp)
          .toISOString()
          .split('T')[0];
    this.editedTaskTime = task.time ?? '';
    this.editedReminderValue = task.reminder?.value ?? null;
    this.editedReminderUnit = task.reminder?.unit ?? 'minutes';
    this.editedTaskLabel = task.label || '';
    this.editedTaskImageUrl = task.imageUrl || '';
    this.showAddForm = true;
    this.cd.markForCheck();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) this.cleanupForm();
    this.cd.markForCheck();
  }

  cancelEdit(): void {
    this.cleanupForm();
    this.showAddForm = false;
    this.cd.markForCheck();
  }

  private cleanupForm(): void {
    this.editingTaskId = null;
    this.editedTaskTitle = '';
    this.editedTaskDescription = '';
    this.editedTaskDate = '';
    this.editedTaskTime = '';
    this.editedReminderValue = null;
    this.editedReminderUnit = 'minutes';
    this.editedTaskLabel = '';
    this.editedTaskImageUrl = '';
  }

  get completedCount(): number {
    this.cd.markForCheck();
    return this.tasks.filter(t => t.completed).length;
  }

  get progressPercent(): number {
    this.cd.markForCheck();
    return this.tasks.length
      ? Math.round((this.completedCount / this.tasks.length) * 100)
      : 0;
  }
}
