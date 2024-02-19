import React, {useState} from 'react';

const CSVParse = function() {
  const [csvData, setCsvData] = useState(null);

  var handleCSV = function() {
    const csvFile = document.getElementById('csvFile');
    const reader = new FileReader();

    reader.onload = function(e) {
      var string = e.target.result.replaceAll('"', '');
      var split = string.split('\n');
      var data = {};

      split.map(function(line) {
        var entries = line.split(',');
        var date = new Date(entries[0], entries[1] - 1, entries[2]);

        var year = entries[0];

        date.setYear(entries[0]);
        date.setMonth(entries[1] - 1);
        date.setDate(entries[2]);

        if (!data[year]) {
          data[year] = [];

          for (var j = 0; j < 365; j++) {
            data[year][j] = 0;
          }
        }

        data[year][daysIntoYear(date) - 1] = Number(entries[4]);
      });

      console.log(data);
      setCsvData(data);
    };

    reader.readAsText(csvFile.files[0]);
  };

  return (
    <input type="file" id="csvFile" accept=".csv" onChange={handleCSV}/>
  );
};

var daysIntoYear = function(date){
  return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
};

export default CSVParse;