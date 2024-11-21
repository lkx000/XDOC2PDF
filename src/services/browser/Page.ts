import PuppeteerService from './PuppeteerService';
import { Page as PuppeteerPage } from 'puppeteer';

export class Page {
    private page?: string[];

    constructor(private readonly puppeteerService: PuppeteerService) {}

    async init(): Promise<void> {
        const browser = await new PuppeteerService('');
        this.page = await browser.run({
            html: '',
            config: {},
        });
    }

    getPage(): string[] {
        return this.page || [''];
    }
}