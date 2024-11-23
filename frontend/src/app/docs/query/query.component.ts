import { Component, DoCheck, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DocumentsService } from '../services/documents.service';
import { Utils } from '../../shared/shared.utils';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.less'],
})

export class QueryComponent implements OnInit, DoCheck {
  user_id: number = 0;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  documents: any[] = [];
  queryText: string = '';
  response = '';
  isPromptUpdated: boolean = false;

  constructor(private docsService: DocumentsService, private sharedService: SharedService) { }

  ngOnInit() {
    this.queryText = '';
    this.user_id = Utils.getUserIdOrDefault()
    this.documents = this.sharedService.getAllDocuments();
    if (this.documents.length < 1) {
      this.fetchDocuments(this.user_id);
    } else {
      this.successMessage = 'Documents list received from cache successfully!';
      this.errorMessage = null;
    }
  }

  fetchDocuments(user_id: number) {
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

  onDocumentSelectionChange(event: Event, documentId: number) {
    this.documents.find((doc) => {
      if (doc.id == documentId) {
        doc.checked = !doc.checked;
      }
    });
  }

  sendQuery() {
    let docs: any[] = [];
    this.documents.filter(
      (doc) => {
        if (doc.checked == true)
          docs.push(doc.id)
      });

    if (!this.queryText || docs.length < 1) {
      alert('Please enter a query and select at least one document.');
      return;
    }

    const query = {
      document_ids: docs,
      query: this.queryText,
    };

    this.docsService.queryDocuments(query).subscribe({
      next: (response) => {
        console.log(response)
        this.response = response.toString();
        this.isPromptUpdated = true;
      },
      error: (error) => {
        console.error(error)
        this.response = error?.error?.detail || 'No response found this query';
      },
    });
  }

  ngDoCheck(): void {
    // console.log("ngDoCheck");
    let self = this;
    // Auto scroll to bottom to make the new prompt visible.
    if (this.isPromptUpdated) {
      setTimeout(function () {
        self.scrollToBottom();
      }, 500);

      // Reset the below boolean - this is to enable the user to scroll up.
      // Otherwise, it will be auto scroll to bottom.
      this.isPromptUpdated = false;
    }
  }

  scrollToBottom(): void {
    console.log("scrollToBottom");
    let container = document.getElementById("chat-container");
    if (container)
      container.scrollTop = container?.scrollHeight;
  }
}
