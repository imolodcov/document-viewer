import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { DocumentInterface } from '../interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DocumentViewerRequestService {

    private readonly httpClient: HttpClient = inject(HttpClient);

    public getDocumentById(_id: string): Observable<DocumentInterface> {
        return this.httpClient.get<DocumentInterface>('/assets/1.json').pipe(
            delay(100),
        );
    }

}
