export interface TaskModel {
  id: string;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  reminderMinutes?: number;
  completed: boolean;
}
