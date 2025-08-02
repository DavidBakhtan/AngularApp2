export interface TaskModel {
  id: string;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  completed: boolean;
  label?: string;
  imageUrl?: string;

  // ✨ أضف ده لو عايز تستخدم reminder ككائن
  reminder?: {
    value: number;
    unit: 'minutes' | 'hours' | 'days' | 'weeks';
  };
}
export interface Reminder {
  unit: 'minutes' | 'hours' | 'days';
  value: number;
}