import { Injectable, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TaskModel } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class ReminderService {
  private scheduled = new Set<string>();

  constructor(
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  scheduleReminder(task: TaskModel): void {
    if (
      !isPlatformBrowser(this.platformId) ||
      !task.reminder ||
      task.completed ||
      this.scheduled.has(task.id) ||
      !task.date ||
      !task.time
    ) {
      return;
    }

    const taskMs = new Date(`${task.date}T${task.time}`).getTime();
    const offset = this.getOffset(task.reminder.value, task.reminder.unit);
    const at = taskMs - offset;
    const delay = at - Date.now();

    if (delay <= 0) {
      console.debug(`⏰ Reminder time already passed: ${task.title}`);
      return;
    }

    this.scheduled.add(task.id);
    setTimeout(() => {
      this.zone.run(() => this.notify(task.title));
    }, delay);
  }

  private notify(title: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // صوت
    if (typeof Audio !== 'undefined') {
      const audio = new Audio('assets/sounds/reminder.mp3');
      audio.play().catch(err => console.warn(err));
    }

    // إشعار
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`⏰ Reminder: ${title}`);
    }
  }

  private getOffset(value: number, unit: 'minutes'|'hours'|'days'|'weeks'): number {
    switch (unit) {
      case 'minutes': return value * 60_000;
      case 'hours':   return value * 3_600_000;
      case 'days':    return value * 86_400_000;
      case 'weeks':   return value * 7 * 86_400_000;
      default:        return 0;
    }
  }
}
