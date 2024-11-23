import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DocumentsService } from '../services/documents.service';
import { Utils } from '../../shared/shared.utils';
import { SharedService } from '../../shared/shared.service';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.less'],
    standalone: true,
    imports: [FormsModule, CommonModule],
})

export class UploadComponent implements OnInit {
    documentName: string = '';
    documentContent: string = '';
    user_id: number = 0;
    successMessage: string | null = null;
    errorMessage: string | null = null;

    constructor(private docsService: DocumentsService, private sharedService: SharedService) { }
    ngOnInit(): void {
        this.user_id = Utils.getUserIdOrDefault()
    }

    uploadDocument() {
        const documentData = {
            user_id: this.user_id,
            title: this.documentName,
            content: this.documentContent,
        };

        this.docsService.uploadDocument(documentData).subscribe({
            next: (response) => {
                console.log(response)
                this.successMessage = 'Document uploaded successfully!';
                this.errorMessage = null;
                // remove the stale data from cache.
                this.sharedService.setAllDocuments([]);
            },
            error: (error) => {
                console.error(error)
                this.successMessage = null;
                this.errorMessage = 'Failed to upload the document.';
                // remove the stale data from cache.
                this.sharedService.setAllDocuments([]);
            },
        });
    }
}
