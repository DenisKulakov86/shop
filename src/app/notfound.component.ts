import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  template: `<div>404</div>`,
  styles: [
    `
      div {
        font-size: 128px;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
      }
    `,
  ],
})
export class NotfoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
