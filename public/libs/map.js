var polygon;
var popup = L.popup();
var markers = new Array();
var activeMarkerid = 0;

var globalIDS = new Array();
var globalFUNC = "";
var globalARG = "";
var globalView = "min";

//Определяем карту, координаты центра и начальный масштаб
var map = L.map('map', { zoomControl: false }).setView([55.53857, 89.18615], 15);
new L.Control.Zoom({ position: 'topright' }).addTo(map);

L.tileLayer('./ttl/{z}/{x}/{y}.png', {
    maxZoom: 19, minZoom: 13
}).addTo(map);