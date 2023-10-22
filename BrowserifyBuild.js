var fs = require("fs");
var browserify = require("browserify");
/*
var _ = require("lodash")

var packageName    = 'CxChord';
var packageFile    = readJSONFile("./package.json");
var tsConfig       = readJSONFile("./tsconfig.json");
var testFiles      = []

// var isAsync = { async: true };

function readJSONFile(configPath) {
    var configText = fs.readFileSync(configPath).toString();
    var packageFile = JSON.parse(configText);
    return packageFile;
}

function jsFromConfig() {
    var srcFiles = []
    var tstFiles = []
    _.forEach( tsConfig.files, function(value) {
        // if ( value.indexOf(packageFile.directories["src"]) == 0 ) { 
            var val = value.replace(/\.ts/, ".js").replace(/^/, packageFile.directories["lib"] + "/");
            if ( val.endsWith("Spec.js") )
                tstFiles.push(val)
            else
                srcFiles.push(val)
        // }
    });
    return { srcFiles: srcFiles, tstFiles: tstFiles };
}


// console.debug( JSON.stringify( jsFromConfig(), undefined, 2 ) )
// let files = jsFromConfig()
// srcFilesArgs = files.srcFiles.join(' ')

// console.debug(srcFilesArgs)


//, {presets: ["@babel/preset-env", "@babel/preset-react"]}
*/
browserify("lib/CxChord.js")
  .transform("babelify")
  .bundle()
  .pipe(fs.createWriteStream("lib/cxchord.bundle.js"));

browserify("lib/CxChordSpec.js")
  .transform("babelify")
  .bundle()
  .pipe(fs.createWriteStream("lib/CxChordSpec.bundle.js"));

browserify("examples/sample.html.js")
  .transform("babelify")
  .bundle()
  .pipe(fs.createWriteStream("examples/sample.html.bundle.js"));