AFRAME.registerComponent('swipe-detector', {
  init() {
    this.startX = 0; // Using `this` to store startX
    this.endX = 0;   // Using `this` to store endX
    this.startTime = 0
    this.endTime = 0

  document.querySelectorAll('.pins').forEach( (pins) => {
    pins.setAttribute('ammo-body', 'type: dynamic; mass: 1; ')
    pins.setAttribute('ammo-shape', 'type: hull;')
  })

    this.el.addEventListener('touchstart', (evt) => {
      this.startX = evt.touches[0].clientX;  // Arrow function to keep `this` context
      this.startTime = performance.now()
    });
    
    this.el.addEventListener('touchend', (evt) => {
      this.endX = evt.changedTouches[0].clientX;  // Arrow function to keep `this` context
      this.endTime = performance.now()

      const BowlingBall = document.getElementById('Balls');
      BowlingBall.setAttribute('ammo-body','type: kinematic')
      reduceLife(1)
      BowlingBall.removeAttribute('ammo-body')
      BowlingBall.removeAttribute('ammo-shape')
      BowlingBall.setAttribute('ammo-body','type: dynamic; mass: 5; mass: 5; emitCollisionEvents: true')
      BowlingBall.setAttribute('ammo-shape','type: sphere;sphere-radius: 1;fit: manual')
      BowlingBall.setAttribute('collision-listener', '')

      const randomX = this.endX - this.startX 
      const randomZ = this.endTime - this.startTime
      const speed = randomZ / randomX
      let zImpulse
      if (this.endX <= this.startX) {
        console.log("Swipe left");
        zImpulse = 10 * speed
        
      } else  {
        console.log("Swipe right");
        zImpulse = -10 * speed
       
      }
      var forceVector = new Ammo.btVector3(randomX, 0, zImpulse); // Define the force vector (adjust as needed)
        let vectorPos = new Ammo.btVector3(0, 0, 0)
        BowlingBall.body.applyImpulse(forceVector, vectorPos)
        Ammo.destroy(forceVector)
        Ammo.destroy(vectorPos)
      
      // Consider destroying the Ammo.js vectors if not managed by Ammo.js itself
    });
    
  }
});

AFRAME.registerComponent('collision-listener', {
  init() {
    const { el } = this;
    let collidedPins = [];

    const collisionDetect = (e) => {
      const collidedEntity = e.detail.targetEl;
      if (collidedEntity.id.includes('pin')) {
        // Check if the pin has already been collided with
        if (!collidedPins.includes(collidedEntity)) {
          console.log('Ball hit pin');
          
          }
        }
      }
    el.addEventListener('collidestart', collisionDetect);
  }
});
const totalPins = 10

const strikechecking = () => {
  let collidedPins = []

  if (collidedPins.length === totalPins) {
    console.log("Stike Ball!") 
  }
}

const rotationScore = (e) => {
  const pinRotat = e.detail.targetEl.object3D.rotation
  let collidedPins = []

  if(pinRotat.x !== 0 || pinRotat.y !== 0 || pinRotat.z !== 0) {
    addScore(1); 
    collidedPins.push(e.detail.targetEl)
    e.detail.targetEl.parentNode.removeChild(e.detail.targetEl)
    strikechecking()
  }
}  


let currentChance = 10
let initialLife = 2
let currentLife = initialLife

let firstScore = 0
let secondScore = 0
let totalScore = 0

function reduceLife(amount) {
  const HealthLife = document.getElementById('Life')
  

  currentLife -= amount
  if(currentLife < 0) {
    currentLife = 0
    firstScore = 0
    secondScore = 0
    totalScore = 0
    currentLife = initialLife
    console.log("Your chance completed")
    
    
  }
  HealthLife.textContent = currentLife
  
}
/*function resetPins() {
  const pinParent = document.getElementById('pin-parent');
  
  document.querySelectorAll('.pins').forEach((pin) => {
    pinParent.removeChild(pin);
    pin.setAttribute('ammo-body', 'type: dynamic; mass: 5');
    pin.setAttribute('ammo-shape', 'type: hull; fit: all');
    el.appendChild(pin); // Add pin back to the scene
  });
}*/

