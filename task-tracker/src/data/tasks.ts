import type { TaskType } from '../types/todo.types';

export const initialTasks : TaskType[] = [
    {
        id : 'hsjdn',
        title : 'Lära mig TypeScript',
        done : false
    },
    {
        id : 'gdbbs',
        title : 'Lära mig React',
        done : false
    },
    {
        id : '883js',
        title : 'Lära mig läsa',
        done : true
    }
];

console.log(initialTasks[0].id);