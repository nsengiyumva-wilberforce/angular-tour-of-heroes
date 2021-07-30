import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.css']
})
export class ComposeMessageComponent implements OnInit {
  details = '';
  message = '';
  sending = false;

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  send(): void{
    this.sending = true;
    this.details = 'sending message........';

    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 5000);
  }

  cancel(): void{
    this.closePopup();
  }

  closePopup(): void{
    // providing a null value to a named outlet
    // clears contents of the named outlet
    this.router.navigate([{outlets : { popup: null}}]);
  }

}
