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
        var date = new Date();

        if (!entries[0] || entries[0] === 'SPECIES') {
          return;
        }

        date.setYear(entries[2]);
        date.setMonth(entries[3]);
        date.setDate(entries[4]);

        if (!data[entries[0]]) {
          data[entries[0]] = {};
        }

        if (!data[entries[0]][entries[2]]) {
          data[entries[0]][entries[2]] = [];

          for (var j = 0; j < 365; j++) {
            data[entries[0]][entries[2]][j] = 0;
          }
        }

        var dayCount = data[entries[0]][entries[2]][daysIntoYear(date)];

        if (!dayCount) {
          dayCount = 0;
        }

        data[entries[0]][entries[2]][daysIntoYear(date)] = dayCount + Number(entries[5]);

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