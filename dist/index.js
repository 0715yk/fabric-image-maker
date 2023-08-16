"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fabric_1 = require("fabric");
var inpainter = (function () {
    var imageStackCanvas = null;
    var drawingCanvas = {
        context: null,
        canvas: null,
        color: "#FFFFFF",
        strokeWidth: 15,
    };
    var selectedImage = null;
    return {
        createDrawingCanvas: function (id) {
            var latestPoint = [0, 0];
            var drawing = false;
            var canvas = document.querySelector(id);
            if (canvas !== null) {
                var context_1 = canvas.getContext("2d");
                if (context_1 !== null) {
                    drawingCanvas.context = context_1;
                    drawingCanvas.canvas = canvas;
                    var continueStroke_1 = function (newPoint) {
                        context_1.beginPath();
                        context_1.moveTo(latestPoint[0], latestPoint[1]);
                        context_1.strokeStyle = drawingCanvas.color;
                        context_1.lineWidth = drawingCanvas.strokeWidth;
                        context_1.lineCap = "round";
                        context_1.lineJoin = "round";
                        context_1.lineTo(newPoint[0], newPoint[1]);
                        context_1.stroke();
                        latestPoint = newPoint;
                    };
                    // Event helpers
                    var startStroke_1 = function (point) {
                        drawing = true;
                        latestPoint = point;
                    };
                    // Event handlers
                    var mouseMove_1 = function (evt) {
                        if (!drawing) {
                            return;
                        }
                        continueStroke_1([
                            evt.offsetX,
                            evt.offsetY,
                        ]);
                    };
                    var mouseDown_1 = function (evt) {
                        if (drawing) {
                            return;
                        }
                        evt.preventDefault();
                        canvas.addEventListener("mousemove", mouseMove_1, false);
                        startStroke_1([evt.offsetX, evt.offsetY]);
                    };
                    var mouseEnter = function (evt) {
                        if (!drawing) {
                            return;
                        }
                        mouseDown_1(evt);
                    };
                    var endStroke = function (evt) {
                        if (!drawing) {
                            return;
                        }
                        drawing = false;
                        if (evt.currentTarget !== null) {
                            evt.currentTarget.removeEventListener("mousemove", mouseMove_1, false);
                        }
                    };
                    // event listeners
                    canvas.addEventListener("mousedown", mouseDown_1, false);
                    canvas.addEventListener("mouseup", endStroke, false);
                    canvas.addEventListener("mouseout", endStroke, false);
                    canvas.addEventListener("mouseenter", mouseEnter, false);
                    return { canvas: canvas, context: context_1 };
                }
                else {
                    return { canvas: null, context: null };
                }
            }
            return { canvas: null, context: null };
        },
        setDrawingMode: function (mode) {
            if (drawingCanvas.context !== null) {
                drawingCanvas.context.globalCompositeOperation =
                    mode === "brush" ? "source-over" : "destination-out";
            }
        },
        setStrokeWidth: function (width) {
            drawingCanvas.strokeWidth = width;
        },
        setBrushColor: function (color) {
            drawingCanvas.color = color;
        },
        createImageCanvas: function (_a) {
            var id = _a.id, width = _a.width, height = _a.height, backgroundColor = _a.backgroundColor;
            try {
                imageStackCanvas = new fabric_1.fabric.Canvas(id, {
                    backgroundColor: backgroundColor,
                    preserveObjectStacking: true,
                });
                imageStackCanvas.setWidth(width);
                imageStackCanvas.setHeight(height);
                return imageStackCanvas;
            }
            catch (e) {
                console.error(e);
                return null;
            }
        },
        addImageLayer: function (src) {
            (function () {
                fabric_1.fabric.Image.fromURL(src, function (oImg) {
                    if (imageStackCanvas !== null) {
                        oImg.set("left", 0).set("top", 0);
                        oImg.on("selected", function () {
                            selectedImage = oImg;
                        });
                        imageStackCanvas.add(oImg);
                    }
                });
            })();
        },
        bringForward: function () {
            if (selectedImage !== null && imageStackCanvas !== null) {
                imageStackCanvas.bringForward(selectedImage);
            }
        },
        bringToFront: function () {
            if (selectedImage !== null && imageStackCanvas !== null) {
                imageStackCanvas.bringToFront(selectedImage);
            }
        },
        bringBack: function () {
            if (selectedImage !== null && imageStackCanvas !== null) {
                imageStackCanvas.sendToBack(selectedImage);
            }
        },
        bringToBackward: function () {
            if (selectedImage !== null && imageStackCanvas !== null) {
                imageStackCanvas.sendBackwards(selectedImage);
            }
        },
        deleteImage: function () {
            if (selectedImage !== null && imageStackCanvas !== null) {
                imageStackCanvas.remove(selectedImage);
            }
        },
        cloneCanvas: function (oldCanvas) {
            var newCanvas = document.createElement("canvas");
            var context = newCanvas.getContext("2d");
            newCanvas.width = oldCanvas.width;
            newCanvas.height = oldCanvas.height;
            if (context !== null) {
                context.drawImage(oldCanvas, 0, 0);
            }
            return { canvas: newCanvas, context: context };
        },
        canvasToDataUrl: function (type) {
            if (type === "image") {
                if (imageStackCanvas !== null) {
                    var pngURL = imageStackCanvas.toDataURL();
                    return pngURL;
                }
                else {
                    return "";
                }
            }
            else if (type === "mask") {
                if (drawingCanvas.canvas !== null && drawingCanvas.context !== null) {
                    var _a = this.cloneCanvas(drawingCanvas.canvas), canvas = _a.canvas, context = _a.context;
                    if (context !== null) {
                        context.globalCompositeOperation = "destination-over";
                        context.fillStyle = "black";
                        context.fillRect(0, 0, drawingCanvas.canvas.width, drawingCanvas.canvas.height);
                        context.drawImage(canvas, 0, 0);
                        var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
                        for (var i = 0; i < imgData.data.length; i += 4) {
                            var count = imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2];
                            var colour = 0;
                            if (count > 383)
                                colour = 255;
                            imgData.data[i] = colour;
                            imgData.data[i + 1] = colour;
                            imgData.data[i + 2] = colour;
                            imgData.data[i + 3] = 255;
                        }
                        context.putImageData(imgData, 0, 0);
                        var pngURL = canvas.toDataURL();
                        return pngURL;
                    }
                    else {
                        return "";
                    }
                }
                else {
                    return "";
                }
            }
            else {
                return "";
            }
        },
        dataURItoBlob: function (dataURI) {
            var byteString = window.atob(dataURI.split(",")[1]);
            var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            var bb = new Blob([ab], { type: mimeString });
            return bb;
        },
        imageCanvasToBlob: function () {
            var dataURI = this.canvasToDataUrl("image");
            var blob = this.dataURItoBlob(dataURI);
            return blob;
        },
        drawingCanvasToBlob: function () {
            var dataURI = this.canvasToDataUrl("mask");
            var blob = this.dataURItoBlob(dataURI);
            return blob;
        },
    };
})();
exports.default = inpainter;
