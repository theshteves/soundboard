$(document).ready(function() {

    // Add sound
    $("#submit").on("click", function() {

	var name = $("#InputName").val(),
	    key = null,
	    color = null,
	    path = $("#InputSource").val();

	// Set defaults


	addButton(name, key, color, path);

	// Reset inputs
	$("#InputName").val("");
	$("#InputSource").val("");
    });
});

function addButton(name, key, color, path) {

    // Null parameter exeptions
    if (key == null) {
	key = "A";
    }
    if (color == null) {
	color = "primary";
    }

    // Determine next available slot for button
    var idNum = 0;
    var newRow = false;
    for (var row = 1; row < 9; row += 1) {

	for (var cell = 1; cell < 9; cell += 1) {
	    if (!document.getElementById(row + "-" + cell)) {
		idNum = row + "-" + cell;
	    }
	}

	if (idNum != 0) {
	    if (!document.getElementById("row-" + row) ) {
		newRow = document.createElement("TR");
		newRow.setAttribute("id", "row-" + row);
	    }
	    break;
	}
    }

    // Create new elements for button
    var newSpace = document.createElement("TD"),
	newBtn = document.createElement("button"),
	newSoundPlayer = document.createElement("AUDIO"),
	newSoundSource = document.createElement("SOURCE"),
	newLabel = document.createElement("H4"),
	newSubLabel = document.createElement("H6");

    // Assemble button
    newSoundSource.setAttribute("type", "audio/*");
    newSoundSource.setAttribute("src", path);
    newSoundPlayer.appendChild(newSoundSource);
    newSoundPlayer.setAttribute("id", "sound-" + idNum);
    newBtn.appendChild(newSoundPlayer);

    var labelText = document.createTextNode(name);
    newLabel.appendChild(labelText);
    newBtn.appendChild(newLabel);

    var subLabelText = document.createTextNode(key);
    newSubLabel.appendChild(subLabelText);
    newSubLabel.setAttribute("aria-hidden", "true");
    newBtn.appendChild(newSubLabel);

    newBtn.setAttribute("id", idNum);
    newBtn.setAttribute("type", "button");
    newBtn.setAttribute("class", "btn");
    newSpace.appendChild(newBtn);

    // Attach to DOM based on whether new row was generated
    if (newRow) {
	newRow.appendChild(newSpace);
	$("tbody").append(newRow);
    } else {
	$("tr:last-child").append(newSpace);
    }
}
