import { Component, DoCheck, OnInit } from '@angular/core';
import { Task } from '../../model/task';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck, OnInit {
  public taskList: Task[] = [];

  ngOnInit(): void {
    const auxJson = localStorage.getItem('list');
    if (auxJson) this.taskList = JSON.parse(auxJson);
  }

  ngDoCheck(): void {
    this.taskList.sort(
      (first, last) => Number(first.checkedTask) - Number(last.checkedTask)
    );
    localStorage.setItem('list', JSON.stringify(this.taskList));
  }

  public deleteItemTaskList(itemIndex: number) {
    this.taskList.splice(itemIndex, 1);
  }

  public deleteAllTaskList(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.tagName === 'BUTTON') {
      const confirm = window.confirm('Do you really want to delete it?');
      if (confirm) this.taskList = [];
    }
  }

  public setEmitTaskList(itemTaskList: string) {
    itemTaskList = itemTaskList.trim();
    if (itemTaskList) {
      this.taskList.push({ taskText: itemTaskList, checkedTask: false });
    }
  }

  public validationInput(taskText: string, index: number) {
    if (!taskText.length) {
      const confirm = window.confirm(
        'Task is empty, do you want to delete it?'
      );
      if (confirm) this.deleteItemTaskList(index);
    }
  }
}
