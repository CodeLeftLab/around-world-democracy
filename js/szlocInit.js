function szDBG(txt){let dbg=true;if (dbg) {console.log(txt);}} //sz2do once you click once, the hover and see country name facility is lost. Update szDataDomain,szYDataDomain?
var szFooterText="Source: The Economist Intelligence Unit"; var szMapIDname="democracyMap",szCurrentYear=2017;var szAlphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
var szHues=['#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4']; 
var szHueScale=[2, 3, 4, 5, 6, 7, 8, 9, 10]; var arrKMBX =[5, 161, 297, 433]; var arrKMBXoff =[arrKMBX[0]+5, arrKMBX[1]+24, arrKMBX[2]+24, arrKMBX[3]+24]; var szBaseHueInt;
const szHeading="The Economist Intelligence Unit's Democracy Index",szHeaderID="headerSVG";var szHeadingX=1,szHeadingY=34,szHeadingClass="header";
const szSubHead="167 countries scored on a scale of 0 to 10 based on 60 indicators";var szSubHeadX=1,szSubHeadY=56,szSubHeadClass="subhead";
var szBoxYOffset=78,szBoxHeight=30,szMapTabsBoxHt=40,szFirstMapTabWid=150,szRestMapTabWid=130,szCssTabBtns="szMapTab";
var szTotalWidth=580;var szTotalHeight=490;var margin={top: 130, right: 10, bottom: 120, left: 10}, width=szTotalWidth - margin.left - margin.right, height=550 - margin.top - margin.bottom;
var szChartHt = 120;var chartWidth = 380;var centered;var szHeaderHt = 147;var szBegYear=2017;var szTagHue="#e11b17";var blnPlaying=false;
var szYrsOfData = [2006, 2008, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];var blnFixed = false;var strHighlightColour = "#9db4bf";
var strHighlightColourStrong = "#9db4bf";var szFlagBtnSelected = -1;var szSelectedItem = "";var szBegYearCounter = szYrsOfData.length;
var arrAnnoyingColours = ["#d9dbd5", "#6c2022", "#cd443d", "#e18254", "#fff", "#ddc369", "#eadf96", "#fff", "#bcdb81", "#70bc6a", "#fff", "#008d42", "#004928", "#fff"];
var szMapLegendInitX=10,szMapLegendInitY=240,szMapLegendYinc=18,szMapLegendTxtArr=["Select my country from","dropdown list or map","to highlight on ranking","chart below"],szCssLegendTxt="szLegendTxt";
var szD3Map="mapSVG";var szCountryData="data/szCountries.topo9.json";// http://cdn.static-economist.com/sites/default/files/external/minerva_assets/measles/countries.topo7.json
var szD3HeatMap="heatMapSVG",szD3HeatMapHeight=552;var szKeyNameHues=[0, 2, 3, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10];
var szIniMapFillhue="#111111",szIniMapStroke="#888";// szIniMapFillhue="#d9dbd5",szIniMapStroke="#fff";
var szKeyNames=["Authoritarian regime", "Hybrid regime", "Flawed democracy", "Full democracy"];var szKeyNameCode=["AUTH_REG", "HYBR_REG", "FLAW_DEM", "FULL_DEM"];
var szYrTabUnslelectedHue="#eee",szYrBtnsInitFgndHue="#111";szYrBtnsYrNumSelectedFgndHue="#eee";
var szDataDomain=[2006, 2016],szYDataDomain=[0, 10];var szSelFromList="szSelFromList", szNewSelListItemHue = "#000",szNewSelListBkgrndHue = "#fff"; ;
var szGridRow="blockRow",szGridCell="sz2GridCell", szGridVarStore="blockVals",szInitBlockWidth=545;var szCssFootNote="sz2FootNote"
$(document).ready(function() {if ($("html.svg").length) {html='<div id="'+szMapIDname+'"></div>'; $("#szMap").append(html); MakeHeader(szHues); s2MapCreate(szFooterText,szHues);} });
arrAnnoyingColours.reverse();
var numFormat = d3.format(".2f");var x=d3.scale.linear().range([0, chartWidth]).domain(szDataDomain);var y=d3.scale.linear().range([szChartHt, 0]).domain(szYDataDomain);
var xAxis = d3.svg.axis().scale(x).tickSize(-szChartHt).orient("bottom").ticks(5);var yAxis=d3.svg.axis().scale(y).orient("right").tickSize(chartWidth).ticks(5)
var getKeyValueById=function(array, key, id) {var testArray=array.slice(), test; while (test=testArray.pop()) {if (test.isoCode === id) return test[key] }; return;} // return undefined if no matching id is found in array
d3.selection.prototype.dblTap = function(callback) {var last=0;
    return this.each(function() {d3.select(this).on("touchstart", function(e) {if ((d3.event.timeStamp - last) < 500) {return callback(e);}; last=d3.event.timeStamp;});    });}
