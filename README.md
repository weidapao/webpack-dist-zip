# webpack-dist-zip

## About
This plugin zip your dist each time at the end of the build.

## Installation
npm install --save-dev webpack-dist-zip

## Usage
```
const WebpackDistZip = require('webpack-dist-zip');
const webpackConfig = {
    plugins: [
        new WebpackDistZip(),
    ],
};

module.exports = webpackConfig;
```

## Options and Defaults (Optional)
```
new WebpackDistZip({
  // default
  entry: './dist',
  output: './dist.zip'
})
```