function reducechance(amount) {
  const HealthChance = document.getElementById('Total-life')

  currentChance -= amount
  if(currentChance === 0) {
    currentChance = 0
    console.log("You have no more chances left.")
  }

  HealthChance.textContent = currentChance
}

/*function resetBall() {
  const BowlingBall = document.getElementById('Balls')
  console.log("Ball in initial position")
  BowlingBall.body.setLinearVelocity(new Ammo.btVector3(0, 0, 0))
  BowlingBall.body.setAngularVelocity(new Ammo.btVector3(0, 0, 0))
  BowlingBall.object3D.position.set(0, 1, 3)
}*/

function addScore(amount) {
  if (currentLife === 1) {
    firstScore += amount

    document.getElementById('First-score').textContent = `First-try: ${firstScore}`
    setTimeout(() => {
      resetball()
    }, 3000)   
  } else if (currentLife === 0) {
    secondScore += amount

    document.getElementById('Second-score').textContent = `Second-try: ${secondScore}`

    setTimeout(() => {
      resetball()
      CalculateScore()
      reducechance(1)
      
    }, 5000) 
  } 
  console.log(totalScore)
}

const CalculateScore = () => {
  totalScore = firstScore + secondScore;
  document.getElementById('Total-score').textContent = `Total: ${totalScore}`;
}

/*const resetGame = () => {
  console.log("Reset")
  
  const pin1 = document.getElementById('pin-1')
  const pin2 = document.getElementById('pin-2')
  const pin3 = document.getElementById('pin-3')
  const pin4 = document.getElementById('pin-4')
  const pin5 = document.getElementById('pin-5')
  const pin6 = document.getElementById('pin-6')
  const pin7 = document.getElementById('pin-7')
  const pin8 = document.getElementById('pin-8')
  const pin9 = document.getElementById('pin-9')
  const pin10 = document.getElementById('pin-10')

  

  const Bowling = document.getElementById('Balls')

  
    Bowling.setAttribute('ammo-body', {
      type: 'kinematic',
    })
    Bowling.object3D.position.set(0, 1, 3)

    const pins = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10]

    document.querySelectorAll('.pins').forEach( (pin) => {
      console.log(pin)
      pin.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      
      pin.object3D.position.set(0, 0, 0);
    })
    
    pin1.object3D.position.set(0 ,1, -5)
    pin1.object3D.rotation.set(0, 0, 0)

    pin2.object3D.position.set(-1 ,1 ,-9)
    pin2.object3D.rotation.set(0, 0, 0)

    pin3.object3D.position.set(0.5 ,1 ,-9)
    pin3.object3D.rotation.set(0, 0, 0)

    pin4.object3D.position.set(-2.5 ,1 ,-14)
    pin4.object3D.rotation.set(0, 0, 0)

    pin5.object3D.position.set(0.25 ,1 ,-14)
    pin5.object3D.rotation.set(0, 0, 0)

    pin6.object3D.position.set(2.5 ,1 ,-14)
    pin6.object3D.rotation.set(0, 0, 0)

    pin7.object3D.position.set(-3 ,1 ,-19)
    pin7.object3D.rotation.set(0, 0, 0)

    pin8.object3D.position.set(-1 ,1 ,-19)
    pin8.object3D.rotation.set(0, 0, 0)

    pin9.object3D.position.set(1.5 ,1 ,-19)
    pin9.object3D.rotation.set(0, 0, 0)

    pin10.object3D.position.set(3 ,2 ,-19)
    pin10.object3D.rotation.set(0, 0, 0)

    setTimeout(() => {
      pins.forEach(pin => {
        pin.setAttribute('ammo-body', {
          type: 'dynamic'
        })
      })
      Bowling.setAttribute('ammo-body', {
        type: 'dynamic'
      })
    }, 10000)
  
    const pinParent = document.getElementById("pin-Parent")

    document.querySelectorAll('.pins').forEach(pin => {
      pinParent.appendChild(pin)
      pin.setAttribute('ammo-body', {
        type: 'kinematic'
      })
    })
}*/

const resetball = () => {
  const Bowling = document.getElementById('Balls')
  console.log("Ball is set to initial position")
  
  Bowling.setAttribute('ammo-body', {
    type: 'kinematic',
  })
  Bowling.object3D.position.set(0, 1, 3)

  setTimeout(() => {
    Bowling.setAttribute('ammo-body', {
      type: 'dynamic'
    })
    setTimeout(() => {
      check_position_of_pins()
    },500)
  },5000)
}

