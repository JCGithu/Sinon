var toolConv = {
    name: 'toolConv',
    view: function () {
        return "\n\t\t\t<div style=\"margin-bottom: 5vh\">\n\t\t\t\t<input type=\"text\" id= 'downloadFile' class=\"inputBox\" placeholder=\"\">\n\t\t\t\t<button id=\"convFileButton\" class=\"fileButton\">Choose a File</button>\n\t\t\t</div>\n\t\t\t<div style='display: flex; flex-direction: column; justify-content: center; align-items: center;'>\n\t\t\t\t<div class='select'>\n\t\t\t\t\t<select id='convertFormat' class=\"convFormat\">\n\t\t\t\t\t\t<option value='video'>Video</option>\n\t\t\t\t\t\t<option value='audio'>Audio</option>\n\t\t\t\t\t\t<option value='gif'>GIF</option>W\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div style=\"margin-top: 5vh\">\n\t\t\t\t<button style=\"position: absolute; left: 25%; z-index: 2;\" id='convRun' class=\"grow-on-hover runButton\">Convert!</button>\n\t\t\t</div>\n\t\t";
    }
};
module.exports = toolConv;
//# sourceMappingURL=toolConv.js.map