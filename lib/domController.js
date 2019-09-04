module.exports = makeDomController;

function makeDomController(domElement, options) {
  var elementValid = domElement instanceof HTMLElement;
  if (!elementValid) {
    throw new Error("svg element is required for svg.panzoom to work");
  }

  var owner = domElement.parentElement;
  if (!owner) {
    throw new Error("Do not apply panzoom to the detached DOM element. ");
  }

  domElement.scrollTop = 0;

  if (!options.disableKeyboardInteraction) {
    owner.setAttribute("tabindex", 0);
  }

  var api = {
    getBBox: getBBox,
    getOwner: getOwner,
    applyTransform: applyTransform
  };

  return api;

  function getOwner() {
    return owner;
  }

  function getBBox() {
    // TODO: We should probably cache this?
    return {
      left: 0,
      top: 0,
      width: domElement.clientWidth,
      height: domElement.clientHeight
    };
  }

  function applyTransform(transform, el) {
    // TODO: Should we cache this?
    domElement.style.transformOrigin = "center";
    const { scale, x, y } = transform;
    const rotateIndex = el.style.transform.indexOf("rotate");
    let rotate = "";
    if (rotateIndex > -1) {
      rotate = el.style.transform.substring(rotateIndex);
    }
    const t = `scaleX(${scale}) skewY(0) skewX(0) scaleY(${scale}) translateX(${x}px) translateY(${y}px) ${rotate}`;
    domElement.style.transform = t;
  }
}
