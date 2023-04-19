// Scroll padding
const nav = document.querySelector('.nav');

const navHeight = nav.offsetHeight;
document.documentElement.style.setProperty(
  '--scroll-padding',
  navHeight + 'px'
);

// Menu

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
  menuBtn.toggleAttribute('data-open');
  menu.classList.toggle('disable');
  menu.classList.toggle('enable');
});

// Scrolling effect for sticky nav bar
const logo = document.querySelector('.logo');
let rect = document.querySelector('header').getBoundingClientRect();

// Remove sticky nav on lg screen
const removeSticky = function () {
  if (rect.width > 996) nav.classList.remove('sticky-nav');
};

removeSticky();

window.onscroll = function () {
  rect = document.querySelector('header').getBoundingClientRect();

  if (rect.width < 996) {
    nav.classList.add('sticky-nav');
    nav.classList.add('bg-prim-400');
    logo.classList.add('text-white');

    if (window.scrollY < 1) {
      nav.classList.remove('bg-prim-400');
      logo.classList.remove('text-white');
    }

    if (window.scrollY > rect.height) {
      menu.classList.add('disable');
      menu.classList.remove('enable');
      menuBtn.removeAttribute('data-open');
    }
  }

  removeSticky();
};

// MAP

// Load the Bing Maps API script
const script = document.createElement('script');
script.type = 'text/javascript';
script.async = true;
script.defer = true;
script.src = `https://www.bing.com/api/maps/mapcontrol?callback=initMap`;
document.body.appendChild(script);

// fetch coordinates of puvs1

let puvCoords;

const fetchPuvCoordinates = async function () {
  try {
    const response = await fetch(
      'https://jparatest.000webhostapp.com/location/read.php'
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const fetchCoords = await response.json();
    puvCoords = fetchCoords.coordinates;
  } catch {
    throw new Error();
  }
};

// callback function of the bing map api
window.initMap = async () => {
  await fetchPuvCoordinates();

  // initialize map
  const map = new Microsoft.Maps.Map(document.getElementById('map'), {
    credentials:
      'Ahv3Zvk1SVk6GnBG1aXRQ7Evvj4HGsaWqhGuotO2RmM-sZ-6izgAmFknp2h4sPcS',
    center: new Microsoft.Maps.Location(
      puvCoords.latitude,
      puvCoords.longitude
    ),
    zoom: 16,
    enableRotation: true,
    mapTypeId: Microsoft.Maps.MapTypeId.road,
    customMapStyle: {
      elements: {
        area: { fillColor: '#b6e591' },
        water: { fillColor: '#75cff0' },
        tollRoad: { fillColor: '#a964f4', strokeColor: '#a964f4' },
        arterialRoad: { fillColor: '#ffffff', strokeColor: '#d7dae7' },
        road: { fillColor: '#ffa35a', strokeColor: '#ff9c4f' },
        street: { fillColor: '#ffffff', strokeColor: '#ffffff' },
        transit: { fillColor: '#000000' },
      },
      settings: {
        landColor: '#efe9e1',
      },
    },
  });

  // create layer on map for puv pin
  const puvPinlayer = new Microsoft.Maps.Layer();
  map.layers.insertAll([puvPinlayer]);

  // reuseable pin instance
  const createPinInstance = function ({ latitude, longitude }, pinOptions) {
    return new Microsoft.Maps.Pushpin(
      new Microsoft.Maps.Location(latitude, longitude),
      pinOptions
    );
  };

  // pin options for puv pin
  const puvPinOptions = {
    icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
    anchor: new Microsoft.Maps.Point(12, 39),
    title: 'PUV',
  };

  // function to add puv pin on map
  let puvPin;
  const addPuvPinOnMap = function (coords) {
    puvPin = createPinInstance(coords, puvPinOptions);
    puvPinlayer.clear();
    puvPinlayer.add(puvPin);
    map.setView({ center: puvPin.getLocation(), zoom: 16 });
  };

  // add puv pin on start
  addPuvPinOnMap(puvCoords);

  // fetch coodinates and update location of pin in map every x secs
  setInterval(async () => {
    await fetchPuvCoordinates(); // fetch new coordinates of puv

    // re-render the position of pin on map
    addPuvPinOnMap(puvCoords);
  }, 15_000);
};
