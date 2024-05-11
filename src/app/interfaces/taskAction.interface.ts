import { Task } from "./task.interface";

export interface TaskAction extends Task {
  action: TaskActionEnum;
}

export enum TaskActionEnum {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  EDIT = 'edit'
}
