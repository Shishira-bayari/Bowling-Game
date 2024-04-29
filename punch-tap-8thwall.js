const check_position_of_pins = () => {
    const initialPosition = {
      pin1: { x: 0, y: 0.03, z: -5 },
      pin2: { x: -1, y: 0.03, z: -9 },
      pin3: { x: 0.5, y: 0.03, z: -9 },
      pin4: { x: -2.5, y: 0.03, z: -14 },
      pin5: { x: 0.25, y: 0.03, z: -14 },
      pin6: { x: 2.5, y: 0.03, z: -14 },
      pin7: { x: -3, y: 0.03, z: -19 },
      pin8: { x: -1, y: 0.03, z: -19 },
      pin9: { x: 1.5, y: 0.03, z: -19 },
      pin10: { x: 3, y: 0.03, z: -19 }
    }
    const currentPosition = {
      pin1: document.getElementById('pin-1').object3D.position,
      pin2: document.getElementById('pin-2').object3D.position,
      pin3: document.getElementById('pin-3').object3D.position,
      pin4: document.getElementById('pin-4').object3D.position,
      pin5: document.getElementById('pin-5').object3D.position,
      pin6: document.getElementById('pin-6').object3D.position,
      pin7: document.getElementById('pin-7').object3D.position,
      pin8: document.getElementById('pin-8').object3D.position,
      pin9: document.getElementById('pin-9').object3D.position,
      pin10: document.getElementById('pin-10').object3D.position
    }
    let pinMoved = false;
    let allPinsMoved = true
  
    for (const pinId in initialPosition) {
      const initialPos = initialPosition[pinId];
      const currentPos = currentPosition[pinId];
  
      if (initialPos.x !== currentPos.x || initialPos.y !== currentPos.y || initialPos.z !== currentPos.z) {
        pinMoved = true
        break
      }
      if (initialPos.x !== currentPos.x && initialPos.y !== currentPos.y && initialPos.z !== currentPos.z) {
        allPinsMoved = false
        break
      }
    }
    if (pinMoved) { 
      console.log("pin Position changes.")
      addScore(1)
    }
    if(allPinsMoved) {
      console.log("Strike")
      reducechance(1)
    }
  }
  