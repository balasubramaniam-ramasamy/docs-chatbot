import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../services/documents.service';
import { Utils } from '../../shared/shared.utils';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.less'],
  standalone: true,
  imports: [CommonModule]
})

export class DocumentsComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  user_id: number = 0;
  documents: any[] = [];

  constructor(private docsService: DocumentsService, private sharedService: SharedService, private router: Router) {
  }
  ngOnInit(): void {
    this.user_id = Utils.getUserIdOrDefault();
    this.documents = this.sharedService.getAllDocuments();
    if (this.documents.length < 1) {
      this.loadDocuments(this.user_id);
    } else {
      this.successMessage = 'Documents list received from cache successfully!';
      this.errorMessage = null;
    }
  }

  loadDocuments(user_id: number) {
    this.user_id = Utils.getUserIdOrDefault();
    this.docsService.getDocuments(user_id).subscribe({
      next: (docs) => {
        console.log(docs)
        this.documents = docs;
        this.successMessage = 'Documents list received successfully!';
        this.errorMessage = null;
        this.sharedService.setAllDocuments(this.documents);

      },
      error: (error) => {
        console.error(error)
        this.errorMessage = error?.error?.detail || 'No documents found against this user';
        this.successMessage = "Consider uploading documents."
        //remove the stale data from cache
        this.sharedService.setAllDocuments([]);
      },
    });

  }

  toggleSelection(docId: number) {
    this.documents.find((doc) => {
      if (doc.id == docId) {
        doc.checked = !doc.checked;
      }
    });
  }

  promptDocuments() {
    this.sharedService.setAllDocuments(this.documents);
    this.router.navigate(['/docs/query']);
  }
}
