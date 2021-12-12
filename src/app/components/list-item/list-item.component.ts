import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() task!: Task;
  @Output() onEditTask = new EventEmitter();
  @Output() onDeleteTask = new EventEmitter();
  @Output() onToggleTask = new EventEmitter();


  checked = false;

  constructor() { }

  ngOnInit(): void {
    
  }

  async deleteTask() {
    this.onDeleteTask.emit(this.task.id);
  }

  editTask() {
    this.onEditTask.emit(this.task);
  }

  toggle(e: any) {
    // console.log('toggle', e);
    this.onToggleTask.emit({
      ...this.task,
      status: e
    })
  }

}
