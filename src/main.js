// main.js
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js' 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import ClippingContext from 'three/src/renderers/common/ClippingContext.js'
import { generateUUID } from 'three/src/math/MathUtils.js'

const canvas = document.getElementById('scene')

// --- renderer & camera ---
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
renderer.setSize(window.innerWidth, window.innerHeight)

const camera = new THREE.PerspectiveCamera(
  45, // fov (wider gives more tolerance)
  window.innerWidth / window.innerHeight,
  0.1,
  1000 // large far so big models are visible
)

// --- scene & lights ---
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000) // change to dusty sky color if you want

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0)
hemiLight.position.set(0, 50, 0)
scene.add(hemiLight)

const dirLight = new THREE.DirectionalLight(0xffffff, 1.0)
dirLight.position.set(5, 10, 7.5)
scene.add(dirLight)

// optional helpers for debugging position/orientation
const axes = new THREE.AxesHelper(2)
scene.add(axes)
// const grid = new THREE.GridHelper(50, 50); scene.add(grid)

// --- controls ---
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// --- load model and focus camera on it ---
const loader = new GLTFLoader()
loader.load('./models/mars.glb', (gltf) => {
  const model = gltf.scene
  scene.add(model)

  // compute bounding box
  const box = new THREE.Box3().setFromObject(model)
  const center = new THREE.Vector3()
  box.getCenter(center)
  const size = new THREE.Vector3()
  box.getSize(size)

  // recenter model so its geometric center is at world origin
  model.position.x += -center.x
  model.position.y += -center.y
  model.position.z += -center.z

  // compute a distance for camera to fit the model
  const maxDim = Math.max(size.x, size.y, size.z)
  const fov = camera.fov * (Math.PI / 180)
  let cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2)))
  cameraZ *= 0.5

  // set camera above and back a bit

// place camera at a 45° diagonal angle
const angle = Math.PI / 4 // 45 degrees
const x = Math.sin(angle) * cameraZ
const z = Math.cos(angle) * cameraZ
const y = cameraZ * 0.5  // tweak this factor to raise/lower the angle


camera.position.set(x, y, z)
camera.lookAt(0, 0, 0)


  controls.target.set(0, 0, 0)
  controls.update()

  camera.near = 0.1
  camera.far = Math.max(1000, cameraZ * 10)
  camera.updateProjectionMatrix()
}, undefined, (err) => {
  console.error('GLTF load error:', err)
})

loader.load('./models/tophabitat.glb', (gltf) => {
  const habitat = gltf.scene
  scene.add(habitat)

  // Center the habitat
  const box = new THREE.Box3().setFromObject(habitat)
  const center = box.getCenter(new THREE.Vector3())
  habitat.position.sub(center) // recenter to origin

  // Now move it up a bit (e.g. 2 units, tweak as needed)
  habitat.position.y += 2
}, undefined, (err) => {
  console.error('GLTF load error (habitat):', err)
})



function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)

}


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
})
function d3Choice(){
loader.load('./models/2ndfloorwalls.glb', (gltf) => {
  const habitat = gltf.scene
  scene.add(habitat)

  // Center the habitat
  const box = new THREE.Box3().setFromObject(habitat)
  const center = box.getCenter(new THREE.Vector3())
  habitat.position.sub(center) // recenter to origin

  // Now move it up a bit (e.g. 2 units, tweak as needed)
  habitat.position.y += 2
  console.log("file uplaoded")
}, undefined, (err) => {
  console.error('GLTF load error (habitat):', err)
})

}

function loadModel(path, yOffset = 0) {
  loader.load(path, (gltf) => {
    const model = gltf.scene

    // Center the model
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.sub(center)

    // Place above the ground
    model.position.y += yOffset
    draggableObjects.push(model)

    // Add to scene
    scene.add(model)
    console.log(`${path} loaded`)
  }, undefined, (err) => {
    console.error(`Error loading ${path}:`, err)
  })
}
const draggableObjects = []

document.getElementById("walls-item").addEventListener("click", () => {
  loadModel('./models/2ndfloorwalls.glb', 4)
})
document.getElementById("biolab-item").addEventListener('click', ()=>{
  loadModel('./models/biolab.glb',6)
})

