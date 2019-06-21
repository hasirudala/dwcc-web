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

To decrypt the .env.production.enc file, do
```
openssl enc -aes-256-cbc -d -in .env.production.enc -out .env.production -k <PASS>
```

---

##### Env vars in '.env.production':
```
REACT_APP_BUGSNAG_API_KEY
```