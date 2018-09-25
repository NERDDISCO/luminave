/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const {startServer} = require('polyserve');
const path = require('path');
const appUrl = 'http://127.0.0.1:4444';

describe('routing tests', function() {
  let polyserve, browser, page;

  before(async function() {
    polyserve = await startServer({port:4444, root:path.join(__dirname, '../..'), moduleResolution:'node'});
  });

  after((done) => polyserve.close(done));

  beforeEach(async function() {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    await page.goto(`${appUrl}`);
    await page.addScriptTag({
      path: path.join(__dirname, '../../node_modules/query-selector-shadow-dom/dist/querySelectorShadowDom.js')
    });
  });

  afterEach(() => browser.close());

  it('the page selector switches pages', async function() {
    await page.waitForSelector('lumi-nave', {visible: true});

    await testNavigation(page, 'universe', 'Universes');
    await testNavigation(page, 'animation', 'Animations');
    await testNavigation(page, 'fixture', 'Fixtures');
    await testNavigation(page, 'scene', 'Scenes');
    await testNavigation(page, 'midi', 'MIDI');
    await testNavigation(page, 'modv', 'modV');
  });
});

async function testNavigation(page, href, linkText) {

  const getChildProperty = (selector, property) => {
    const child = Array.from(querySelectorShadowDom.querySelectorAllDeep(selector))[0]
    return child[property]
  }

  const doClick = (selector) => {
    const child = Array.from(querySelectorShadowDom.querySelectorAllDeep(selector))[0]
    return child.click()
  }

  const selector = `luminave-dashboard a[href="/${href}"]`;

  // Get the text of the link
  const myText = await page.evaluate(getChildProperty, selector, 'textContent');
  expect(myText).equal(linkText);

  // Does the click take you to the right page?
  await page.evaluate(doClick, selector);
  const newUrl = await page.evaluate('window.location.href')
  expect(newUrl).equal(`${appUrl}/${href}`);
}