//Comparing if initial position of pins are same as there current position

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

AFRAME.registerComponent("restart-game", {
  init() {
    const {sceneEl} = this.el
    const resetButton = document.getElementById('restart-button')
    const pin1 = document.getElementById('pin-1')
    const pin2 = document.getElementById('pin-2')
    const pin3 = document.getElementById('pin-3')
    const pin4 = document.getElementById('pin-4')
    const pin5 = document.getElementById('pin-5')
    const pin6 = document.getElementById('pin-6')
    const pin7 = document.getElementById('pin-7')
    const pin8 = document.getElementById('pin-8')
    const pin9 = document.getElementById('pin-9')
    const pin10 = document.getElementById('pin-10')
    const ball = document.getElementById('Balls')
  
    const handleClickEvent = (el) => {
      resetButton.classList.add('pulse-once')
  
      ball.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      ball.object3D.position.set(0, 1, 3)
  
      pin1.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin1.object3D.children[0].el.object3D.position.set(0 ,1, -5)
      pin1.object3D.children[0].el.object3D.rotation.set(0, 0, 0)
  
      pin2.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin2.object3D.children[0].el.object3D.position.set(-1 ,1 ,-9)
      pin2.object3D.children[0].el.object3D.rotation.set(0, 0, 0)
  
      pin3.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin3.object3D.children[0].el.object3D.position.set(0.5 ,1 ,-9)
      pin3.object3D.children[0].el.object3D.rotation.set(0, 0, 0)
  
      pin4.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin4.object3D.children[0].el.object3D.position.set(-2.5 ,1 ,-14)
      pin4.object3D.children[0].el.object3D.rotation.set(0, 0, 0)
  
      pin5.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin5.object3D.children[0].el.object3D.position.set(0.25 ,1 ,-14)
      pin5.object3D.children[0].el.object3D.rotation.set(0, 0, 0)
  
      pin6.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin6.object3D.children[0].el.object3D.position.set(2.5 ,1 ,-14)
      pin6.object3D.children[0].el.object3D.rotation.set(0, 0, 0)

      pin7.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin7.object3D.children[0].el.object3D.position.set(-3 ,1 ,-19)
      pin7.object3D.children[0].el.object3D.rotation.set(0, 0, 0)

      pin8.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin8.object3D.children[0].el.object3D.position.set(-1 ,1 ,-19)
      pin8.object3D.children[0].el.object3D.rotation.set(0, 0, 0)

      pin9.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin9.object3D.children[0].el.object3D.position.set(1.5 ,1 ,-19)
      pin9.object3D.children[0].el.object3D.rotation.set(0, 0, 0)

      pin10.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin10.object3D.children[0].el.object3D.position.set(3 ,2 ,-19)
      pin10.object3D.children[0].el.object3D.rotation.set(0, 0, 0)

      
  
      setTimeout(() => {
        pin1.object3D.children[0].el.setAttribute('ammo-body', {
          type: 'dynamic',
        })
        pin2.object3D.children[0].el.setAttribute('ammo-body', {
          type: 'dynamic',
        })
        pin3.object3D.children[0].el.setAttribute('ammo-body', {
          type: 'dynamic',
        })
        pin4.object3D.children[0].el.setAttribute('ammo-body', {
          type: 'dynamic',
        })
        pin5.object3D.children[0].el.setAttribute('ammo-body', {
          type: 'dynamic',
        })
        pin6.object3D.children[0].el.setAttribute('ammo-body', {
          type: 'dynamic',
        })
        pin7.object3D.children[0].el.setAttribute('ammo-body', {
          type: 'dynamic',
        })
        pin8.object3D.children[0].el.setAttribute('ammo-body', {
          type: 'dynamic',
        })
        pin9.object3D.children[0].el.setAttribute('ammo-body', {
          type: 'dynamic',
        })
        pin10.object3D.children[0].el.setAttribute('ammo-body', {
          type: 'dynamic',
        })
        ball.setAttribute('ammo-body', {
          type: 'dynamic',
        })
        resetButton.classList.remove('pulse-once')
      }, 200)
    }
    resetButton.addEventListener('click', handleClickEvent, true)
  }
  
})
