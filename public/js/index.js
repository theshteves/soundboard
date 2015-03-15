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

    // Grab audio file extension (catch TypeErrors? Nah.)
    var soundType = path.split(".").reverse()[0];

    // Considered audio media types:
    //  - Uncompressed: *.wav
    //  - Lossless compression: *.mpeg,
    //  - Lossy compression: *.mp3, *.mp4
    //  * ogg covers a particular range of inclusive audio media types
    //  * other types get thrown in case their extension is a recognized type
    switch (soundType) {
    case "wav":
	soundType = "x-wav";
	break;
    case "ogg":
	soundType = "ogg";
    case "mp3":
    case "mp4":
	soundType = "mpeg";
	break;
    default:
	return err; // TBC!!!
    }

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

	for (var cell = 1; cell < 4; cell += 1) {
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
    newSoundSource.setAttribute("type", "audio/" + soundType);
    newSoundSource.setAttribute("src", path);
    newSoundPlayer.appendChild(newSoundSource);
    newSoundPlayer.setAttribute("id", "sound-" + idNum);
    newSoundPlayer.setAttribute("controls", "true");
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
