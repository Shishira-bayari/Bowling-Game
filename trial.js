AFRAME.registerComponent('detecting', {
    init() {
        this.startX = 0; // Using `this` to store startX
    this.endX = 0;   // Using `this` to store endX
    this.startTime = 0
    this.endTime = 0

  document.querySelectorAll('.pins').forEach( (pins) => {
    pins.setAttribute('ammo-body', 'type: dynamic; mass: 1; ')
    pins.setAttribute('ammo-shape', 'type: hull;')
  })

    
      // Consider destroying the Ammo.js vectors if not managed by Ammo.js itself
    
    
  }
});
    
