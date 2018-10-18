# APPCMS backend

## Project setup
```
yarn
cp env.copy.json env.json
cp assets/config/password.copy.json assets/config/password.json
```
>Fill the current config into two json

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and minifies for production and upload to test, rc, stable machine
```
yarn build
yarn build:rc
yarn build:stable
```

### Upload project 
```
yarn uProject
yarn uProject:rc
yarn uProject:stable
```
> did't need to rebuild project again

### Upload assets file - (async file) 
```
yarn uAssets
yarn uAssets:rc
yarn uAssets:stable
yarn uAssets:all
```
> update password.json or something want to require by async

### Upload resource file 
```
yarn uResource
yarn uResource:rc
yarn uResource:stable
```
> Just first time

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```
