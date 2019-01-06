# spendLess

Personal finance tool built with the following goals:

- help users track their monthly income and expenses
- promote awareness of spending behavior and current financial health
- encourage users to spend less than they earn so they're able to put more money towards investments and savings, enabling them to retire comfortably and possibly even early.

(How it currently looks. Still lots of work to be done...)

<img src="assets/screenshot-app-v0.3.0.jpg" />

## Development

### Install dependencies

```bash
yarn
```

**Note:**

- verified that it works with `node@10.13.0` and `yarn@1.12.1`
- verified that it is not working with `npm@6.4.1` due to conflict with `npm test` using Babel 6.23.3 instead of 7.0.0

### Run the app in dev mode

```bash
yarn start
```

Wait for the Electron app to load with the React UI

#### View accounts/transactions data

Navigate to *http://127.0.0.1:5984/_utils* while the *start* script is running to see a GUI of the PouchDB database

#### Verify functionality

Test the CSV upload functionality by uploading one of the sample CSV files found inside the **assets/** directory. (Currently only supports Discover credit card CSVs. More financial institutions will be supported in the future.)

### Automated testing

```bash
yarn test
```

### Build desktop app

```bash
yarn build
```

Currently only supports building a MacOS app. Windows and Linux to be supported at a later time.
