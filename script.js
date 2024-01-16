  var delay;
  var defaultCode = `{
  
  }`;
  var documents = [
    {
      filename: "Untitled",
      filetype: "text/json",
      autoupdate: true,
      code: defaultCode
    }
  ]

  if (localStorage.codeeditor !== undefined) {
    documents = JSON.parse(localStorage.codeeditor);
  }

  var code = document.getElementById("code");
  var editor = CodeMirror(code, {
    mode: "text/json",
    fixedGutter: true,
    value: documents[0].code,
    lineNumbers: true,
    matchBrackets: true,
    closeTags: true,
    matchTags: { bothTags: true },
    extraKeys: { "Ctrl-J": "toMatchingTag" },
    indentWithTabs: true,
    tabSize: 2,
    indentUnit: 2,
    lineWrapping: true,
    spellcheck: true
  })

function test() {
  let val = editor.getValue()
 let a = true
  try {JSON.parse(val)} catch (e) {
   
    if(e) {
      try {
      let msg = e.toString().split('at')[0]
       let position = e.message.match(/\d+/)[0];
  let textToPosition = val.slice(0, position);
  let splits = textToPosition.split('\n');
  let lines = splits.length;
  let columns = splits[lines - 1].length;
  return `${msg}at line ${lines}, column ${columns}`
    a = false
      } catch(f) {
        return e
      }
    } 
    

  }

  
if(a){
  return "Your JSON is good to go!"
}
//position is string index, split value up to str index, cound \n in it, to get line number
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function downloadjson() {
  if(test() === "Your JSON is good to go!") {
let o = window.prompt(`Please enter your preferred file name (without the file extention) e.g. file`, "file")
    let f = window.prompt(`Please enter your preferred file type, (without the file name or dot) e.g. json or mcmeta`)
    if(!o) {o = 'file'}
     if(!f) {f = 'json'}
    download(o+'.'+f, editor.getValue())
  } else {
    if(!window.confirm(`${test()} in your JSON. Proceed with download?`)) {return ""}
      let o = window.prompt(`Please enter your preferred file name (without the file extention) e.g. file`, "file")
    let f = window.prompt(`Please enter your preferred file type, (without the file name or dot) e.g. json or mcmeta`)
    if(!o) {o = 'file'}
  if(!f) {f = 'json'}
    download(o+'.'+f, editor.getValue())
}
}
function loadfile() {
  let input = document.getElementById("files")
  if (input.files && input.files[0]) {
    let myFile = input.files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
    editor.setValue(e.target.result)
    });
    
    let af = reader.readAsBinaryString(myFile);
    editor.setValue(af)
    input.type = 'text'
    input.type = 'file'
  }
}

function tut() {
  let d = document.getElementById('tut')
d.style.display = (d.style.display=='none')?'block':'none'
}