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
  @Input() editedTaskTitle: string = '';
  @Output() toggle = new EventEmitter<TaskModel>();
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<TaskModel>();
  @Output() save = new EventEmitter<TaskModel>();
  @Output() cancel = new EventEmitter<void>();
  @Output() reschedule = new EventEmitter<TaskModel>();

  onToggle() {
    this.toggle.emit(this.task);
  }

 onDelete() {
  this.delete.emit(this.task.id); 
}

  onStartEdit() {
    this.edit.emit(this.task);
  }

  onSave() {
    this.task.title = this.editedTaskTitle.trim();
    this.save.emit(this.task);
  }

  onCancel() {
    this.cancel.emit();
  }

  onReschedule() {
    this.reschedule.emit(this.task);
  }
}