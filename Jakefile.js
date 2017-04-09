var fs = require("fs");
// var jake = require('jake');
var _ = require("lodash");
var path = require("path");

var packageFile    = readPackageFile("./package.json");
var packageName    = 'CxChord';
var tsConfig       = "./tsconfig.json";

// var isAsync = { async: true };

function readPackageFile(configPath) {
    var configText = fs.readFileSync(configPath).toString();
    var packageFile = JSON.parse(configText);
    return packageFile;
}

function filesFromConfig(configPath) {
    var configText = fs.readFileSync(configPath).toString();
    var config = JSON.parse(configText);
    return config.files;
}

function declarationsFromConfig(configPath) {
    var srcFiles = filesFromConfig(configPath);
    var result = []
    _.forEach(srcFiles, function(value) {
        if ( value.indexOf(packageFile.directories["src"]) == 0 ) { 
            var val = value.replace(/\.ts/, ".d.ts").replace(/^/, packageFile.directories["declarations"] +"/");
            result.push(val)
        }
    });
    return result;
}

function jsFromConfig(configPath) {
    var srcFiles = filesFromConfig(configPath);
    var result = []
    _.forEach(srcFiles, function(value) {
        if ( value.indexOf(packageFile.directories["src"]) == 0 ) { 
            var val = value.replace(/\.ts/, ".js").replace(/^/, packageFile.directories["build"] + "/");
            result.push(val)
        }
    });
    return result;
}

function buildPackageTypingsFile() {
    var declarationFiles = declarationsFromConfig(tsConfig);
    var allContent = [];
    allContent.push("declare module CxChord {\n");
    _.forEach(declarationFiles, function(inFile) {
        console.log("Read <-- " + inFile);
        var content = fs.readFileSync(inFile).toString();    
        var contentB = content.replace(/^\/\/\/[^>]+>/gm, "").replace(/^declare (namespace|module) CxChord \{/gm,"").replace(/^\}/gm,"");
        // console.log(contentB);
        allContent.push(contentB);
    });  
    allContent.push("}\n");   
    return allContent.join("");
}

function buildPackageJsFile() {
    var jsFiles = jsFromConfig(tsConfig);
    var allContent = [];
    allContent.push("var CxChord;\n");
    _.forEach(jsFiles, function(inFile) {
        console.log("Read <-- " + inFile);
        var content = fs.readFileSync(inFile).toString();    
        var contentB = content.replace(/^\/\/\/[^>]+>/gm, "").replace(/^var CxChord;\s*$/gm,"").replace(/^# .*\.map\s*$/gm, "");
        // console.log(contentB);
        allContent.push(contentB);
    });  
    return allContent.join("");
}

//
// Tasks
//

desc('This task build the Typescript CxChord.d.ts definition file')
task('typings', function() {
    var typingsContent = buildPackageTypingsFile();
    // var typingsFile    = packageFile.directories["lib"] + "/" + packageName + '.d.ts';
    var typingsFile = packageFile.typings  + '.d.ts';
    console.log("Write --> " + typingsFile);
    fs.writeFileSync(typingsFile, typingsContent);
});

desc('This task build the CxChord.js file')
task('libJS', function() {
    var jsContent = buildPackageJsFile();
    var jsFile    = packageFile.directories["lib"] + "/" + packageName + '.js';
    console.log("Write --> " + jsFile);
    fs.writeFileSync(jsFile, jsContent);
});


