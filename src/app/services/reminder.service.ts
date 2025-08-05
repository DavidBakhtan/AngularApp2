// src/app/services/reminder.service.ts
import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ReminderService {
  private timers = new Map<string, number>();
  private audio: HTMLAudioElement | null = null;
  private isBrowser: boolean;

  constructor(
    private zone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
      this.audio = new Audio('assets/sounds/reminder.mp3');
      this.audio.load();
      this.audio.volume = 1.0;
    }
  }

  /** Schedule reminder based on date, time, and offset */
  scheduleFromStrings(
    taskId: string,
    dateStr: string,
    timeStr: string,
    reminderValue: number,
    reminderUnit: 'minutes' | 'hours' | 'days' | 'weeks',
    message: string
  ): void {
    if (!this.isBrowser) return;

    // Build date object at specified time
    const dt = new Date(dateStr);
    const parts = timeStr.trim().split(' ');
    const [hourStr, minuteStr] = parts[0].split(':');
    const meridiem = (parts[1] || '').toUpperCase();
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    if (meridiem === 'PM' && hour < 12) hour += 12;
    if (meridiem === 'AM' && hour === 12) hour = 0;
    dt.setHours(hour, minute, 0, 0);

    // Subtract offset
    let offsetMs = 0;
    switch (reminderUnit) {
      case 'minutes': offsetMs = reminderValue * 60_000; break;
      case 'hours':   offsetMs = reminderValue * 3_600_000; break;
      case 'days':    offsetMs = reminderValue * 86_400_000; break;
      case 'weeks':   offsetMs = reminderValue * 7 * 86_400_000; break;
    }
    const targetTime = new Date(dt.getTime() - offsetMs);

    this.schedule(taskId, targetTime, message);
  }

  /** Internal scheduling logic */
  private schedule(taskId: string, dateTime: Date, message: string): void {
    if (!this.isBrowser) return;
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          this.schedule(taskId, dateTime, message);
        }
      });
      return;
    }

    const delay = dateTime.getTime() - Date.now();
    if (delay <= 0) return;

    // Cancel existing timeout if any
    this.cancel(taskId);

    const id = window.setTimeout(() => {
      // Show notification with details and play audio
      const notif = new Notification(`⏰ ${message}`, {
        body: `Scheduled at ${dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        silent: false
      });
      notif.onshow = () => {
        this.audio?.play().catch(err => console.warn('Audio play failed:', err));
      };
      this.timers.delete(taskId);
    }, delay);

    this.timers.set(taskId, id);
  }

  /** Cancel a scheduled reminder */
  cancel(taskId: string): void {
    const id = this.timers.get(taskId);
    if (id != null) {
      clearTimeout(id);
      this.timers.delete(taskId);
    }
  }
}
