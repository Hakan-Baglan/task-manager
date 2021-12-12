export class Task {
    id?: number = 0;
    title: string = '';
    type: TaskType = 'day';
    status?: boolean = false;
    /**
     *
     */
    constructor(title: string, type: TaskType) {
        this.id = +(Math.random() * 999999).toFixed(0);
        this.title = title;
        this.type = type;
    }
}

export type TaskType = 'day' | 'week' | 'month'; 
