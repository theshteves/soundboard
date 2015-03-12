$(document).ready(function() {

    // Add sound
    $("#submit").on("click", function() {
	var name = $("#InputSound").val(),
	    key = null,
	    color = null,
	    file = $("#InputFile").val();
	addButton(name, key, color, file);

	// Reset inputs

    });
});

function addButton(name, key, color, file) {

    // Null parameter exeptions
    if (key == null) {
	key = "A";
    }
    if (color == null) {
	color = "primary"; // See bootstrap button color ids for others
    }

    var newSpace = document.createElement("TD"),
	newBtn = document.createElement("button"),
	newLabel = document.createElement("H4"),
	newIcon = document.createElement("SPAN"), // h5-6 instead?
	labelText = document.createTextNode(name),
	iconText = document.createTextNode(key);

    // Determine next available slot for button
    var btnId = 0;
    var newRow = false;
    for (var row = 1; row < 9; row += 1) {

	for (var cell = 1; cell < 5; cell += 1) {
	    if (!document.getElementById(row + "-" + cell)) {
		btnId = row + "-" + cell;
	    }
	}

	if (btnId != 0) {
	    if (!document.getElementById("row-" + row) ) {
		newRow = document.createElement("TR");
		newRow.setAttribute("id", "row-" + row);
	    }
	    break;
	}
    }

    newBtn.setAttribute("id", btnId);
    newBtn.setAttribute("type", "button");
    newBtn.setAttribute("class", "btn");
    newLabel.appendChild(labelText);
    newIcon.setAttribute("aria-hidden", "true");
    newIcon.appendChild(iconText);
    newBtn.appendChild(newLabel);
    newBtn.appendChild(newIcon);
    newSpace.appendChild(newBtn);

    // Attach to DOM based on whether new row was generated
    if (newRow) {
	newRow.appendChild(newSpace);
	$("tbody").append(newRow);
    } else {
	$("tr:last-child").append(newSpace);
    }
}
