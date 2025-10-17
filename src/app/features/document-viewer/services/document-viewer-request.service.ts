import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Document } from '../interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DocumentViewerRequestService {

    private readonly httpClient: HttpClient = inject(HttpClient);

    public getDocumentById(_id: string): Observable<Document> {
        return this.httpClient.get<Document>('/assets/1.json').pipe(
            delay(100),
        );
    }

}
