#! /usr/bin/env node

/**
 
 */
var fs = require('fs');

var sourceSet = {
  Documents: ["README.md"],
  Elements: ["fancy-doc-viewer.html"],
  Tests: ["test/index.html"],
  Bower: [],
  References: [
    "http://atotic.github.io/fancy-doc-viewer/components/fancy-doc-viewer/",
    "https://www.polymer-project.org/docs/polymer/polymer.html",
    "https://help.github.com/articles/user-organization-and-project-pages/",
    "https://www.polymer-project.org/docs/start/reusableelements.html"
  ]
}
var docFolder = "docs";
var elementsFolder = "elements";
var bowerFolder = "..";

var docRoot = docFolder;
var docFiles = fs.readdirSync(docFolder);
docFiles.forEach(function(name) {
  sourceSet.Documents.push(docRoot + "/" + name);
});

var elementRoot = elementsFolder;
var elementFiles = fs.readdirSync(elementsFolder);
elementFiles.forEach( function(name) {
  if (name.match(/\.html$/i))
    sourceSet.Elements.push( elementRoot + "/" + name);
});

var bowerRoot = "../";
var bowerFolders = fs.readdirSync(bowerFolder);

// assume every folder that contains <folder_name>.html file
// is a polymer element
bowerFolders.forEach( function(folder) {
  var stat = fs.statSync(bowerFolder + "/" + folder);
  if (!stat.isDirectory())
    return;
  var polyFile = folder + "/" + folder + ".html";
  try {
    var stat = fs.statSync(bowerFolder + "/" + polyFile);
    if (stat)
      sourceSet.Bower.push( bowerRoot + polyFile);
  }
  catch(ex) {
    // console.log(ex.message);
  } 
});

console.log(JSON.stringify(sourceSet, null, "  "));
