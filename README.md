# spendLess
Personal finance tool built with the following goals:
* help users track their monthly income and expenses
* promote awareness of spending behavior and current financial health
* encourage users to spend less than they earn so they're able to put more money towards investments and savings, enabling them to retire comfortably and possibly even early.

(How it currently looks. Still lots of work to be done...)
<img src="assets/screenshot-app-v0.3.0.jpg" />

## Install

Install dependencies.

```bash
npm install
```

## Run

Run these two commands __in the order they're given__ and  __simultaneously__ in different terminal windows.

```bash
npm run hot-server
npm run start-hot
```

## Sync accounts/transactions data
Sync with a local PouchDB server to more easily see what's in your database. Navigate to http://127.0.0.1:5984/_utils after running the following command in a separate terminal window:

```bash
npm run db-server
```

## Use

Test the CSV upload functionality by uploading one of the sample CSV files found inside the assets directory. (Currently only supports Discover credit card CSVs. More financial institutions will be supported in the future.)

*Note: requires a node version >= 6 and an npm version >= 3.*

Architecture for this app was inspired by react-transform-boilerplate, webpack-react-boilerplate, and electron-react-boilerplate
