import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocuments } from '../documents.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'app-documents-detail',
  templateUrl: './documents-detail.component.html',
})
export class DocumentsDetailComponent implements OnInit {
  documents: IDocuments | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documents }) => {
      this.documents = documents;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
