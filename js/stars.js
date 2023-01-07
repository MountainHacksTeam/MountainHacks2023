var zoomEffectEnabled = true;

let scene, camera, renderer, stars, starGeo;

var mousePos = { x: 0, y: 0 };
var starSpeed = 0.8;
var starToMouseSpeed = 0.8;

addEventListener("mousemove", (event) => {
    var mX = event.clientX;
    var mY = event.clientY;

    var wW = window.innerWidth;
    var wH = window.innerHeight;

    var cX = mX - (wW / 2);
    var cY = -(mY - (wH / 2));

    mousePos.x = 2 * cX / wW;
    mousePos.y = 2 * cY / wH;
    console.log(mousePos);
})

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    var canvas = document.getElementById("stars-canvas");
    renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canvas });
    var starsContainer = document.getElementById("stars-canvas-container");
    starsContainer.appendChild(canvas);
    setTimeout(() => {
        starsContainer.appendChild(canvas);
    }, 200);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    starGeo = new THREE.Geometry();
    for (let i = 0; i < 6000; i++) {
        star = new THREE.Vector3(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
        );
        starGeo.vertices.push(star);
    }

    let sprite = new THREE.TextureLoader().load('assets/star.png');
    let starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.7,
        map: sprite
    });

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    window.addEventListener("resize", onWindowResize, false);

    animate();
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
var frame = 0;
function animate() {
    if (zoomEffectEnabled) {
        starGeo.vertices.forEach(p => {
            p.y -= starSpeed;
            p.x += mousePos.x * starToMouseSpeed;
            p.z += mousePos.y * starToMouseSpeed;

            if (p.y < -200) {
                p.y = 200;
                p.x = Math.random() * 600 - 300;
                p.z = Math.random() * 600 - 300;
                // p.velocity = 0;
            }
        });
        starGeo.verticesNeedUpdate = true;
        // stars.rotation.y += 0.01;

        renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
}
init();