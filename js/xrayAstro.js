
function loadFile(filename, passedUserCallback)
{
    userCallback = passedUserCallback;
    var fitsFile = new astro.FITS(filename, fileLoadedHandler);
}

events = [];
var eventsReady = false;

function fileLoadedHandler(arg)
{
  var hdus1 = arg.hdus[1];  // events are in the first data unit
  var data1 = hdus1.data;
  console.log("loaded: " + data1.rows);
  
  // the parsed fits file contains:
  //["time", "ccd_id", "node_id", "expno", "chipx", "chipy", "tdetx", "tdety", "detx", "dety", 
  // "x", "y", "pha", "pha_ro", "energy", "pi", "fltgrade", "grade", "status"]

  // we create an array of hashtables for crossfilter
  // each hashtable holds a single event/photon
  var startTimestamp;  

  var maxRows = Math.floor(data1.rows * .950);  // reduce data set for faster testing
  for (var i = 1 ; i < maxRows ; i=i+1)
  {
      data1.getRows(i, 1, function(rows) 
      {
	  var row = rows[0];
	  if (i == 1) startTimestamp = row.time; 
	  timestamp = row.time;
	  skyX = row.x;
	  skyY = row.y;
	  pi = row.pi;
	  event = {timestamp: (timestamp - startTimestamp), skyX: skyX, skyY: skyY, energy: pi};
	  events.push(event);
	  if (i == 1) first = event;
	  if (i == (maxRows - 1)) last = event;
      });
  }
  
  console.log("loop done");
  endLoadTime = Date.now();
  deltaTime = endLoadTime - startTime;
  jQuery("#loadInfo").text("file " + filename + " loaded");
  console.log("time to add records" + (deltaTime/1000.));

  crossfilterData = crossfilter();
  crossfilterData.add(events);
  eventsReady = true;
  userCallback(events);
  return crossfilterData;
};
 
function getTimeDimension(crossfilterData)
{
  return crossfilterData.dimension(function(d) {return d.timestamp;});
};

function getEnergyDimension(crossfilterData)
{
  return crossfilterData.dimension(function(d) {return d.energy; });
};

function getImageDimension(corssfilterData)
{
 return crossfilterData.dimension(function(d)
		  {return [d.skyX - skyMinX, d.skyY - skyMinY]});
};
    
