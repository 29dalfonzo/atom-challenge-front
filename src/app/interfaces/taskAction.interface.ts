import { Task } from "./task.interface";

export interface TaskAction extends Task {
  action: 'create' | 'update';
}
