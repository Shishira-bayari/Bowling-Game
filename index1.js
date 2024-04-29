AFRAME.registerComponent('swipe-detect', {
    init() {
      this.startX = 0; // Using `this` to store startX
      this.endX = 0;   // Using `this` to store endX
      this.startTime = 0
      this.endTime = 0

    document.querySelectorAll('.pins').forEach( (pins) => {
      pins.setAttribute('ammo-body', 'type: dynamic; mass: 5')
      pins.setAttribute('ammo-shape', 'type: hull')
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
        if (this.endX <= this.startX) {
          console.log("Swipe left");
          BowlingBall.removeAttribute('ammo-body')
          BowlingBall.removeAttribute('ammo-shape')
          BowlingBall.setAttribute('ammo-body','type: dynamic; mass: 5; mass: 5; emitCollisionEvents: true')
          BowlingBall.setAttribute('ammo-shape','type: sphere;sphere-radius: 1;fit: manual')
          BowlingBall.setAttribute('collision-Listener', '')
          
          const randomX = this.endX - this.startX 
          const randomZ = this.endTime - this.startTime
          const speed = randomZ / randomX
          const zImpulse = 10 * speed
          var forceVector = new Ammo.btVector3(randomX, 0, zImpulse); // Define the force vector (adjust as needed)
          let vectorPos = new Ammo.btVector3(0, 0, 0)
          BowlingBall.body.applyImpulse(forceVector, vectorPos)
          
          
          Ammo.destroy(forceVector)
          Ammo.destroy(vectorPos)
        } else  {
          console.log("Swipe right");
          BowlingBall.removeAttribute('ammo-body')
          BowlingBall.removeAttribute('ammo-shape')
          BowlingBall.setAttribute('ammo-body','type: dynamic; mass: 5; mass: 5; emitCollisionEvents: true')
          BowlingBall.setAttribute('ammo-shape','type: sphere;sphere-radius: 1;fit: manual')
          BowlingBall.setAttribute('collision-Listener', '')
          
          const randomX = this.endX - this.startX 
          const randomZ = this.endTime - this.startTime
          const speed = randomZ / randomX
          const zImpulse = -10 * speed
          var forceVector = new Ammo.btVector3(randomX, 0, zImpulse); // Define the force vector (adjust as needed)
          let vectorPos = new Ammo.btVector3(0, 0, 0)
          BowlingBall.body.applyImpulse(forceVector, vectorPos)
          
          
          Ammo.destroy(forceVector)
          Ammo.destroy(vectorPos)
        }
        
        // Consider destroying the Ammo.js vectors if not managed by Ammo.js itself
      });
      
    }
  });

AFRAME.registerComponent('collision-Listener', {
    init() {
  
  
      const {el} = this 
      let collidedPins = []
        const collisionDetect = (e) => {
              console.log('collided')
              
              const collidedEntity = e.detail.targetEl
              //includes javascript 
              if (collidedEntity.id.includes('pin')) {
                  console.log('ball hit pin')
                  const pinRotat = collidedEntity.object3D.rotation
                  
                  
                  if(pinRotat.x !== 0 && pinRotat.y !== 0 ) {
                    addScore(1)
                    collidedPins.push(collidedEntity)
                  }
                  
                }
                if(collidedPins.includes(e.detail.targetEl) && e.detail.targetEl.id.includes('pin')) {
                  
                  console.log("already collided with that pin")
                  addScore(1)
                }
                setTimeout(() => {
                  resetGame()
                }, 10000)
              
          }
          this.el.addEventListener('collidestart', collisionDetect)
        
    }
})


  let currentLife=2

  function reduceLife(amount) {
    const HealthLife = document.getElementById('Life')

    currentLife -= amount
    if(currentLife <= 0) {
      currentLife = 0
      console.log("Your chance completed")
    }
    HealthLife.textContent = currentLife
  }

  function resetBall() {
    const BowlingBall = document.getElementById('Balls')
    console.log("Ball in initial position")
    BowlingBall.body.setLinearVelocity(new Ammo.btVector3(0, 0, 0))
    BowlingBall.body.setAngularVelocity(new Ammo.btVector3(0, 0, 0))
    BowlingBall.object3D.position.set(0, 1, 3)
  }

  let score = 0

  function addScore(amount) {
    score += amount
    document.getElementById('Score').textContent = `Score: ${score}`
    console.log(score)
  }

  

  

const resetGame = () => {
  
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
    
    
    
    
  }

 