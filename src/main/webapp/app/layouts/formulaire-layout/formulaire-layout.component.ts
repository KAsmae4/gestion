import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulaire-layout',
  templateUrl: './formulaire-layout.component.html',
  styles: [
    `
      .fullbg {
        background: url('../../../content/images/6.jpg') no-repeat center center;
        background-size: cover;
      }
    `,
  ],
})
export class FormulaireLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
