var states = require('./states.json')

// Wait for document skeleton to load
document.addEventListener("DOMContentLoaded", function() {
    // Reference the map-container node
    var mapContainer = document.getElementById('map-container')
    // Reference the map node
    var map = document.getElementById('map')
    // Use json data to populate the document
    states.map(function(s) {
        // Populate document with <area> tags
        var area = document.createElement('area')
        var areaCoords = document.createAttribute('coords')
        areaCoords.value = s.coords
        area.setAttributeNode(areaCoords)
        var areaName = document.createAttribute('data-name')
        areaName.value = s.name
        area.setAttributeNode(areaName)
        var areaShape = document.createAttribute('shape')
        areaShape.value = 'poly'
        area.setAttributeNode(areaShape)
        var areaClass = document.createAttribute('class')
        // eslint-disable-next-line
        var areaClassNames = s.code + ' ' + 'area'
        areaClass.value = areaClassNames
        area.setAttributeNode(areaClass)
        map.appendChild(area)
        // Populate document with state <img> tags
        var img = document.createElement('img')
        var imgSrc = document.createAttribute('src')
        imgSrc.value = './images/' + s.code + '_hover.png'
        img.setAttributeNode(imgSrc)
        var imgAlt = document.createAttribute('alt')
        imgAlt.value = s.name
        img.setAttributeNode(imgAlt)
        var imgClass = document.createAttribute('class')
        // eslint-disable-next-line
        var imgClassNames = s.code + ' ' + 'img'
        imgClass.value = imgClassNames
        img.setAttributeNode(imgClass)
        mapContainer.appendChild(img)
        // Map expects a return function. In this case, we're just using it like a for loop to create side-effects, so return null.
        return null
    })
    // Get a list of the <area> nodes
    var stateAreaNodes = document.querySelectorAll('.area')
    // Add event listeners to each <area> node
    stateAreaNodes.forEach(function(node) {
        var classNames = node.classList
        var imgNode = document.querySelector('img.' + classNames[0])
        node.addEventListener('mouseenter', function() {
            var id = document.createAttribute('id')
            id.value = 'hover'
            imgNode.setAttributeNode(id)
        })
        node.addEventListener('mouseout', function() {
            imgNode.removeAttribute('id')
        })
    })
}, false)

// Define behavior when a state is clicked
function handleStateClick(e) {
    var target = e.target
    var display = document.getElementById('display')
    display.innerHTML = target.dataset.name
}

// Add click event listener to 'map'
document.getElementById('map').addEventListener('click', handleStateClick);
