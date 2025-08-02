import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  CollectionReference,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.tasksCollection = collection(this.firestore, 'tasks');
  }

  getTasks(): Observable<TaskModel[]> {
    // automatically maps Firestore docs to TaskModel[], including an "id" field
    return collectionData(this.tasksCollection, { idField: 'id' }) as Observable<TaskModel[]>;
  }

  addTask(task: Omit<TaskModel, 'id'>): Promise<TaskModel> {
    // strip id (Firestore will generate one)
    return addDoc(this.tasksCollection, task).then(ref => ({
      ...task,
      id: ref.id,
    }));
  }

  updateTask(task: TaskModel): Promise<void> {
    const taskDoc = doc(this.firestore, 'tasks', task.id);
    const { id, ...payload } = task;
    return updateDoc(taskDoc, payload);
  }

  deleteTask(id: string): Promise<void> {
    const taskDoc = doc(this.firestore, 'tasks', id);
    return deleteDoc(taskDoc);
  }
}
