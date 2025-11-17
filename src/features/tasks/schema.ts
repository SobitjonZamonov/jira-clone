import { z } from "zod";
import { TaskStatus } from "./types";


export const createTaskSchema = z.object({
    name: z.string().min(1),
    status: z.nativeEnum(TaskStatus),
    workspaceId: z.string().trim().min(1),
    projectId: z.string().trim().min(1),
    dueDate: z.date().optional(),
    assigneeId: z.string().trim().min(1),
    description: z.string().optional()
})