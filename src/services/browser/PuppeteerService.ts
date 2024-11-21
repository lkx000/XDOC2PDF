import puppeteer from 'puppeteer';
import path from 'path';

class PuppeteerService {
  executablePath: string;

  constructor(executablePath: string) {
    this.executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  }

  async run(params: { [key: string]: any }) {
    const browser = await puppeteer.launch({
      executablePath: this.executablePath,
      args: [
        '--no-sandbox',
        '--no-zygote',
        '--disable-extensions',
        '--disable-gpu',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--allow-file-access-from-files',
        '--disable-site-isolation-trials',
      ],
    });

    const page = await browser.newPage();
    try {
      const url = path.resolve('../', './index.html');
      await page.goto(`file://${url}`);
      const result = await page.evaluate(async (...args) => {
        /* eslint-env browser */
        return await (window as any).test.main(...args);
      }, { ...params });
      return result;
    } catch (e) {
      throw e;
    } finally {
      await page.close();
      await browser.close();
    }
  }
}

export default PuppeteerService;
