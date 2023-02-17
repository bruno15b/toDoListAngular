import { Component } from '@angular/core';
import { Task } from '../../model/task';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  public taskList: Task[] = [
    { taskInfo: 'Estudar mockito', checkedTask: true },
    { taskInfo: 'Estudar Spring Boot', checkedTask: false },
  ];

  public deleteItemTaskList(itemIndex: number) {
    this.taskList.splice(itemIndex, 1);
  }

  public deleteAllTaskList(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.tagName === 'BUTTON') {
      const confirm = window.confirm('Realmente deseja apagar?');
      console.log('O alvo do evento é um botão!');
      if (confirm) this.taskList = [];
    }
  }
}
