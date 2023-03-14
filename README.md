![csvtransformers-high-resolution-logo-color-on-transparent-background](https://user-images.githubusercontent.com/114263701/224867443-f24f6b1d-e7fb-431c-a431-3888e5aaeecc.png)


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

*As this project is still in beta, it is highly recommended to make a copy of any file you plan to use with this library.*

### UPDATES

1.0.0 is live 🥳

## TO-DO:

1. refactor arguments to fit in options obj {} to better handle optional args

## Usage
1. Install and import csvtransformers
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

## Documentation

#### .aggregatorBool()
Creates an aggregation of boolean values for a given id and outputs the tally to newCol1 and newCol2. Useful for aggregating yes/no, liked/not etc ratings.
```javascript
.aggregatorBool(inputFile, outputFile, idCol, targetCol, newCol1, newCol2)
```
**inputFile: string, required**\\
outputFile defaults to 'csvtransformers_output.csv'\\
idCol: string, defaults to 'id'\\
targetCol: string, defaults to 'recommend'\\
newCol1: string, defaults to recommend_true\\
newCol2: string, defaults to recommend_false\\
```javascript
// simplest example using minimum required input
csvtransformers.aggregatorBool('input.csv')
// skipping optional arguments
csvtransformers.aggregatorBool('input.csv', undefined, 'product_id')
```

#### .aggregatorInt()
Creates an aggregation of integer values for a given id and outputs the tally to newCol1 through newCol5. Useful for aggregating 1-5star ratings.
```javascript
.aggregatorInt(inputFile, outputFile, targetCol,)
```
**inputFile: string, required**\\
**idCol: string, required**\\
targetCol: string, defaults to 'recommend'\\
newCol1: string, defaults to rating1\\
newCol2: string, defaults to rating2\\
newCol3: string, defaults to rating3\\
newCol4: string, defaults to rating4\\
newCol5: string, defaults to rating5\\
outputFile defaults to 'csvtransformers_output.csv'\\
```javascript
// simplest example using minimum required input
csvtransformers.aggregatorInt(Coming soon...)
// skipping optional arguments
csvtransformers.aggregatorInt(Coming soon...)
```

#### .binaryToBoolean()
convert a binary value to boolean (0=false, 1=true)\\
```javascript
.binaryToBoolean(inputFile, targetCol, outputFile)
```
**inputFile: string, required**\\
**targetCol: string, required**\\
outputFile defaults to 'csvtransformers_output.csv'\\
```javascript
// simplest example using minimum required input
csvtransformers.binaryToBoolean(Coming soon...)
// skipping optional arguments
csvtransformers.binaryToBoolean(Coming soon...)
```

#### .booleanToBinary()
convert a boolean value to binary (false=0, true=1)\\
```javascript
.booleanToBinary(inputFile, targetCol, outputFile)
```
**inputFile: string, required**\\
**targetCol: string, required**\\
outputFile defaults to 'csvtransformers_output.csv'\\
```javascript
// simplest example using minimum required input
csvtransformers.booleanToBinary(Coming soon...)
// skipping optional arguments
csvtransformers.booleanToBinary(Coming soon...)
```

#### .custom()
Run your own python script\\
```javascript
.custom(customScript)
```
**customScript: string, required**\\
```javascript
// `` are required for .custom() scripts
const script = `
import pandas as pd

# read in csv file
df = pd.read_csv('my_boring_data.csv')

# convert all values in 'name' column to string 'hotdog'
df['name'] = df['name'].astype(str).replace('', 'hotdog')

# save changes to csv file
df.to_csv('my_cool_data.csv', index=False)
`
csvtransformers.custom(script)
```

#### .generator()
Generate a new csv file.\\
```javascript
.generator(outputFile, headers, size, ...valueCols)
```
**outputFile: (string) required**\\
**headers: (string) required**\\
**size: (number) required**\\
**valueCols: (function) required**\\
```javascript
// 3 column csv file creation
function nameGen() {
  const names = ['John','Jane','Taylor','Sally','Tom','Harry','Lily','Olivia','Marcus','Emma'];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}
function birthdayGen() {
  let year = Math.floor(Math.random() * (2020 - 1900 + 1)) + 1900;
  let month = Math.floor(Math.random() * 12) + 1;
  let day;
  if (month === 2) {
    day = Math.floor(Math.random() * 28) + 1;
  } else if (month === 4 || month === 6 || month === 9 || month === 11) {
    day = Math.floor(Math.random() * 30) + 1;
  } else {
    day = Math.floor(Math.random() * 31) + 1;
  }
  // return the random birthday
  return `${month}/${day}/${year}`;
}

csvtransformers.generator('output.csv', 'id,name,birthday\n', 1e8, nameGen, birthdayGen)
```


#### .isoToUnix()
Change the datetime value of a column from ISO to UNIX\\
```javascript
.isoToUnix(inputFile, outputFile, targetCol)
```
**inputFile: string, required**\\
outputFile: string, defaults to 'csvtransformers_output.csv'\\
targetCol: string, defaults to 'date'\\
```javascript
//simplest example
csvtransformers.isoToUnix('input.csv')
// skipping optional arg
csvtransformers.isoToUnix('input.csv', undefined, 'datetime')
```

#### .merge()
Merge the rows of two files on a common column value\\
```javascript
.merge(inputFile, targetCol, outputFile)
```
**inputFile: string, required**\\
**targetCol: string, required**\\
outputFile: string, defaults to 'csvtransformers_output.csv'\\

```javascript
csvtransformers.merge(Coming Soon...)
```

#### .toLower()
convers string value to lowercase\\
```javascript
.toLower(inputFile, targetCol, outputFile)
```
**inputFile: string, required**\\
**targetCol: string, required**\\
outputFile: string, defaults to 'csvtransformers_output.csv'\\
```javascript
csvtransformers.toLower(Coming Soon...)
```

#### .unixToISO()
Change the datetime value of a column from UNIX to ISO\\
```javascript
.unixToISO(inputFile, indexCol, outputFile, targetCol)
```
**inputFile: string, required**\\
**indexCol: string, required**\\
outputFile: string, defaults to 'csvtransformers_output.csv'\\
targetCol: string, defaults to 'date'\\
```javascript
//simplest example
csvtransformers.unixToISO('input.csv', 'user_id')
// skipping optional arg
csvtransformers.unixToISO('input.csv', 'user_id', undefined, 'datetime')
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
