function App(dropZoneID,downloadID,testButtonID,convertButtonID){
	this.csvDropZone = document.getElementById(dropZoneID);
	this.downloadLink = document.getElementById(downloadID);
	this.testButton = document.getElementById(testButtonID);
	this.convertButton = document.getElementById(convertButtonID);

	this.newShopifyData;
	this.templateHeadingLength = 19;
	this.commaSplitData;
	this.redirectCreate;
	this.captureCSV = new CaptureCSV();
	this.initApp();
}

App.prototype.initApp = function() {
	this.csvDropZone.addEventListener("drop",function(e){
		e.preventDefault();
		this.fileDropped(e);
	}.bind(this),false);

	//need this to prevent default downloading of file
	this.csvDropZone.addEventListener("dragover",function(e){
		e.preventDefault();
	}.bind(this),false);

	this.testButton.addEventListener("click",function(e){
		e.preventDefault();
		this.runTests();
	}.bind(this),false);

	this.convertButton.addEventListener("click",function(e){
		e.preventDefault();
		this.convertClicked();
	}.bind(this),false);

};

App.prototype.fileDropped = function(event){
	let csvFile = event.dataTransfer.items[0].getAsFile();
	this.captureCSV.readFile(csvFile)

	.then(commaSplitData => {
		this.redirectCreate = new CreateRedirect(commaSplitData);
		console.log(commaSplitData);
		this.redirectCreate.convertData();
	})

	.catch(err => {
		console.log("error reading file", err);
	});
};

let app = new App("drop_zone","downloadLink","testData","convertData","template_drop_zone");