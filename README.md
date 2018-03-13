# booksteem-fe

[Booksteem.kr](https://booksteem.kr) frontend repository. vue.js + vuerouter + vuex + onsen ui

TODO
-----

 * unit test is not failed. I don't know how to fix it. Please help
 ```bash
13 03 2018 12:21:14.309:INFO [karma]: Karma v1.7.1 server started at http://0.0.0.0:9876/
13 03 2018 12:21:14.314:INFO [launcher]: Launching browser ChromeHeadless with unlimited concurrency
13 03 2018 12:21:14.469:INFO [launcher]: Starting browser ChromeHeadless
13 03 2018 12:21:14.907:INFO [HeadlessChrome 64.0.3282 (Mac OS X 10.13.3)]: Connected on socket whC-s5mBtYEj5BeOAAAA with id 38886352
HeadlessChrome 64.0.3282 (Mac OS X 10.13.3) ERROR
  Uncaught Error: A custom element with name 'ons-card' has already been defined.
  at webpack:///node_modules/onsenui/js/onsenui.js:9438:0 <- index.js:36487

HeadlessChrome 64.0.3282 (Mac OS X 10.13.3): Executed 0 of 0 ERROR (0.756 secs / 0 secs)

npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! booksteem-kr@2.0.0 unit: `cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the booksteem-kr@2.0.0 unit script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
 ```

Contributing
-----

Feel free to contribute and send us PRs (with tests please :smile:).

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
