import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskModel } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ViewChild, ElementRef } from '@angular/core';



@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskItemComponent, NgxMaterialTimepickerModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tasks: TaskModel[] = [];
  @ViewChild('picker') picker: any;


  // New Task Inputs
  newTaskTitle = '';
  newTaskDescription = '';
  newTaskTime: string = ''; // Ensure it's a string
  newTaskDate: string = ''; // Optional
  newTaskReminderValue: number | null = null;
  newTaskReminderUnit: 'minutes' | 'hours' | 'days' | 'weeks' = 'minutes';
  newTaskLabel = '';
  newTaskImageUrl = '';

  // Edit Task Inputs
  editedTaskTitle = '';
  editedTaskDescription: string | undefined = '';
  editedTaskDate: string | undefined = '';
  editedTaskTime: string | undefined = '';

  editedReminderValue: number | null = null;
  editedReminderUnit: 'minutes' | 'hours' | 'days' | 'weeks' = 'minutes';
  editedTaskLabel = '';
  editedTaskImageUrl = '';

  // UI States
  editingTaskId: string | null = null;
  showAddForm = false;

  constructor(private taskService: TaskService) { }

  sanitizeReminder(value: any): number | null {
    const parsed = parseInt(value);
    if (isNaN(parsed) || parsed < 0) {
      return null;
    }
    return parsed;
  }


  ngOnInit(): void {
    this.loadTasks();
  }

  // 🔄 Load tasks from service
  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  // 📆 Handle auto-filling time on date select
  ngAfterViewInit() {
    this.setDefaultTime();
  }
  setDefaultTime(forEdit: boolean = true): void {
    const now = new Date();
    const formattedTime = now.toTimeString().substring(0, 5);
    if (forEdit) {
      this.editedTaskTime = formattedTime;
    } else {
      this.newTaskTime = formattedTime;
    }
  }


  onDateChange(): void {
    if (!this.editedTaskTime) {
      const now = new Date();
      this.editedTaskTime = now.toTimeString().substring(0, 5); // "HH:MM"
    }

    // افتح الـ timepicker مباشرة بعد اختيار التاريخ
    setTimeout(() => this.openTimepicker(), 200);
  }

  openTimepicker(): void {
    if (this.picker && this.picker.open) {
      this.picker.open();
    }
  }

  // ➕ Add new task
  addTask(): void {
    if (!this.editedTaskTitle.trim()) return;

    const newTask: TaskModel = {
      id: Date.now().toString(),
      title: this.editedTaskTitle,
      description: this.editedTaskDescription,
      date: this.editedTaskDate,
      time: this.editedTaskTime,
      completed: false,
      reminder: this.editedReminderValue && this.editedReminderUnit ? {
        value: this.editedReminderValue,
        unit: this.editedReminderUnit
      } : undefined,
      label: this.editedTaskLabel,
      imageUrl: this.editedTaskImageUrl
    };
    if (!this.editedTaskImageUrl.trim()) {
  alert("Image URL is required");
  return;
}

    this.taskService.addTask(newTask).subscribe(() => {
      this.tasks.push(newTask);
      this.resetForm();
      this.showAddForm = false;
    });
  }


  // 🧽 Reset all form fields
  resetForm(): void {
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.newTaskDate = '';
    this.newTaskTime = '';
    this.newTaskReminderValue = null;
    this.newTaskReminderUnit = 'minutes';
    this.newTaskLabel = '';
    this.newTaskImageUrl = '';

    this.editedTaskTitle = '';
    this.editedTaskDescription = '';
    this.editedTaskDate = '';
    this.editedTaskTime = '';
    this.editedReminderValue = null;
    this.editedReminderUnit = 'minutes';
    this.editedTaskLabel = '';
    this.editedTaskImageUrl = '';
  }

  // ✅ Toggle task completion
  onToggleTask(task: TaskModel): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe();
  }

  // 🗑️ Delete task
  onDeleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
    });
  }

  // ✏️ Start editing task
  startEditTask(task: TaskModel): void {
    this.editingTaskId = task.id;
    this.editedTaskTitle = task.title;
    this.editedTaskDescription = task.description;
    this.editedTaskDate = task.date;
    this.editedTaskTime = task.time;
    this.editedReminderValue = task.reminder?.value ?? null;
    this.editedReminderUnit = task.reminder?.unit ?? 'minutes';
    this.editedTaskLabel = task.label || '';
    this.editedTaskImageUrl = task.imageUrl || '';
    this.showAddForm = true;
  }

  // 💾 Save edited task
  onEditTaskSubmit(): void {
    if (!this.editedTaskTitle.trim() || !this.editingTaskId) return;

    const index = this.tasks.findIndex(t => t.id === this.editingTaskId);
    if (index > -1) {
      this.tasks[index] = {
        ...this.tasks[index],
        title: this.editedTaskTitle,
        description: this.editedTaskDescription,
        date: this.editedTaskDate,
        time: this.editedTaskTime,
        reminder: this.editedReminderValue && this.editedReminderUnit ? {
          value: this.editedReminderValue,
          unit: this.editedReminderUnit
        } : undefined
        ,
        label: this.editedTaskLabel,
        imageUrl: this.editedTaskImageUrl,
      };
      if (!this.editedTaskImageUrl.trim()) {
  alert("Image URL is required");
  return;
}

      this.taskService.updateTask(this.tasks[index]).subscribe(() => {
        this.tasks = [...this.tasks]; // Trigger UI update
        this.resetForm();
        this.editingTaskId = null;
        this.showAddForm = false;
      });
    }
  }

  // 🔄 Toggle the task form visibility
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
      this.editingTaskId = null;
    }
  }

  // ❌ Cancel edit or add
  cancelEdit(): void {
    this.resetForm();
    this.editingTaskId = null;
    this.showAddForm = false;
  }

  // 📊 Progress Tracker
  get completedCount(): number {
    return this.tasks.filter(t => t.completed).length;
  }

  get progressPercent(): number {
    return this.tasks.length ? Math.round((this.completedCount / this.tasks.length) * 100) : 0;
  }

  updateProgress(): void {
    // triggers change detection implicitly
  }
}