function SelectYear() {d3.selectAll(".szYrBtns").selectAll("text").attr("fill", szYrBtnsInitFgndHue); d3.selectAll(".szYrBtns").selectAll("rect").attr("fill", szYrTabUnslelectedHue); s2MapHues(szBegYear, false);
    d3.select("#yb_" + szYrsOfData.indexOf(szBegYear)).select("text").attr("fill",szYrBtnsYrNumSelectedFgndHue);  d3.select("#yb_" + szYrsOfData.indexOf(szBegYear)).select("rect").attr("fill", strHighlightColourStrong)
    szBegYearCounter = szYrsOfData.indexOf(szBegYear);}
function ZoomOut() {x = width / 2; y = height / 2; k = 1; centered = null;
    d3.select('#mapSVG').selectAll('g').transition() .duration(750)    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .attr("stroke-width", 1 / k + "px"); d3.selectAll("#ZoomOutButton").style("visibility", "hidden");}
function s2MapHues(szBegYear) {var ffDuration=0;if (szFlagBtnSelected == -1) {ffDuration=800}
  szLocalData.forEach(function(d) {szBegYearPos=szYrsOfData.indexOf(szBegYear)
    d3.select("#"+ d.Code) .attr("class", function() {var ffType=0;  
	  for (c=0; c < szHues.length; c++) {if (d.DI[szBegYearPos] > 8) {ffType=3}; if (d.DI[szBegYearPos] > 6) {ffType=2}; if (d.DI[szBegYearPos] > 4) {ffType=1}; };return "szNations "+szKeyNameCode[ffType]})  
        .transition().duration(ffDuration).attr("fill", function() {for (c=0; c < szHues.length; c++) {if (d.DI[szBegYearPos] < szHueScale[c]) {return szHues[c];} }  })// assign hues to countries
 }) }
function szAddHeatMap(szHues) {var intBlockWidth=szInitBlockWidth / szYrsOfData.length; var intBlockHeight=3; var intBlockYOffset=38; var intBlockXOffset=10;//  szDBG("szHues.length="+szHues.length)
  d3.select("#"+szMapIDname).append("svg") .attr("width", width) .attr("height", szD3HeatMapHeight) .attr("id", szD3HeatMap);
  d3.select("#"+szD3HeatMap)  .selectAll(".szYrBtns") .data(szYrsOfData) .enter() .append("g") .attr("class", "szYrBtns")  .attr("id", function(d, i) {return "yb_" + i;})
    .attr("transform", function(d, i) { return "translate(" + (3 + intBlockXOffset + (i * intBlockWidth)) + "," + (intBlockYOffset - 34) + ")" })
    .on("click", function(d, i) {szBegYear=d; SelectYear(d); szToggleMapTabKey(); s2SetSelListBkgndHue(); }) .attr("cursor", "pointer")
  d3.selectAll(".szYrBtns") .append("rect") .attr("height", 30) .attr("width", intBlockWidth - 6) .attr("stroke-width", 1).attr("rx", 2) .attr("ry", 2) .attr("class", "yearRect")
    .attr("fill", function(d, i) {if (i == szYrsOfData.length - 1) {return strHighlightColourStrong}; return "#fff" }) .attr("stroke", strHighlightColour)
  d3.selectAll(".szYrBtns") .append("text") .text(function(d) {return d}) .attr("fill", function(d, i) {if (i == szYrsOfData.length - 1) {return "#fff"}; return "#000" })
	.attr("text-anchor", "middle") .attr("y", 20) .attr("x", (intBlockWidth / 2) - 3) .attr("pointer-events", "none")
  d3.select("#"+szD3HeatMap).selectAll("."+szGridRow) .data(arrDIPos) .enter().append("g").attr("id", function(d, i) {return "g_r_" + i;}).attr("class", szGridRow)
    .attr("transform", function(d, i) {return "translate(" + intBlockXOffset + "," + (intBlockYOffset + (i * intBlockHeight)) + ")" })
  d3.selectAll("."+szGridRow) .selectAll(".blockCol").data(d3.range(szYrsOfData.length)) .enter() .append("rect") .attr("stroke-width", 0)
    .attr("fill", function(d, i) {return s2GetHue(arrDIPos[d3.select(this)[0][0].parentElement.id.replace("g_r_", "")][i], i); })
    .attr("class", function(d, i) {return szGridCell+" b_" + arrDIPos[d3.select(this)[0][0].parentElement.id.replace("g_r_", "")][i] + " c_" + i;    })
    .attr("id", function(d, i) {return "b_" + arrDIPos[d3.select(this)[0][0].parentElement.id.replace("g_r_", "")][i] + "_" + i;  })
    .on("mouseenter", function(d, i) {if (!blnFixed) {szSelectedItem=arrDIPos[d3.select(this)[0][0].parentElement.id.replace("g_r_", "")][i]; highlightCountry(); }     })
    .on("mouseleave", function() {if (!blnFixed) {szSelectedItem="";  highlightCountry();} })
    .on("click", function(d, i) {if (szSelectedItem != arrDIPos[d3.select(this)[0][0].parentElement.id.replace("g_r_", "")][i]) {blnFixed = true;
        szSelectedItem=arrDIPos[d3.select(this)[0][0].parentElement.id.replace("g_r_", "")][i];  highlightCountry();} else {blnFixed = !blnFixed; }        })
    .attr("stroke", "#fff") .attr("stroke-width", 0.5)  .attr("width", intBlockWidth)  .attr("height", intBlockHeight) .attr("x", function(d, i) {return (i * intBlockWidth) })
  d3.select("#"+szD3HeatMap).selectAll("."+szGridVarStore) .data(d3.range(szYrsOfData.length)).enter() .append("text") .attr("x", function(d, i) {return (intBlockWidth / 1.5 + (i * intBlockWidth)) })
    .attr("text-anchor", "middle").attr("class", szGridVarStore) .attr("id", function(d, i) {return "bv_" + i; }) }
