
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
          lines = txtFile.responseText.split("\n"); // Will separate each line into an array
          console.log(allText);
        }
      }
    }
    txtFile.send(null);
}