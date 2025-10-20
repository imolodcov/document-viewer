import { PageInterface } from './page.interface';

export interface DocumentInterface {
    id: string;
    name: string;
    pages: PageInterface[]
}
