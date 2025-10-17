import { PageInterface } from './page.interface';
import { AnnotationInterface } from './annotation.interface';

export interface Document {
    id: string;
    name: string;
    pages: PageInterface[]
    annotations: AnnotationInterface[];
}
