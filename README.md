<img src="https://user-images.githubusercontent.com/114263701/220216031-59ab1a4f-f767-4846-993a-9f63219bef0e.svg" height="200" width="1000">

<p align="center">
  <img alt="monthly downloads" src="https://img.shields.io/npm/dm/csvTransformer?style=for-the-badge">
  <img alt="monthly git commits" src="https://img.shields.io/github/commit-activity/m/eriknewland/csvTransformer?style=for-the-badge">
</p>

### Written in
![TypeScript](https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=)

### Powered by
<p align="center">
  <a href="https://nodejs.org/en/">
    <img alt="NodeJS" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  </a>
  <a href="https://www.python.org/shell/">
    <img alt="python-shell" src="https://img.shields.io/badge/python-shell-red?style=for-the-badge&logo=npm&logoColor=white" />
  </a>
  <a href="https://www.python.org/">
    <img alt="Python" src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=ffdd54" />
  </a>
  <a href="https://dask.org/">
    <img alt="Dask" src="https://img.shields.io/badge/dask-black?style=for-the-badge&logo=dask&logoColor=orange" />
  </a>
  <a href="https://pandas.pydata.org/">
    <img alt="pandas" src="https://img.shields.io/static/v1?style=for-the-badge&message=pandas&color=150458&logo=pandas&logoColor=FFFFFF&label=" />
  </a>
  <a href="https://https://pypi.org//">
     <img alt="PyPi" src="https://img.shields.io/static/v1?style=for-the-badge&message=PyPI&color=3775A9&logo=PyPI&logoColor=FFFFFF&label=" />
  </a>
</p>


#### The easiest way to transform large csv files in js and ts.
###### BETA (1.0.0)

csvTransformer is a collection of functions designed to simplify large csv file manipulation in javascript and typescript. Functions are designed to be narrow in scope but extremely easy to use. This library compliments existing csv libraries that struggle with memory constraints of large data manipulation.

Need something custom? Check out .custom()! You can create your own python script using pandas, dask, or any other python library you install.

This library was born out of the need to modify specific column cells within large CSV file, using a very underpowered machine.

*As this project is still in beta, it is highly recommended to make a copy of any file you plan to use with this library.*

### UPDATES

1.0.0 is live 🥳

## TO-DO:

1. refactor to improve DRY coding principles

## Usage
```
npm i csvtransformers
```

```
import {csvtransformer} from 'csvtransformers'
```
or
```
const {csvTransformer} = require('csvtransformers')
```

2. Install python (python.org)

3. Install python libraries with python package installer (pip3 as of 03/23). Sample installation shown below.
  - numpy
  - pandas
  - dask
  - datetime
  - glob

```
pip3 install numpy
pip3 install pandas
pip3 install dask
pip3 install datetime
pip3 install glob
```
> Note: Library built on nodeJS 16.17.1 and Python 3.11.2

#### .aggregatorBool()
```javascript
Coming Soon
```

#### .aggregatorInt()
```javascript
Coming Soon
```

#### .binaryToBoolean()
```javascript
Coming Soon
```

#### .booleanToBinary()
```javascript
Coming Soon
```

#### .custom()
```javascript
Coming Soon
```

#### .generator()
```javascript
Coming Soon
```

#### .isoToUnix()
```javascript
Coming Soon
```

#### .merge()
```javascript
Coming Soon
```

#### .toLower()
```javascript
Coming Soon
```

#### .unixToISO()
```javascript
Coming Soon
```

## Resources

[NodeJS](https://nodejs.org/dist/latest-v6.x/docs/api/fs.html)

[Python](https://www.python.org/)

[Python-Shell](https://www.npmjs.com/package/python-shell)

[Pandas](https://pandas.pydata.org/)

[Dask](https://www.dask.org/)

[PyPi](https://pypi.org/)


# Closing

Special thanks to every mention of transforming CSV files (in js) across the web. Contributions always welcome!
