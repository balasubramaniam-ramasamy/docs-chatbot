import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class DocumentsService {
  private apiUrl = 'http://localhost:8000'; // FastAPI backend

  constructor(private http: HttpClient) { }

  getDocuments(user_id: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${this.apiUrl}/documents/${user_id}`, { headers: { Authorization: `Bearer ${token}` } });
  }

  uploadDocument(document: { user_id: number, title: string, content: string }) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/documents`, document, { headers: { Authorization: `Bearer ${token}` } });
  }

  queryDocuments(query: { document_ids: number[], query: string }) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/documents/query`, query, { headers: { Authorization: `Bearer ${token}` } });
  }
}
