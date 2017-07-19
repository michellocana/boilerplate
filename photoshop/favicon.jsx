// Save selected layer to variable:
var doc = app.activeDocument;

// Ask user for input by showing prompt box and save inputted value to variable:
var place = Folder.selectDialog("Select a folder to process");
var files = [
	{filename: 'icon196x196.png', width: 196, height: 196 },
	{filename: 'icon160x160.png', width: 160, height: 160 },
	{filename: 'icon152x152.png', width: 152, height: 152 },
	{filename: 'icon144x144.png', width: 144, height: 144 },
	{filename: 'icon120x120.png', width: 120, height: 120 },
	{filename: 'icon114x114.png', width: 114, height: 114 },
	{filename: 'icon96x96.png', width: 96, height: 96 },
	{filename: 'icon76x76.png', width: 76, height: 76 },
	{filename: 'icon74x74.png', width: 74, height: 74 },
	{filename: 'icon72x72.png', width: 72, height: 72 },
	{filename: 'icon60x60.png', width: 60, height: 60 },
	{filename: 'icon57x57.png', width: 57, height: 57 },
	{filename: 'icon32x32.png', width: 32, height: 32 },
	{filename: 'icon16x16.png', width: 16, height: 16 }
];

// Check that user entered a valid number and, if invalid, show error message and ask for input again
if(place == null) {
	prompt('Please select a folder');
}
else {
	for (var i = 0; i < files.length; i++) {
	    var file = new File(place+'/'+files[i].filename);
		doc.resizeImage(UnitValue(files[i].width, "px"), UnitValue(files[i].height, "px"), 72, ResampleMethod.BICUBIC);
	    saveOptions = new PNGSaveOptions();
		saveOptions.compression = 9;
		saveOptions.interlaced =false;
		saveOptions.matte = MatteType.NONE;
	    doc.saveAs(file,saveOptions, true,Extension.LOWERCASE);
	}
}