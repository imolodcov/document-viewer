import { PageInterface } from './page.interface';

export interface Document {
    id: string;
    name: string;
    pages: PageInterface[]
}
