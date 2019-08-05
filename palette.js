// Source:  https://gist.github.com/oriadam/396a4beaaad465ca921618f2f2444d49
// return array of [r,g,b,a] from any valid color. if failed returns undefined
function colorValues(color)
{
	if (!color)
		return;
	if (color.toLowerCase() === 'transparent')
		return [0, 0, 0, 0];
	if (color[0] === '#')
	{
		if (color.length < 7)
		{
			// convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
			color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '');
		}
		return [parseInt(color.substr(1, 2), 16),
			parseInt(color.substr(3, 2), 16),
			parseInt(color.substr(5, 2), 16),
			color.length > 7 ? parseInt(color.substr(7, 2), 16)/255 : 1];
	}
	if (color.indexOf('rgb') === -1)
	{
		// convert named colors
		var temp_elem = document.body.appendChild(document.createElement('fictum')); // intentionally use unknown tag to lower chances of css rule override with !important
		var flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
		temp_elem.style.color = flag;
		if (temp_elem.style.color !== flag)
			return; // color set failed - some monstrous css rule is probably taking over the color of our object
		temp_elem.style.color = color;
		if (temp_elem.style.color === flag || temp_elem.style.color === '')
			return; // color parse failed
		color = getComputedStyle(temp_elem).color;
		document.body.removeChild(temp_elem);
	}
	if (color.indexOf('rgb') === 0)
	{
		if (color.indexOf('rgba') === -1)
			color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
		return color.match(/[\.\d]+/g).map(function (a)
		{
			return +a
		});
	}
}

// Source: Doug Hamaker 
function contrastRatio(foreground, background){
  var fg = colorValues(foreground);
  var bg = colorValues(background);
  // calculate contrast
  var fgR = fg[0]/255;
  var fgG = fg[1]/255;
  var fgB = fg[2]/255;
  var bgR = bg[0]/255;
  var bgG = bg[1]/255;
  var bgB = bg[2]/255;
  l1R = (fgR <= 0.03928) ? fgR/12.92 : Math.pow(((fgR+0.055)/1.055),2.4);
  l1G = (fgG <= 0.03928) ? fgG/12.92 : Math.pow(((fgG+0.055)/1.055),2.4);
  l1B = (fgB <= 0.03928) ? fgB/12.92 : Math.pow(((fgB+0.055)/1.055),2.4);

  l2R = (bgR <= 0.03928) ? bgR/12.92 : Math.pow(((bgR+0.055)/1.055),2.4);
  l2G = (bgG <= 0.03928) ? bgG/12.92 : Math.pow(((bgG+0.055)/1.055),2.4);
  l2B = (bgB <= 0.03928) ? bgB/12.92 : Math.pow(((bgB+0.055)/1.055),2.4);

  l1 = (.2126*l1R) + (.7152*l1G) + (.0722*l1B); //using linearised R, G, and B value
  l2 = (.2126*l2R) + (.7152*l2G) + (.0722*l2B); //using linearised R, G, and B value
  var contrast = (l1 > l2) ? (l1 + .05)/(l2 + .05) : (l2 + .05)/(l1 + .05);
  return contrast.toFixed(2);
}

// Source:  https://css-tricks.com/snippets/javascript/get-url-variables/
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
