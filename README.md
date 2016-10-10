xrayAstro
=========

Client-side processing of data from the Chandra telescope

This page demonstrates client side JavaScript processing of data from
the Chandra telescope . A FITS
formatted file is parsed in the browser. From the photon events, we
create and display a spectrum, lightcurve and image. All the parsing
and display only requires about 100 lines of JavaScript application
code. It uses several JavaScript libraries including fits.js,
crossfilter, dc and d3. 

This example is hard-coded to only use 10% of the photons from a
Chandra observation of Cas A, a supernova remnant. Specifically, it
loads acisf01444N004_evt2.fits, a 12MB file. The brightness of the
supernova remnant does not change with time, so the lightcurve is
pretty constant. The spectrum shows more lower energy photons. That is
both a feature of the supernova remnant and the detector being more
sensitive to lower energy photons. The image is faint because only 10%
of the photons are included. All data should display shortly (but not
too shortly) after the page has loaded. 

The site is [available
here](http://spacemansteve.github.io/xrayAstro/proofOfConcept.html).
The [project wiki](https://github.com/spacemansteve/xrayAstro/wiki)
has some words on the project's vision.

To run the project on localhost the project includes Connect and
node.js.  To start the web server, 
execute the following from the command line: 
node server.js
Then, use a browser to go to:
http://localhost:8088/proofOfConcept.html



