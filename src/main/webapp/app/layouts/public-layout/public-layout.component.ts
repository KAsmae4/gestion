import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styles: [
    `
      .fullbg {
        background: url('../../../content/images/5.jpg') no-repeat center center;
        background-size: cover;
      }
    `,
  ],
})
export class PublicLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
