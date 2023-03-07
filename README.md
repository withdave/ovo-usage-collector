# ovo-usage-collector
Retrieves energy usage at half-hourly level from Ovo in JSON format

Built in node 18.14.2.

To run:

1. Enter your Ovo account credentials into `account.example.json`, and save this file as `account.json`
2. Update the start and end date in the bottom function in `app.js`
3. Run `app.js` with `node app.js`, and a json file per date will be created in the same directory