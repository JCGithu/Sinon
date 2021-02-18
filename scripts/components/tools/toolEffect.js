var toolEffect = {
    name: 'toolEffect',
    view: function () {
        return "\n\t\t\t<div style=\"margin-bottom: 5vh\">\n\t\t\t\t\t<input type=\"text\" id= 'downloadFile' class=\"inputBox\" placeholder=\"\">\n\t\t\t\t\t<button  id=\"effectFileButton\" class=\"fileButton\">Choose a File</button>\n\t\t\t</div>\n\t\t\t<div style='display: flex; flex-direction: row; justify-content: center; align-items: center;'>\n\t\t\t\t\t<div class='select'>\n\t\t\t\t\t\t\t<select id='convertFormat' class=\"convFormat\" classNamePrefix='conv'>\n\t\t\t\t\t\t\t\t\t<option value='blur'>Social Media Blur</option>\n\t\t\t\t\t\t\t\t\t<option value='wave'>Generate Waveform</option>\n\t\t\t\t\t\t\t\t\t<option value='grabs'>Get Screengrabs</option>\n\t\t\t\t\t\t\t\t\t<option value='concat'>Join clips</option>\n\t\t\t\t\t\t\t\t\t<option value='custom'>Custom</option>\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<div style=\"margin-top: 5vh\">\n\t\t\t\t\t<button style=\"position: absolute; left: 25%; z-index: 2;\" id='effectRun' class=\"grow-on-hover runButton\">Generate!</button>\n\t\t\t</div>\n\t\t\t";
    }
};
module.exports = toolEffect;
//# sourceMappingURL=toolEffect.js.map