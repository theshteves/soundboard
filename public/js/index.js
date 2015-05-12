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

    // Play sound on key press
    $("body").keypress(function(e) {

	// As long as neither input field is in focus
	if (!( $("#InputName").is(":focus") || $("#InputSource").is(":focus") )) {

	    for (var row = 1; row < 4; row++) {
		for (var cell = 1; cell < 4; cell++) {

		    if (document.getElementById(row + "-" + cell)) {
			ToggleSoundCheck(e, row, cell);
		    }
		}
	    }
	}
    });

    // Release button when done playing
    //  ~UNFINISHED
    $("audio").bind("ended", function() {

	/* Testing if code runs
	var p = document.createElement("P");
	var ptext = document.createTextNode("JACKPOT.");
	p.appendChild(ptext);
	$("body").append(p);
	*/

	//playing = false;
	//$(this).parent().removeClass("btn-warning");
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
    //  * other types return an error
    switch (soundType) {
    case "wav":
	soundType = "x-wav";
	break;
    case "ogg":
	soundType = "ogg";
	break;
    case "mp3":
    case "mp4":
	soundType = "mpeg";
	break;
    default:
	return err; // TBC!!!
    }

    // Null parameter exeptions
    if (name == "") {
	name = "*unnamed*";
    }
    if (color == null) {
	color = "primary";
    }

    // Determine next available slot for button
    var idNum = 0;
    var newRow = false;
    KEYS = "1234567890QWERTYUIOPASDFGHJKLZXCVBNM"
    for (var row = 1; row < 17; row++) {

	for (var cell = 1; cell < 4; cell++) {
	    if (!document.getElementById(row + "-" + cell)) {
		idNum = row + "-" + cell;
		key = KEYS[3*(row - 1) + (3 - cell)]
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
    //newSoundPlayer.setAttribute("controls", "true");
    newBtn.appendChild(newSoundPlayer);

    var labelText = document.createTextNode(name);
    newLabel.appendChild(labelText);
    newBtn.appendChild(newLabel);

    var subLabelText = document.createTextNode(key);
    newSubLabel.appendChild(subLabelText);
    newSubLabel.setAttribute("id", "key-" + idNum);
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

function ToggleSoundCheck(e, row, cell) {

    var soundId = "sound-" + row + "-" + cell,
	keyId = "key-" + soundId.substring(6);

    // Check if key pressed matches the ID of a button's key
    if (String.fromCharCode(e.keyCode) == document.getElementById(keyId).innerHTML) {

	// Toggle sound
	if (document.getElementById(soundId).paused == false) {

	    document.getElementById(soundId).pause();
	    $("#"+row+"-"+cell).removeClass("btn-warning");
	} else {
	    document.getElementById(soundId).play();
	    $("#"+row+"-"+cell).addClass("btn-warning");
	}

	return true;
    }
}
