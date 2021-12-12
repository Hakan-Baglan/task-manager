import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Task } from '../interfaces/task';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private toastrService: NbToastrService) { }

  get datas(): Task[] {
    try {
      return StorageService.getItem('tasks');
    } catch (error) {
      return [];
    }
  }

  private setDatas() {
    if (!StorageService.getItem('tasks')) {
      StorageService.setItem('tasks', []);
    }
  }



  addTask(task: Task) {
    try {
      let array: Task[] = StorageService.getItem('tasks');

      array.push(new Task(task.title, task.type));
      StorageService.setItem('tasks', array);
      this.toastrService.success('Başarıyla Eklendi');
      return StorageService.getItem('tasks');
    } catch (e) {
      // console.log('bir sorun oluştu', e);
      this.setDatas();
    }
  }

  editTask(task: Task) {
    try {
      let array: Task[] = this.datas;
      let foundIndex = array.findIndex(elm => elm.id == task.id);

      if (foundIndex >= 0) {
        array[foundIndex] = task;
        StorageService.setItem('tasks', array);
        this.toastrService.default('Başarıyla Güncellendi');

        return StorageService.getItem('tasks');
      }


      throw 'Task Bulunamadı';


    } catch (e) {
      console.log('bir sorun oluştu', e);
      this.setDatas();
    }
  }


  deleteTask(taskId: number) {
    try {
      // console.log(this.datas.filter(elm => elm.id != taskId));
      // console.log(this.datas);
      StorageService.setItem('tasks', this.datas.filter(elm => elm.id != taskId))
      this.toastrService.info('Başarıyla Silindi','', {hasIcon: false});

    } catch (error) {
      console.log('bir sorun oluştu');
      this.setDatas();
    }
  }

}
