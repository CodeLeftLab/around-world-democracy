function MakeHeader(szHues) {var fullCanvas=d3.select("#"+szMapIDname).append("g");  //Add header
  headerSection=fullCanvas.append("svg").attr("id", szHeaderID).attr("width", szTotalWidth).attr("height", szHeaderHt) .append("g");
  var redrect=headerSection.append("rect").style("fill", szTagHue).attr("x", 1).attr("y", 1).attr("width", 27).attr("height", 10);
  var redline=headerSection.append("line").attr("x1", 1).attr("y1", 1).attr("x2", szTotalWidth).attr("y2", 1).style("stroke", szTagHue).style("stroke-width", "1px").attr("shape-rendering", "crispEdges");
  var header= headerSection.append("text").text(szHeading).attr("x", szHeadingX) .attr("y", szHeadingY) .attr("class", szHeadingClass);
  var header= headerSection.append("text").text(szSubHead).attr("x", szSubHeadX) .attr("y", szSubHeadY)  .attr("class", szSubHeadClass);
  headerSection.selectAll(".keyMajorButs") .data(arrKey).enter().append("g").attr("class", szCssTabBtns).attr("transform", function(d, i) {return "translate(" + arrKMBX[i] + "," + szBoxYOffset + ")"})
    .attr("id", function(d, i) {return szCssTabBtns+"_" + i; }).append("rect")  .attr("height", szMapTabsBoxHt) .attr("width", function(d, i) { if (i == 0) { return szFirstMapTabWid};  return szRestMapTabWid;  })
    .attr("stroke-width", 1) .attr("rx", 2) .attr("ry", 2) .attr("class", "yearRect") .attr("fill", function(d, i) {return "#fff" }).attr("stroke", strHighlightColour).attr("height", szBoxHeight);
  d3.selectAll("."+szCssTabBtns) .append("text").attr("text-anchor", "middle").text(function(d, i) {return arrKey[i]; return arrKey[i].split(" ")[0]  })
    .attr("x", function(d, i) {if (i == 0) {return (150 / 2) }; return (130 / 2); })   .attr("y", 20)
    d3.selectAll("."+szCssTabBtns) .attr("cursor", "pointer") .on("click", function(d, i) {if (i == intSelBut) {intSelBut = -1} else {intSelBut = i;}; szToggleMapTabKey();})
    headerSection .selectAll(".keyButs") .data(szHues).enter().append("rect").attr("width", 36) .attr("height", 10)
        .attr("x", function(d, i) {if (i == 0) {intStart = (arrKMBX[0] + 5);          butCounter = -1;            }
            if (i == 3) {                intStart = (arrKMBX[1] + 24);                butCounter = -1;            }
            if (i == 5) {                intStart = (arrKMBX[2] + 24);                butCounter = -1;            }
            if (i == 7) {                intStart = (arrKMBX[3] + 24);                butCounter = -1;            }
            var intGap = 1;  // if(i==3||i==5||i==7){var intGap = 6}; if(i==8){var intGap = 10}; if(i==6){var intGap = 6}
            butCounter++;  return (intStart + (50 * butCounter + intGap))    })
        .attr("y", (szBoxYOffset + szBoxHeight + 8))  .attr("fill", function(d) {return d });
    headerSection.selectAll(".keyNums").data(szKeyNumHues) .enter() .append("text") .text(function(d, i) {if (i == 3 || i == 6 | i == 9) {return d; return "<" + d;};
      if (i == 4 || i == 7 | i == 10) {return d;return ">" + d;};  return d;  if (i > 0) {return i + 1 }; return i })    // .attr("font-family","Officina")
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {if (i == 0) {intStart = (arrKMBX[0] + 5); butCounter = -1;}; if (i == 4) {intStart = (arrKMBX[1] + 24); butCounter = -1;}
            if (i == 7) {intStart = (arrKMBX[2] + 24);butCounter = -1;};  if (i == 10) {intStart = (arrKMBX[3] + 24);butCounter = -1; }  // if(i==7){intStart = (arrKMBX[2] + 24); butCounter = -1;}
            var intGap = -1; // if(i==3||i==5||i==7){var intGap = 6}; if(i==8){var intGap = 10}; if(i==6){var intGap = 6}
            butCounter++;  intXPos = (intStart + (48 * butCounter + intGap - 2)); if (i == 3 || i == 6 || i == 9 || i == 12) {intXPos = intXPos - 7};  return intXPos;  })
        .attr("y", (szBoxYOffset + szBoxHeight + 34))
}
function s2MapCreate(ffFooterText,f3Hues) {d3.jsonp = function(a, b) {
  function c() {for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", b = "", c = -1; ++c < 15;) b += a.charAt(Math.floor(52 * Math.random())); return b}
  function d(a) {var d = a.match(/callback=d3.jsonp.(\w+)/), e = d ? d[1] : c(); return d3.jsonp[e] = function(a) {b(a), delete d3.jsonp[e], f.remove() }, "d3.jsonp." + e }
  var e = d(a), f = d3.select("head").append("script").attr("type", "text/javascript").attr("src", a.replace(/(\{|%7B)callback(\}|%7D)/, e))};
  var xNum=1e7 * Math.random(); var szWorldMap; var szTargFile=szCountryData+"?callback=d3.jsonp.paint&x=";
  d3.jsonp(szTargFile+ xNum, function(shape) {var subunits=topojson.feature(shape[0], shape[0].objects.countries).features;
    var mapSVG=d3.select("#"+szMapIDname).append("svg") .attr("width", width) .attr("height", height) .attr("id", szD3Map);
    projection=d3.geo.robinson().center([136, -40]).scale(104); d3path=d3.geo.path().projection(projection).pointRadius(0); szWorldMap=d3.select("#"+szD3Map).append("g").attr("class", "world-map");
    szWorldMap.append("rect") .attr("width", szTotalWidth * 4).attr("height", szTotalHeight * 4) .attr("x", (szTotalWidth * -1)).attr("y", (szTotalHeight * -1)) .attr("fill", "#fff")  .attr("opacity", 1)
    szWorldMap.selectAll("path") .data(subunits) .enter() .append("path") .attr("id", function(d) {return d.properties.id }) .attr("d", d3path).attr("fill", szIniMapFillhue)  .attr("stroke", szIniMapStroke)
      .attr("fill-opacity", 1)  .attr("class", "szNations")  .attr("stroke-width", 0.75) 
	  .on("mouseenter", function(d) {if (d3.select(this).attr("fill-opacity") !=1) {return null}; if (s2GetArrayPos(d.properties.id) === undefined) {return null};if (!blnFixed) {szSelectedItem=d.properties.id; highlightCountry()} })
      .on("mouseleave", function(d) {if (s2GetArrayPos(d.properties.id) ===undefined) {return null}; if (!blnFixed) {szSelectedItem=""; highlightCountry() } })
      .on("click",function(d,i) {if (s2GetArrayPos(d.properties.id) ===undefined) {return null};if (szSelectedItem !=d.properties.id) {blnFixed=true;szSelectedItem=d.properties.id;highlightCountry();} else {blnFixed=!blnFixed;} })
	s2MapLegend("#"+szD3Map,szCssLegendTxt,szMapLegendInitX,szMapLegendInitY,szMapLegendYinc,szMapLegendTxtArr);
    SelectYear(szCurrentYear); /* MakeZoomButton(); szHues.reverse();*/ szAddHeatMap(f3Hues); szGenSelectList(); MakeFooter(ffFooterText);/*Get rid of Antarctica */ d3.select("#ATA").remove(); } )}

function s2MapLegend(ffMapID,ffLegendClass,initX,initY,Yinc,TxtArr) {var ct=0; 
  TxtArr.forEach(function(element) {d3.select(ffMapID) .append("text") .attr("x", initX) .attr("y", initY+Yinc*ct) .attr("class", ffLegendClass) .text(TxtArr[ct]);   ct++;}); }
function MakeFooter(ffFooterText) {d3.select("#"+szMapIDname) .append("svg").attr("id", "footerSVG") .attr("width", szTotalWidth) .attr("height", 20)
 .append("text") .attr("class", szCssFootNote) .attr("y", 11) .attr("x", 1)  .text(ffFooterText)}
function s2GetArrayPos(strCountry) { for (c = 0; c < szLocalData.length; c++) {if (szLocalData[c].Code == strCountry) {return c;}  }}
function s2GetHue(strCountry, intPos) {var intVal = szLocalData[s2GetArrayPos(strCountry)].DI[intPos]; for (c = 0; c < szHues.length; c++) { if (intVal <= szHueScale[c]) { return szHues[c] } }}

// function DrawTriangle(strSVG, strID) {d3.select("#" + strSVG).append("polygon") .style("stroke", "none") /* colour the line */.style("fill", "#ddd") /* remove any fill colour */
       // .attr("points", "10,5, 20,15, 30,5") /* x,y points */  .attr("id", strID);}
//function MakeZoomButton() {var ZoomOutBox = d3.select("#"+szD3Map).append("g"); ZoomOutBox.attr("id", "ZoomOutButton");  ZoomOutBox.append("rect") .attr("id", "ghg")  .attr("x", 20)
//        .attr("width", 24)  .attr("height", 24) .attr("y", 12) .style("radius", "4px") .style("fill", "#fff")  .style("stroke", "#000")  .style("stroke-width", "2px");
//    ZoomOutBox.append("line") .attr("x1", 25) .attr("y1", 25) .attr("x2", 39) .attr("y2", 25) .attr("stroke-width", 3)  .attr("stroke", "#000");
//    ZoomOutBox  .on("click", function() {ZoomOut() }).attr("x", 40) .attr("y", 40) .style("visibility", "hidden") .style("title", "Click to zoom out").style("cursor", "pointer") .attr("z-order", "0");
    //if(k==1){ZoomOutBox.style("visibility","hidden")}else{ZoomOutBox.style("visibility","visible")};
//} 
//function clicked(d) {var x, y, k;
//    if (d && centered !== d) {var centroid = d3path.centroid(d); x = centroid[0]; y = centroid[1]; k = 4; centered = d;  // d3.select("#ZoomOutButton").style("visibility","visible");
//    } else { x = width / 2; y = height / 2;  k = 1;  centered = null;} // d3.select("#ZoomOutBox").style("visibility","hidden");
    //g.selectAll("path") .classed("active", centered && function(d) { return d === centered; });if(k==4){MoveZoomButton(x,y,width,height,k);}
//    d3.select('#mapSVG').selectAll('g:not(#ZoomOutButton)') .transition() .duration(750).attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
//        .attr("stroke-width", 0.5 / k + "px");
//    if (k == 4) { //    d3.selectAll("#ZoomOutButton").attr("transform", "translate(" + 20 + "," + 20 + ")");  
//       d3.selectAll("#ZoomOutButton").style("visibility", "visible");  d3.select('#mapSVG').selectAll("path") .transition()  .duration(500)  .attr("stroke-width", 0.25)
//    } else {d3.select('#mapSVG').selectAll("path") .transition() .duration(500)  .attr("stroke-width", 0.75);  d3.selectAll("#ZoomOutButton") /*.attr("x",40) .attr("y",40) */.style("visibility", "hidden");}
    //d3.selectAll("circle").attr("r", function(d) { return (1 / k) * (Math.sqrt(d[api.year] * circleScale/Math.PI)); });
//}
