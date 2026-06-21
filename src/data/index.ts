import type { Task } from "./types";
import task1 from "./tasks/task1";
import task2 from "./tasks/task2";
import task3 from "./tasks/task3";

export const tasks: Task[] = [task1, task2, task3];

export function getTask(id: string): Task | undefined {
  return tasks.find((t) => t.meta.id === id);
}

export * from "./types";
export { methodSteps, modelCapabilityReference, playbookPrinciples } from "./method";
