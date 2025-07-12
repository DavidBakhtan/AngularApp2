import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  imports: [CommonModule, FormsModule, TaskItemComponent]
})
export class TodoComponent implements OnInit {
  tasks: TaskModel[] = [];
  newTaskTitle = '';
  newTaskDescription = '';
  newTaskDate = '';
  newTaskTime = '';
  newTaskReminder: number | null = null;
  reminderValue: number | null = null;
  reminderUnit: string = 'minutes';

  editingTaskId: string | null = null;
  editedTaskTitle = '';

constructor(
  private taskService: TaskService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
      setTimeout(() => {
      this.cdr.detectChanges();
    }, 1);
    });
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      const multipliers: { [key: string]: number } = {
        minutes: 1,
        hours: 60,
        days: 1440,
        weeks: 10080
      };

      let reminderInMinutes: number | undefined;

      if (this.reminderValue !== null && this.reminderUnit in multipliers) {
        reminderInMinutes = this.reminderValue * multipliers[this.reminderUnit];
      }

      const task: TaskModel = {
        id: Date.now().toString(),
        title: this.newTaskTitle,
        completed: false,
        description: this.newTaskDescription,
        date: this.newTaskDate,
        time: this.newTaskTime,
        reminderMinutes: reminderInMinutes
      };

      this.taskService.addTask(task).subscribe(() => {
        this.tasks.push(task); // ✅ تحديث مباشر بدل loadTasks
        this.resetForm();
        this.cdr.detectChanges();
      });
    }
  }


  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id); // ✅ حذف مباشر
    });
  }


  toggleTask(task: TaskModel) {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe(() => {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) this.tasks[index] = { ...task };
    });
  }


  startEditing(task: TaskModel) {
    this.editingTaskId = task.id;
    this.editedTaskTitle = task.title;
  }

  saveEditing(task: TaskModel) {
    task.title = this.editedTaskTitle.trim();
    if (task.title) {
      this.taskService.updateTask(task).subscribe(() => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) this.tasks[index] = { ...task };
        this.editingTaskId = null;
        this.editedTaskTitle = '';
      });
    }
  }


  cancelEditing() {
    this.editingTaskId = null;
    this.editedTaskTitle = '';
  }

  rescheduleTask(task: TaskModel) {
    const newDate = prompt("Enter new date (yyyy-mm-dd):", task.date || '');
    const newTime = prompt("Enter new time (hh:mm):", task.time || '');
    if (newDate && newTime) {
      task.date = newDate;
      task.time = newTime;
      this.taskService.updateTask(task).subscribe(() => {
        this.loadTasks();
        this.cdr.detectChanges();
      });
    }
  }

  resetForm() {
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.newTaskDate = '';
    this.newTaskTime = '';
    this.reminderValue = null;
    this.reminderUnit = 'minutes';
  }
}