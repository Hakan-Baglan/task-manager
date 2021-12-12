import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent implements OnInit {

  @Input() inputValue!: string;

  inputForm = new FormControl(null);

  constructor(private nbDialogRef: NbDialogRef<AddTaskModalComponent>) { }

  ngOnInit(): void {
    if(this.inputValue) {
      this.inputForm.patchValue(this.inputValue);
    }
  }

  close() {
    this.nbDialogRef.close();
  }
  save() {
    this.nbDialogRef.close(this.inputForm.value);
  }

}
