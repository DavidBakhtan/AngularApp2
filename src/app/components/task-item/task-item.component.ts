// src/app/components/task-item/task-item.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
 @Input() task!: TaskModel;
@Input() editingTaskId: string | null = null;
@Output() edit = new EventEmitter<TaskModel>();
@Output() delete = new EventEmitter<string>();
@Output() toggle = new EventEmitter<TaskModel>();


  onToggle() {
    this.toggle.emit(this.task);
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }

  onEdit() {
    this.edit.emit(this.task);
  }

getLabelColor(label: string | undefined): string {
  switch (label) {
    case 'Work':
      return '#005a65ff';
    case 'Personal':
      return '#498800ff';
    case 'Urgent':
      return '#860014ff';
    case 'Low':
      return '#730085ff';
    default:
      return '#8a8a8aff';
  }
}
getBGLabelColor(label: string | undefined): string {
  switch (label) {
    case 'Work':
      return '#2f848f33';
    case 'Personal':
      return '#48880028';
    case 'Urgent':
      return '#8600143c';
    case 'Low':
      return '#7300853c';
    default:
      return '#dcdcdcff';
  }
}

}