document.getElementById("co2-item").addEventListener('click', ()=>{
  loadModel('./models/carbondioxideremoval.glb',6)
})

document.getElementById("chair-item").addEventListener('click', ()=>{
  loadModel('./models/chair.glb',6)
})
document.getElementById("heat-item").addEventListener('click', ()=>{
  loadModel('./models/condensingheatexchanger.glb',6)
})
document.getElementById("eva-item").addEventListener('click', ()=>{
  loadModel('./models/evacomputer.glb',6)
})
document.getElementById("bike-item").addEventListener('click', ()=>{
  loadModel('./models/excercisebike.glb',6)
})
document.getElementById("kitchen-item").addEventListener('click', ()=>{
  loadModel('./models/galleykitchen.glb',6)
})
document.getElementById("geolab-item").addEventListener('click', ()=>{
  loadModel('./models/geolab.glb',6)
})
document.getElementById("hygiene-item").addEventListener('click', ()=>{
  loadModel('./models/hygiene.glb',6)
})
document.getElementById("medbed-item").addEventListener('click', ()=>{
  loadModel('./models/medicalbed.glb',6)
})
document.getElementById("bed-item").addEventListener('click', ()=>{
  loadModel('./models/normalbed.glb',6)
})
document.getElementById("oxygen-item").addEventListener('click', ()=>{
  loadModel('./models/oxygengenerator.glb',6)
})
document.getElementById("pallet-item").addEventListener('click', ()=>{
  loadModel('./models/pallet.glb',6)
})
document.getElementById("physics-item").addEventListener('click', ()=>{
  loadModel('./models/physicslab.glb',6)
})
document.getElementById("roundtable-item").addEventListener('click', ()=>{
  loadModel('./models/roundtable.glb',6)
})
document.getElementById("squaretable-item").addEventListener('click', ()=>{
  loadModel('./models/squaretable.glb',6)
})
document.getElementById("stairs-item").addEventListener('click', ()=>{
  loadModel('./models/stairsand2ndfloor.glb',6)
})
document.getElementById("storage-item").addEventListener('click', ()=>{
  loadModel('./models/storage.glb',6)
})
document.getElementById("suitport-item").addEventListener('click', ()=>{
  loadModel('./models/suitport.glb',6)
})
document.getElementById("urine-item").addEventListener('click', ()=>{
  loadModel('./models/urineprocessor.glb',6)
})
document.getElementById("toilet-item").addEventListener('click', ()=>{
  loadModel('./models/uwmstoilet.glb',6)
})

document.getElementById("water-item").addEventListener('click', ()=>{
  loadModel('./models/waterprocessor.glb',6)
})

document.getElementById("workbench-item").addEventListener('click', ()=>{
  loadModel('./models/workbench.glb',6)
})

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
let selectedObject = null
let offset = new THREE.Vector3()
let plane = new THREE.Plane()
let intersection = new THREE.Vector3()
let isDragging = false

// Mouse down → pick object
window.addEventListener('mousedown', (event) => {
  event.preventDefault()

  // Normalize mouse coords (-1 to 1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(draggableObjects, true)


  if (intersects.length > 0) {
    selectedObject = intersects[0].object.parent || intersects[0].object
    isDragging = true

    // Create a plane at the hit point (so we drag along that plane)
    plane.setFromNormalAndCoplanarPoint(
      camera.getWorldDirection(new THREE.Vector3()),
      intersects[0].point
    )
    controls.enableZoom=false
    controls.enableRotate=false

    offset.copy(intersects[0].point).sub(selectedObject.position)
  }
})

// Mouse move → drag
window.addEventListener('mousemove', (event) => {
  if (!isDragging || !selectedObject) return

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  if (raycaster.ray.intersectPlane(plane, intersection)) {
    selectedObject.position.copy(intersection.sub(offset))
  }
})

// Mouse up → drop
window.addEventListener('mouseup', () => {
  isDragging = false
  controls.enableRotate=true
  controls.enableZoom=true
  selectedObject = null
})



animate()