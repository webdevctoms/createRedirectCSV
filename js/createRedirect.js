function CreateRedirect(csvData){
	this.csvData = csvData;
}

CreateRedirect.prototype.convertToHandle = function(productName,isNS){
	let handleName = productName.replace(/\s|\(|\)|,|\"|\'|%|\+|&|\/|\\|\.|\:|\*|\–/g,"-");
	handleName = handleName.replace(/(™|®|©|&trade;|&reg;|&copy;|&#8482;|&#174;|&#169;|\u00ae|\u00a9|\u2122)/g, "");
	//need this to handle long dash
	handleName = handleName.replace(/\u2013|\u2014/g, "-");

	handleName = handleName.split("");
	let finalHandleName = [];

	for(let i =0;i < handleName.length; i++){
		//console.log(handleName[i]);
		if(i === 0 && handleName[i] === "-"){
			continue;
		}
		if(handleName[i] === "-" && handleName[i-1] === "-"){
			continue;
		}
		if(handleName[i] === "-" && i === handleName.length - 1){
			continue;
		}
		finalHandleName.push(handleName[i]);
	}
	finalHandleName = finalHandleName.join("");
	finalHandleName = isNS ? finalHandleName : finalHandleName.toLowerCase();
	return finalHandleName;
};

CreateRedirect.prototype.createCategoryArray = function(catString){
	let splitString = catString.split('>');
	for (let i = 0; i < splitString.length; i++) {
		splitString[i] = splitString[i].trim();
	}

	return splitString;
};

CreateRedirect.prototype.convertData = function(){
	let urlData = [['Redirect from','Redirect to']];
	for (let i = 1; i < this.csvData.length; i++) {
		this.csvData[i];
		if(this.csvData[i][0] !== ',' && this.csvData[i][1] !== ',' && this.csvData[i][2] !== ',') {
			let shopifyHandle = this.convertToHandle(this.csvData[i][0]);
			let splitCat = this.createCategoryArray(this.csvData[i][1]);
			let mainCatHandle = this.convertToHandle(splitCat[0],true);
			let subCatHandle = this.convertToHandle(splitCat[splitCat.length - 1],true);

			let oldUrl = '/' + mainCatHandle + '/' + subCatHandle + '/' + this.csvData[i][2].replace(',','') + '.html';
			let shopifyUrl = '/products/' + shopifyHandle;
			urlData.push([oldUrl,shopifyUrl]);
		}
	}

	console.log(urlData);
	return urlData;
};