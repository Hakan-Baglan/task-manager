import { Component } from '@angular/core';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';
import { Task, TaskType } from './interfaces/task';
import { DataService } from './services/data.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  data: Task[] = [];

  selectedTab: any = 'day';

  dates: any = {
    day: moment().endOf('day').format('DD/MM/yyyy HH:mm'),
    week: moment().locale('tr').endOf('week').format('DD/MM/yyyy HH:mm'),
    month: moment().endOf('month').format('DD/MM/yyyy HH:mm'),
  }

  dayData = this.getDataOfType('day');
  weekData = this.getDataOfType('week');
  monthData = this.getDataOfType('month');

  getEndDate() {
    return this.dates[`${this.selectedTab}`];
  }

  constructor(private dataService: DataService, private nbDialogService: NbDialogService) {
    if (!StorageService.getItem('tasks')) {
      StorageService.setItem('tasks', []);
    }

  }


  addTask() {
    this.nbDialogService.open(AddTaskModalComponent).onClose.subscribe(data => {
      // console.log('modal kapandı');
      if (data) {
        this.dataService.addTask({
          title: data,
          type: this.selectedTab
        });

        

        this.setDatasource();
      }
    })
  }

  editTask(task: Task) {
    this.nbDialogService.open(AddTaskModalComponent, {
      context: {
        inputValue: task.title,
      }
    }).onClose.subscribe(title => {
      // console.log('modal kapandı');
      if (title) {
        this.dataService.editTask({
          id: task.id,
          title: title,
          type: this.selectedTab,
          status: task.status
        });
        this.setDatasource();
      }
    })
  }

  toggleTask(task: Task) {
    this.dataService.editTask(task);
    setTimeout(() => {
    this.setDatasource();
    }, 250);
  }

  setDatasource() {
    this.dayData = this.getDataOfType('day');
    this.weekData = this.getDataOfType('week');
    this.monthData = this.getDataOfType('month');
  }

  getDataOfType(type: TaskType) {
    return this.dataService.datas.filter(elm => elm.type == type);
  }

  change(e: any) {
    // console.log(e);
    this.selectedTab = e.tabId;
  }

  deleteTask(taskId: any) {
    Swal.fire({
      text: 'Silmek istediğinize emin misiniz?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Evet',
      cancelButtonText: 'Hayır',
    }).then(result => {
      if (result.isConfirmed) {
        // console.log('sil');
        // console.log(taskId);
        this.dataService.deleteTask(taskId);
        this.setDatasource();

      }

    });
  }
}
