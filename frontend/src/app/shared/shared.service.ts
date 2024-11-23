import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class SharedService {
    private allDocuments: any[] = [];

    setAllDocuments(docs: any[]): void {
        this.allDocuments = docs;
    }

    getAllDocuments(): any[] {
        return this.allDocuments;
    }
}

