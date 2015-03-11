$(document).ready(function() {

    // Add sound
    $("#submit").on("click", function() {
	var newSpace = document.createElement("TD"),
	    newBtn = document.createElement("button"),
	    newLabel = document.createElement("H4"),
	    newIcon = document.createElement("SPAN"),
	    text = $("#InputSound").val(),
	    labelText = document.createTextNode(text);
	//newSpace.setAttribute("id", );
	newBtn.setAttribute("type", "button");
	newBtn.setAttribute("class", "btn btn-info");
	newLabel.appendChild(labelText);
	newIcon.setAttribute("class", "glyphicon glyphicon-play-circle");
	newIcon.setAttribute("aria-hidden", "true");
	newBtn.appendChild(newLabel);
	newBtn.appendChild(newIcon);
	newSpace.appendChild(newBtn);
	$("#row-1").append(newSpace);
    });
});
