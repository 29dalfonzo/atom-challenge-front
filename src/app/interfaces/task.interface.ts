export interface Task {
  id: number;
  title: string;
  description: string;
  date: Date;
  done: boolean;
  user_id: string;
}
