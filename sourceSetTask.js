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
    "https://www.polymer-project.org/docs/polymer/polymer.html",
    "https://help.github.com/articles/user-organization-and-project-pages/",
    "https://www.polymer-project.org/docs/start/reusableelements.html"
  ]
}
var docFolder = "docs";
var elementsFolder = "elements";
var bowerFolder = "..";

var docFiles = fs.readdirSync(docFolder);
docFiles.forEach(function(name) {
  sourceSet.Documents.push(docFolder + "/" + name);
});

var elementFiles = fs.readdirSync(elementsFolder);
elementFiles.forEach( function(name) {
  if (name.match(/\.html$/i))
    sourceSet.Elements.push( elementsFolder + "/" + name);
});

var bowerFolders = fs.readdirSync(bowerFolder);
var bowerRoot = "../";

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
// Popula
