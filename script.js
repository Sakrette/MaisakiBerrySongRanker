
window.onload = function() {
    loadData();
};

function getUrl(path) {
    if (path[0] == '/') {
        let page = window.location.href;
        let root = page.split('/').slice(0,-1).join('/');
        path = root + path;
    }

    return path;
};

function loadData() {
    var txtFile = new XMLHttpRequest();
    txtFile.open("GET", getUrl("/data/data.csv"), true);
    txtFile.onreadystatechange = function() {
      if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
        if (txtFile.status === 200) {  // Makes sure it's found the file.
          allText = txtFile.responseText;
          readCSV(allText);
        }
      }
    }
    txtFile.send(null);
}

let SONGS = [];
let RANKS = {};

function readCSV(content) {
    let lines = content.split('\n');
    // Class,Song,Artist,Genre,Reference
    let titles = lines.splice(0,1)[0].split(',');
    lines.forEach(line => {
        if (line.slice(0,2)=='//') return;
        let item = {};
        line.split(',').forEach((value, index) => {
            if (value[0]=='"') value = value.slice(1,-1); // remove double quote
            item[titles[index]] = value;
        });
        SONGS.push(item);
    });
};