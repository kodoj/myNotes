let draggedEl, 
    grabPointX,
    grabPointY;

function onDragStart(ev) {
    let boundingClientRect;
    if (ev.target.className.indexOf('bar') === -1) {
        return;
    }

    draggedEl = this;

    boundingClientRect = draggedEl.getBoundingClientRect();

    grabPointY = boundingClientRect.top - ev.clientY;
    grabPointX = boundingClientRect.left - ev.clientX;
};

const onDrag = function (ev) {
    if (!draggedEl) {
    return;
    }
    
    let posX = ev.clientX + grabPointX,
        posY = ev.clientY + grabPointY;
    
    if (posX < 0) {
    posX = 0;
    }
    
    if (posY < 0) {
    posY = 0;
    }
    
    draggedEl.style.transform = "translateX("+ posX + "px) translateY(" + posY + "px)"; //template strings
};

const onDragEnd = function () { 
    draggedEl = null;
    grabPointX = null;
    grabPointY = null;
};

document.addEventListener('mousemove', onDrag, false);
document.addEventListener('mouseup', onDragEnd, false);