function highlightCountry() {
if (szSelectedItem ==="") {d3.selectAll("."+szGridCell).attr("height", 3).attr("opacity", 1);d3.select("#"+szSelFromList).selectAll("option")[0][0].selected=true; 
      s2SetSelListBkgndHue(); d3.selectAll("."+szGridVarStore).text("") } 
else {s2SetSelListBkgndHue(); countryVals = szLocalData[s2GetArrayPos(szSelectedItem)].DI;  d3.selectAll("."+szGridCell) .attr("height", 3) .attr("opacity", 0.3);
      d3.selectAll("."+szGridVarStore).text(function(d, i) {return numFormat(countryVals[i]); }) .attr("opacity", 0).attr("opacity", 1) //szDBG(numFormat(countryVals[i]));
        .attr("y", function(d, i) {return +d3.select("#b_"+ szSelectedItem +"_" + i)[0][0].parentNode.getAttribute("transform").split(",")[1].replace(")", "") + 13; })
        .attr("fill", function(d, i) {szBaseHueInt=szHues.indexOf(d3.select("#b_"+ szSelectedItem +"_" + i).attr("fill")); if (szBaseHueInt > 5 || szBaseHueInt < 3) {return "#fff"; }; return "#000"; })
      d3.selectAll(".b_"+ szSelectedItem).attr("height", 16).attr("opacity", 1);
      for (c=0;c < d3.select("#"+szSelFromList).selectAll("option")[0].length; c++) {
          if (d3.select("#"+szSelFromList).selectAll("option")[0][c].value == szSelectedItem) {d3.select("#"+szSelFromList).selectAll("option")[0][c].selected=true; }    }  }}
function szToggleMapTabKey() {d3.selectAll("."+szCssTabBtns).selectAll("rect").attr("fill", "#fff"); d3.selectAll("."+szCssTabBtns).selectAll("text").attr("fill", "#000"); d3.selectAll(".szNations").attr("fill-opacity", 1);
    if (szFlagBtnSelected > -1) {d3.selectAll("."+szCssTabBtns).selectAll("rect")[szFlagBtnSelected][0].setAttribute("fill", strHighlightColourStrong);
	    d3.selectAll("."+szCssTabBtns).selectAll("text")[szFlagBtnSelected][0].setAttribute("fill", "#fff");
        d3.selectAll(".szNations").attr("fill-opacity", 0.1); d3.selectAll("." + szKeyNameCode[szFlagBtnSelected]).attr("fill-opacity", 1); }}
function szGenSelectList() {arrAlphCities=[];for (b=0; b < szLocalData.length; b++) {cName=szLocalData[b].country; cCode = szLocalData[b].Code; arrAlphCities[b] = {"cName": cName, "cCode": cCode };}
  arrAlphCities.sort(function(a, b) {return a.cName.toLowerCase().localeCompare(b.cName)});  arrAlphCities.unshift({"cCode": "", "cName": "Find country"})
    for (c = 0; c < arrAlphCities.length; c++) {d3.select("#"+szSelFromList).selectAll("option") .data(arrAlphCities) .enter().append("option").text(function(d) {return d.cName;}).attr("value", function(d) {return d.cCode;}) }}
function szFindSelectedItem() {if (d3.select("#"+szSelFromList)[0][0].value == "") {szSelectedItem = ""; highlightCountry(); } 
  else { szSelectedItem = d3.select("#"+szSelFromList)[0][0].value; blnFixed = true;  highlightCountry(); }  }
function s2SetSelListBkgndHue() {if (szSelectedItem === "") {szNewSelListBkgrndHue="#111"} else {szNewSelListBkgrndHue=d3.select("#b_" + szSelectedItem + "_" + szYrsOfData.indexOf(szBegYear)).attr("fill");
   // szDBG("indexOfColourScale="+szHues.indexOf(szNewSelListBkgrndHue));szDBG("==SelectedItemNum="+szSelectedItem);
   szBaseHueInt=szHues.indexOf(szNewSelListBkgrndHue);  if (szBaseHueInt > 5 || szBaseHueInt < 3) {szNewSelListItemHue="#fff";} }
    d3.select("#"+szSelFromList).style("background-color", szNewSelListBkgrndHue).style("color", szNewSelListItemHue);}