import type { Task } from "./types";
import task1 from "./tasks/task1";
import task2 from "./tasks/task2";

export const tasks: Task[] = [task1, task2];

export function getTask(id: string): Task | undefined {
  return tasks.find((t) => t.meta.id === id);
}

export * from "./types";
export { methodSteps, playbookPrinciples } from "./method";
