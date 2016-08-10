var fs = require('fs');
var AdmZip = require('adm-zip');

//remove the zip file

var filePath = "C:/Users\\davil\\Dropbox\\work\\development\\alexa_skills\\airport_info\\skill\\airport_info.zip" ;

try{
	fs.statSync(filePath);
	console.log("Removing file");
	fs.unlinkSync(filePath);
}catch(err){
	console.log("Error Found when removing file: "+err);
}

console.log("Creating Zip file");

var zip = new AdmZip();
//zip.addLocalFolder("C:/Users\\davil\\Dropbox\\work\\development\\alexa_skills\\airport_info\\skill\\node_modules/", "node_modules");
zip.addLocalFile("C:/Users\\davil\\Dropbox\\work\\development\\alexa_skills\\airport_info\\skill\\faa_data_helper.js");
zip.writeZip("C:/Users\\davil\\Dropbox\\work\\development\\alexa_skills\\airport_info\\skill\\airport_info.zip");
console.log("Zip file done");
return;



//package the files into  a new zip



 
    // creating archives
    
	//get list of files to zip
    zip.addLocalFile("C:/Users\\davil\\Dropbox\\work\\development\\alexa_skills\\airport_info\\skill\\index.js");
    zip.addLocalFile("C:/Users\\davil\\Dropbox\\work\\development\\alexa_skills\\airport_info\\skill\\package.json");

    // or write everything to disk
    
