## Run app

### Install dependencies
```
yarn install
```

### Start webapp
```
# dwcc-server should be running and accessible at port 6021
yarn start
```

### Build
Ensure `.env.production` is present, then
```
yarn build
```
---

##### Env vars to be set:
```
REACT_APP_BUGSNAG_API_KEY (omit in dev environment)
REACT_APP_GOOGLE_IDENTITY_CLIENT_ID
REACT_APP_GOOGLE_IDENTITY_ALLOWED_HOSTED_DOMAIN
```
