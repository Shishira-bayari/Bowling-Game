AFRAME.registerComponent('restart-game', {
  init() {

    const {sceneEl} = this.el
    const resetB = document.getElementById('restart-Button')
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

    const handleClick = (event) => {
      resetB.classList.add('pulse-once')

      Bowling.setAttribute('ammo-body', {
        type: 'kinematic'
      })
      Bowling.object3D.position.set(0, 0.75, -3)

      pin1.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin1.object3D.children[0].el.object3D.position.set(0, 3, -17)
      pin1.object3D.children[0].el.object3D.rotation.set(0, 0, 0)

      pin2.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin2.object3D.children[0].el.object3D.position.set(-0.5, 3, -18.5)
      pin2.object3D.children[0].el.object3D.rotation.set(0, 0, 0)

      pin3.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin3.object3D.children[0].el.object3D.position.set(0.5, 3, -18.5)
      pin3.object3D.children[0].el.object3D.rotation.set(0, 0, 0)

      pin4.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin4.object3D.children[0].el.object3D.position.set(0, 3, -20)
      pin4.object3D.children[0].el.object3D.rotation.set(0, 0, 0)

      pin5.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin5.object3D.children[0].el.object3D.position.set(-1, 3, -20)
      pin5.object3D.children[0].el.object3D.rotation.set(0, 0, 0)

      pin6.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin6.object3D.children[0].el.object3D.position.set(1, 3, -20)
      pin6.object3D.children[0].el.object3D.rotation.set(0, 0, 0)

      pin7.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin7.object3D.children[0].el.object3D.position.set(2, 3, -22)
      pin7.object3D.children[0].el.object3D.rotation.set(0, 0, 0)

      pin8.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin8.object3D.children[0].el.object3D.position.set(1, 3, -22)
      pin8.object3D.children[0].el.object3D.rotation.set(0, 0, 0)

      pin9.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin9.object3D.children[0].el.object3D.position.set(-2, 3, -22)
      pin9.object3D.children[0].el.object3D.rotation.set(0, 0, 0)

      pin10.object3D.children[0].el.setAttribute('ammo-body', {
        type: 'kinematic',
      })
      pin10.object3D.children[0].el.object3D.position.set(-1, 3, -22)
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
        Bowling.setAttribute('ammo-body', {
          type: 'dynamic'
        })
        resetB.classList.remove('pulse-once')
      }, 200)
    }
   resetB.addEventListener('click', handleClick, true)
  }
})