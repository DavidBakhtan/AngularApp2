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
  encapsulation: ViewEncapsulation.None,
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
    MatProgressBarModule,
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, AfterViewInit {
  today: Date = new Date();
  tasks: TaskModel[] = [];
  @ViewChild('picker') picker!: any;

  // form model (for both add & edit)
  editingTaskId: string | null = null;
  showAddForm = false;

  editedTaskTitle       = '';
  editedTaskDescription = '';
  editedTaskDate        = '';
  editedTaskTime        = '';
  editedReminderValue: number | null = null;
  editedReminderUnit: 'minutes'|'hours'|'days'|'weeks' = 'minutes';
  editedTaskLabel       = '';
  editedTaskImageUrl    = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private taskService: TaskService,
    private reminderService: ReminderService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // 1) طلب صلاحيات الإشعارات في المتصفح فقط
    if (isPlatformBrowser(this.platformId) && 'Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    
    // 2) جلب المهام من Firebase، تحويل Timestamp إلى "YYYY-MM-DD"، ثم جدولة التنبيهات
    this.taskService.getTasks().subscribe(rawTasks => {
      this.tasks = rawTasks.map(t => {
        let dateStr: string;
        // إذا كان t.date من نوع RawTimestamp
        if (t.date && typeof (t.date as any).seconds === 'number') {
          const ts = (t.date as unknown) as RawTimestamp;
          const d = fromRawTimestamp(ts);
          dateStr = d.toISOString().split('T')[0];
        } else {
          dateStr = t.date as string;
        }
        return { ...t, date: dateStr };
      });
      this.tasks.forEach(task => this.reminderService.scheduleReminder(task));
      this.cd.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this.setDefaultTime();
    this.cd.markForCheck();
  }

  /** يملأ الوقت الافتراضي عند فتح الفورم */
  private setDefaultTime(): void {
    const now = new Date().toTimeString().substring(0,5);
    this.editedTaskTime = now;
  }

  onDateChange(): void {
    if (!this.editedTaskTime) {
      this.setDefaultTime();
    }
    // بعد اختيار التاريخ افتح الـ timepicker
    setTimeout(() => this.picker?.open(), 100);
    this.cd.markForCheck();
  }

  /** تضيف أو تعدل المهمة بناءً على الحالة الحالية */
  onSubmit(): void {
    if (!this.editedTaskTitle.trim()) return;
    if (!this.editedTaskImageUrl.trim()) {
      alert('Image URL is required');
      return;
    }

    const payload: TaskModel = {
      id:         this.editingTaskId ?? Date.now().toString(),
      title:      this.editedTaskTitle.trim(),
      description:this.editedTaskDescription.trim(),
      date:       this.editedTaskDate,
      time:       this.editedTaskTime,
      completed:  false,
      reminder:   this.editedReminderValue != null
                  ? { value: this.editedReminderValue, unit: this.editedReminderUnit }
                  : undefined,
      label:      this.editedTaskLabel,
      imageUrl:   this.editedTaskImageUrl.trim()
    };

    if (this.editingTaskId) {
      // تعديل
      from(this.taskService.updateTask(payload)).subscribe(() => {
        const idx = this.tasks.findIndex(t => t.id === payload.id);
        if (idx > -1) {
          this.tasks[idx] = payload;
          this.reminderService.scheduleReminder(payload);
        }
        this.cleanupForm();
        this.showAddForm = false;
        this.cd.markForCheck();
      });
    } else {
      // إضافة
      from(this.taskService.addTask(payload)).subscribe(() => {
        this.tasks.push(payload);
        this.reminderService.scheduleReminder(payload);
        this.cleanupForm();
        this.showAddForm = false;
        this.cd.markForCheck();
      });
    }
  }

  onToggleTask(task: TaskModel): void {
    // 1) احسب الحالة الجديدة
    const newCompleted = !task.completed;

    // 2) جهّز الكائن المُحدَّث
    const updated: TaskModel = { ...task, completed: newCompleted };

    // 3) أرسل التحديث للسيرفر
    from(this.taskService.updateTask(updated)).subscribe(() => {
      // 4) ابنِ مصفوفة جديدة للمهام لضمان إعادة الرندر
      this.tasks = this.tasks.map(t =>
        t.id === updated.id ? updated : t
      );

      // 5) إجبر Angular على فحص التغييرات
      this.cd.markForCheck();
    });
  }

  onDeleteTask(id: string): void {
    from(this.taskService.deleteTask(id)).subscribe(() => {
      // مصفوفة جديدة بعد الحذف
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.cd.markForCheck();
    });
  }

  startEditTask(task: TaskModel): void {
    this.editingTaskId         = task.id;
    this.editedTaskTitle       = task.title;
    this.editedTaskDescription = task.description || '';
    // إن كان التاريخ خامًّا Timestamp
   if (task.date && typeof (task.date as any).seconds === 'number') {
   const raw = (task.date as unknown) as RawTimestamp;
   const d   = fromRawTimestamp(raw);
      this.editedTaskDate = d.toISOString().split('T')[0];
    } else {
      this.editedTaskDate = task.date as string;
    }
    this.editedTaskTime      = task.time || '';
    this.editedReminderValue = task.reminder?.value ?? null;
    this.editedReminderUnit  = task.reminder?.unit  ?? 'minutes';
    this.editedTaskLabel     = task.label || '';
    this.editedTaskImageUrl  = task.imageUrl || '';
    this.showAddForm         = true;
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
    this.editingTaskId        = null;
    this.editedTaskTitle      = '';
    this.editedTaskDescription= '';
    this.editedTaskDate       = '';
    this.editedTaskTime       = '';
    this.editedReminderValue  = null;
    this.editedReminderUnit   = 'minutes';
    this.editedTaskLabel      = '';
    this.editedTaskImageUrl   = '';
  }

  get completedCount(): number {
    this.cd.markForCheck();
    return this.tasks.filter(t => t.completed).length;
  }

  get progressPercent(): number {
    this.cd.markForCheck();
    return this.tasks.length
      ? Math.round(this.completedCount / this.tasks.length * 100)
      : 0;
  }
}
