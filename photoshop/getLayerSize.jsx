function getLayerSizeToCopy(){
	var layer = activeDocument.activeLayer; //Grab the currently selected layer

	// Calculate length and width based on the rectangular bounds of the selected layer
	var length = layer.bounds[2]-layer.bounds[0]; //Grab the length
	var width = layer.bounds[3]-layer.bounds[1]; //Grab the width

	length = length.toString().replace(' px', 'px');
	width = width.toString().replace(' px', 'px');

	alert( "Width:   " + length + "\nHeight:  " + width );
}

getLayerSizeToCopy();