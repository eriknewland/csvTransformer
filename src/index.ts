import { PythonShell } from 'python-shell';
import * as fs from 'fs';

export const csvTransformer = {
  aggregatorBool: (
    inputFile: string,
    outputFile?: string,
    idCol?: string,
    targetCol?: string,
    newCol1?: string,
    newCol2?: string,
  ): void => {
    outputFile = outputFile || 'csvtransformers_output.csv';
    idCol = idCol || 'id';
    targetCol = targetCol || 'recommend';
    newCol1 = newCol1 || 'recommend_true';
    newCol2 = newCol2 || 'recommend_false';
    let i = 0;
    setInterval(() => {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      i = (i + 1) % 4;
      const dots = new Array(i + 1).join('.');
      process.stdout.write('\x1b[32m' + `Working${dots}` + '\x1b[0m');
    }, 300).unref();
    const script = `
import pandas as pd

#read csv file
df = pd.read_csv('${inputFile}')

#aggregate the number of true/false values in the 'recommend' column of each unique 'id'
df_agg = df.groupby('${idCol}')['${targetCol}'].value_counts().unstack().fillna(0).round(0).astype(int)

#write the count of true/false to 2 new columns
df_agg.rename(columns={True:'${newCol1}', False:'${newCol2}'}, inplace=True)

#output the file
df_agg.to_csv('${outputFile}')
  `;

    PythonShell.runString(script, {})
      .then(() => {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(
          '\x1b[32m' + 'Aggregation complete! Thanks for choosing csvTransformer  (ᵔᴥᵔ)' + '\x1b[0m\n',
        );
      })
      .catch((err) => console.log(err));
  },
  isoToUnix: (inputFile: string, outputFile?: string, targetCol?: string): void => {
    outputFile = outputFile || 'csvtransformers_output.csv';
    targetCol = targetCol || 'date';
    let i = 0;
    setInterval(() => {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      i = (i + 1) % 4;
      const dots = new Array(i + 1).join('.');
      process.stdout.write('\x1b[32m' + `Working${dots}` + '\x1b[0m');
    }, 300).unref();
    const script = `
import dask.dataframe as dd
import datetime

# Read in the CSV file
df = dd.read_csv('${inputFile}')

# Convert the ISO 8601 date to UNIX timestamp
df['${targetCol}'] = df['${targetCol}'].apply(lambda x: int(datetime.datetime.strptime(x, '%Y-%m-%dT%H:%M:%SZ').timestamp()), meta=('timestamp', int))

# Write the output to a new CSV file
df.to_csv('${outputFile}', single_file=True, index=False)
`;

    PythonShell.runString(script, {})
      .then(() => {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(
          '\x1b[32m' + 'ISO-->UNIX Complete! Thanks for choosing csvTransformer (ᵔᴥᵔ)' + '\x1b[0m\n',
        );
      })
      .catch((err) => console.log(err));
  },
  unixToISO: (inputFile: string, indexCol: string, outputFile?: string, targetCol?: string): void => {
    outputFile = outputFile || 'csvtransformers_output.csv';
    targetCol = targetCol || 'date';
    let i = 0;
    setInterval(() => {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      i = (i + 1) % 4;
      const dots = new Array(i + 1).join('.');
      process.stdout.write('\x1b[32m' + `Working${dots}` + '\x1b[0m');
    }, 300).unref();
    const script = `
import dask.dataframe as dd

# Read in the CSV file
df = dd.read_csv('${inputFile}')


# Convert the UNIX timestamp to ISO 8601
df.set_index('${indexCol}')
df['${targetCol}'] = df['${targetCol}'].map_partitions(lambda x: x.astype('datetime64[ms]').dt.strftime('%Y-%m-%dT%H:%M:%SZ'))

# Write the transformed dataframe to a new CSV file
df.to_csv('${outputFile}', single_file=True, index=False)
`;

    PythonShell.runString(script, {})
      .then(() => {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(
          '\x1b[32m' + 'UNIX-->ISO Complete! Thanks for choosing csvTransformer (ᵔᴥᵔ)' + '\x1b[0m\n',
        );
      })
      .catch((err) => console.log(err));
  },
  binaryToBoolean: (inputFile: string, targetCol: string, outputFile?: string): void => {
    outputFile = outputFile || 'csvtransformers_output.csv';
    let i = 0;
    setInterval(function () {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      i = (i + 1) % 4;
      const dots = new Array(i + 1).join('.');
      process.stdout.write('\x1b[32m' + `Working${dots}` + '\x1b[0m');
    }, 300).unref();
    const script = `
import dask.dataframe as dd

df = dd.read_csv('${inputFile}')

# convert the 'bool' column from 0 and 1 to False and True
df['${targetCol}'] = df['${targetCol}'].map(lambda x: False if x == 0 else True).astype(str).str.lower()
# df['${targetCol}'] = df['${targetCol}'].astype(str).str.lower()

df.to_csv('${outputFile}', single_file=True, index=False)
`;

    PythonShell.runString(script, {})
      .then(function () {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(
          '\x1b[32m' + 'Binary-->Boolean Complete! Thanks for choosing csvTransformer (ᵔᴥᵔ)' + '\x1b[0m\n',
        );
      })
      .catch((err) => console.error(err));
  },
  booleanToBinary: (inputFile: string, targetCol: string, outputFile?: string): void => {
    outputFile = outputFile || 'csvtransformers_output.csv';
    let i = 0;
    setInterval(function () {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      i = (i + 1) % 4;
      const dots = new Array(i + 1).join('.');
      process.stdout.write('\x1b[32m' + `Working${dots}` + '\x1b[0m');
    }, 300).unref();
    const script = `
import dask.dataframe as dd

df = dd.read_csv('${inputFile}')

# convert the boolean values in 'bool' column to 0 and 1
df['${targetCol}'] = df['${targetCol}'].map(lambda x: 0 if x == False else 1)

# write the modified dataframe to output.csv
df.to_csv('${outputFile}', single_file=True, index=False)
`;

    PythonShell.runString(script, {})
      .then(function () {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(
          '\x1b[32m' + 'Binary-->Boolean Complete! Thanks for choosing csvTransformer (ᵔᴥᵔ)' + '\x1b[0m\n',
        );
      })
      .catch((err) => console.error(err));
  },
  custom: (customScript: string): void => {
    let i = 0;
    setInterval(function () {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      i = (i + 1) % 4;
      const dots = new Array(i + 1).join('.');
      process.stdout.write('\x1b[32m' + `Working${dots}` + '\x1b[0m');
    }, 300).unref();

    PythonShell.runString(customScript, {})
      .then(function () {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(
          '\x1b[32m' + 'Custom Task Complete! Thanks for choosing csvTransformer (ᵔᴥᵔ)' + '\x1b[0m\n',
        );
      })
      .catch((err) => console.error(err));
  },
  toLower: (inputFile: string, targetCol: string, outputFile?: string): void => {
    outputFile = outputFile || 'csvtransformers_output.csv';
    let i = 0;
    setInterval(function () {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      i = (i + 1) % 4;
      const dots = new Array(i + 1).join('.');
      process.stdout.write('\x1b[32m' + `Working${dots}` + '\x1b[0m');
    }, 300).unref();
    const script = `
import dask.dataframe as dd

# Read in the CSV file
df = dd.read_csv('${inputFile}')

# Convert the 'bool' column to strings
# Transform the first character of the 'bool' column to lower case
df['${targetCol}'] = df['${targetCol}'].astype(str).str.lower()

# Write the transformed dataframe to a new CSV file
df.to_csv('${outputFile}', single_file=True, index=False)
`;

    PythonShell.runString(script, {})
      .then(function () {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(
          '\x1b[32m' + 'Lowercase Transform Complete! Thanks for choosing csvTransformer (ᵔᴥᵔ)' + '\x1b[0m\n',
        );
      })
      .catch((err) => console.error(err));
  },
  merge: (inputFolder: string, targetCol: string, outputFile?: string): void => {
    inputFolder = inputFolder || 'files/*.csv';
    outputFile = outputFile || 'csvtransformers_output.csv';
    let i = 0;
    setInterval(function () {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      i = (i + 1) % 4;
      const dots = new Array(i + 1).join('.');
      process.stdout.write('\x1b[32m' + `Merging${dots}` + '\x1b[0m');
    }, 300).unref();
    const script = `
import dask.dataframe as dd
import glob

#read in the csv files
csv_files = glob.glob('${inputFolder}')
dfs = [dd.read_csv(f) for f in csv_files]

#merge the dataframes on the common column (id)
merged_df = dfs[0]
for df in dfs[1:]:
merged_df = dd.merge(merged_df, df, on='${targetCol}')
merged_df = merged_df.set_index('${targetCol}')

#write the merged dataframe to a new csv file
merged_df.to_csv('${outputFile}', single_file=True)
`;

    PythonShell.runString(script, {})
      .then(function () {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write('\x1b[32m' + 'Merge Complete! Thanks for choosing csvTransformer (ᵔᴥᵔ)' + '\x1b[0m\n');
      })
      .catch((err) => console.error(err));
  },
  aggregatorInt: (
    inputFile: string,
    idCol: string,
    targetCol: string,
    newCol1?: string,
    newCol2?: string,
    newCol3?: string,
    newCol4?: string,
    newCol5?: string,
    outputFile?: string,
  ): void => {
    newCol1 = newCol1 || 'rating1';
    newCol2 = newCol1 || 'rating2';
    newCol3 = newCol1 || 'rating3';
    newCol4 = newCol1 || 'rating4';
    newCol5 = newCol1 || 'rating5';
    outputFile = outputFile || 'csvtransformers_output.csv';
    let i = 0;
    setInterval(function () {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      i = (i + 1) % 4;
      const dots = new Array(i + 1).join('.');
      process.stdout.write('\x1b[32m' + `Working${dots}` + '\x1b[0m');
    }, 300).unref();
    const script = `
#refactored

import pandas as pd

#read csv file
df = pd.read_csv('input.csv')

#aggregate the number of ratings 1-5 in the 'rating' column of each unique 'id'
df_agg = df.groupby('id')['rating'].value_counts().unstack().fillna(0).round(0).astype(int)

#write the count of ratings 1-5 to 5 new columns
df_agg.rename(columns={1:'${newCol1}', 2:'${newCol2}', 3:'${newCol3}', 4:'${newCol4}, 5:'${newCol5}'}, inplace=True)

#output the file
df_agg.to_csv('${outputFile}')
`;

    PythonShell.runString(script, {})
      .then(function () {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(
          '\x1b[32m' + 'Ratings Aggregation Complete! Thanks for choosing csvTransformer (ᵔᴥᵔ)' + '\x1b[0m\n',
        );
      })
      .catch((err) => console.error(err));
  },
  generator: async (
    outputFile: string,
    headers: string,
    size: number,
    ...valueCols: ((...args: any[]) => unknown)[]
  ): Promise<void> => {
    const writeStream = fs.createWriteStream(`${outputFile}`);
    writeStream.write(`${headers}\n`);
    for (let i = 1; i <= size; i++) {
      const overWatermark = writeStream.write(`${valueCols.map((valueCol) => valueCol()).join(',')}\n`);

      if (!overWatermark) {
        await new Promise((resolve) => writeStream.once('drain', resolve)).then(() => {
          fs.stat(`${outputFile}`, (err: any, stats: any) => {
            if (err) {
              console.error(err);
            } else {
              process.stdout.write('\x1b[32m' + `${stats.size} bytes written` + '\x1b[0m\r');
            }
          });
        });
      }
    }

    writeStream.on('finish', () => {
      fs.stat(`${outputFile}`, (err: any, stats: any) => {
        if (err) {
          console.error(err);
        } else {
          process.stdout.write(
            '\x1b[32m' + `CSV file successfully created. Size: ${stats.size / 1000000} MB (ᵔᴥᵔ)` + '\x1b[0m\n',
          );
        }
      });
    });
    writeStream.end();
  },
};
