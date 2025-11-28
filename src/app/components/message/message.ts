import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../../services/message';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.html',
})
export class Message implements OnInit, OnDestroy {
  message = '';
  hidden = true;
  destroy$$ = new Subject();

  constructor(private messageService: MessageService) {}
  ngOnInit(): void {
    this.messageService.message$.subscribe((text) => {
      this.hidden = false;
      this.message = text;
    });
  }
  ngOnDestroy(): void {
    this.destroy$$.next(null);
    this.destroy$$.complete();
  }
}
