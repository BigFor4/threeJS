import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';
import { GUI } from '/jsm/libs/dat.gui.module.js'
let scene;
let camera;
let renderer;
const canvas = document.querySelector('.solarsystem');
scene = new THREE.Scene();
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10;
scene.add(camera);
renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);
const gui = new  GUI();

//Tạo mặt trời
const sunGeometry = new THREE.SphereGeometry(1.2, 32, 32);

const sunMaterial = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('img/sun.jpg'),
});
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sunMesh);

//Tạo dat.GUI test
const sunMeshFolder = gui.addFolder('sunMesh')
sunMeshFolder.add(sunMesh.rotation, 'x', 0, Math.PI * 2)
sunMeshFolder.add(sunMesh.rotation, 'y', 0, Math.PI * 2)
sunMeshFolder.add(sunMesh.rotation, 'z', 0, Math.PI * 2)
sunMeshFolder.open()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.add(camera.position, 'y', 0, 10)
cameraFolder.add(camera.position, 'x', 0, 10)
cameraFolder.open()

//Hàm tạo quỹ đạo
function createRing(size ){
    const geometry = new THREE.RingGeometry(size, size+0.01, 100 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.rotation.x=THREE.Math.degToRad(90);
    scene.add( mesh );
}
//Tạo quỹ đạo cho sao thủy
const trajectoryMercuryGeometry = createRing(1.8);
//Tạo quỹ đạo cho sao kim
const trajectoryVenusGeometry = createRing(2.5);
//Tạo quỹ đạo cho trái đất
const trajectoryEarthGeometry = createRing(4);
//Tạo quỹ đạo cho sao hỏa
const trajectoryMarsGeometry = createRing(6);
//Tạo quỹ đạo cho trái đất
const trajectoryJupiterGeometry = createRing(8);
//Tạo quỹ đạo sao thổ
const trajectorySaturnGeometry = createRing(10);
//Tạo quỹ đạo sao Thien vuong
const trajectoryUranusGeometry = createRing(11);
//Tạo quỹ đạo sao Hai vuong
const trajectoryNeptuneGeometry = createRing(12);
//Tạo quỹ đạo sao diem vuong
const trajectoryPlutomapGeometry = createRing(13);

//Hàm tạo sao
function createPlanet(size , img , positionX ){
    const obj = new THREE.Object3D();
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        map: THREE.ImageUtils.loadTexture(img),
    });
    const pointLight = new THREE.PointLight(0xFFFFFF , 0.5 , 15);
    scene.add(pointLight);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = positionX;
    obj.add(mesh);
    scene.add(obj);
    return {mesh , obj}
}




const earth = createPlanet(0.4,'img/traidat.jpg',4);
const mercury = createPlanet(0.2,'img/mercurymap.jpg',1.8);
const venus = createPlanet(0.3,'img/venusmap.jpg',2.5);
const mars = createPlanet(0.3,'img/marsmap1k.jpg',6);
const jupiter = createPlanet(0.6,'img/jupiter2_1k.jpg',8);
const saturn = createPlanet(0.5,'img/saturnmap.jpg',10);
const uranus = createPlanet(0.3,'img/uranusmap.jpg',11);
const neptune = createPlanet(0.2,'img/neptunemap.jpg',12);
const plutomap = createPlanet(0.15,'img/plutomap1k.jpg',13);

//Tạo nhẫn cho sao thổ

const beltSaturnGeometry = new THREE.RingGeometry(0.8, 0.6, 100 );
const beltSaturnMaterial = new THREE.MeshBasicMaterial( {
    map: THREE.ImageUtils.loadTexture('img/saturnmap.jpg'),
} );
const beltSaturnMesh = new THREE.Mesh( beltSaturnGeometry, beltSaturnMaterial );
beltSaturnMesh.rotation.x=THREE.Math.degToRad(120);
saturn.mesh.add( beltSaturnMesh );

//Tạo mặt trăng
const moonGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('img/mattrang.jpg'),
});
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
moonMesh.position.x = -0.8;
earth.mesh.add(moonMesh);

// Tạo sao bao quanh
const starGeometry = new THREE.SphereGeometry(800, 64, 64);
const starMaterial = new THREE.MeshStandardMaterial({
    map : THREE.ImageUtils.loadTexture('img/sao.png'),
    side: THREE.BackSide
});
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);




window.addEventListener('resize' , function(){
    var height = window.innerHeight;
    var width = window.innerWidth;
    renderer.setSize( width, height );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})

const render = () => {
    renderer.render(scene, camera);
}
const animate = () => {
    requestAnimationFrame(animate);

    earth.obj.rotation.y -= 0.003;
    mercury.obj.rotation.y -= 0.002;
    saturn.obj.rotation.y -= 0.004;
    sunMesh.rotation.y -= 0.003;
    venus.obj.rotation.y -= 0.005;
    jupiter.obj.rotation.y -= 0.006;
    mars.obj.rotation.y -= 0.007;
    uranus.obj.rotation.y -= 0.008;
    neptune.obj.rotation.y -= 0.009;
    plutomap.obj.rotation.y -= 0.01;


    starMesh.rotation.y -= 0.002;
    moonMesh.rotation.y -= 0.004;
    saturn.mesh.rotation.y -= 0.04;
    mercury.mesh.rotation.y -= 0.02;
    earth.mesh.rotation.y -= 0.004;
    venus.mesh.rotation.y -= 0.005;
    jupiter.mesh.rotation.y -= 0.006;
    mars.mesh.rotation.y -= 0.007;
    uranus.mesh.rotation.y -= 0.008;
    neptune.mesh.rotation.y -= 0.009;
    plutomap.mesh.rotation.y -= 0.01;
    controls.update();
    render();
    
};



animate();