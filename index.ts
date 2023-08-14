import { fabric } from "fabric";

const inpainter = (function () {
  let imageStackCanvas = null as null | fabric.Canvas;
  let drawingCanvas = {
    context: null as null | CanvasRenderingContext2D,
    canvas: null as null | HTMLCanvasElement,
    color: "#FFFFFF",
    strokeWidth: 15,
  };
  let selectedImage = null as null | fabric.Image;

  return {
    createDrawingCanvas(id: string) {
      let latestPoint = [0, 0];
      let drawing = false;
      const canvas = document.querySelector(id) as HTMLCanvasElement;
      if (canvas !== null) {
        const context = canvas.getContext("2d");

        if (context !== null) {
          drawingCanvas.context = context;
          drawingCanvas.canvas = canvas;
          const continueStroke = (newPoint: number[]) => {
            context.beginPath();
            context.moveTo(latestPoint[0], latestPoint[1]);
            context.strokeStyle = drawingCanvas.color;
            context.lineWidth = drawingCanvas.strokeWidth;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.lineTo(newPoint[0], newPoint[1]);
            context.stroke();

            latestPoint = newPoint;
          };

          // Event helpers

          const startStroke = (point: number[]) => {
            drawing = true;
            latestPoint = point;
          };

          // Event handlers

          const mouseMove = (evt: Event) => {
            if (!drawing) {
              return;
            }

            continueStroke([
              (<MouseEvent>evt).offsetX,
              (<MouseEvent>evt).offsetY,
            ]);
          };

          const mouseDown = (evt: MouseEvent) => {
            if (drawing) {
              return;
            }
            evt.preventDefault();
            canvas.addEventListener("mousemove", mouseMove, false);
            startStroke([evt.offsetX, evt.offsetY]);
          };

          const mouseEnter = (evt: MouseEvent) => {
            if (!drawing) {
              return;
            }
            mouseDown(evt);
          };

          const endStroke = (evt: MouseEvent) => {
            if (!drawing) {
              return;
            }
            drawing = false;
            if (evt.currentTarget !== null) {
              evt.currentTarget.removeEventListener(
                "mousemove",
                mouseMove,
                false
              );
            }
          };

          // event listeners
          canvas.addEventListener("mousedown", mouseDown, false);
          canvas.addEventListener("mouseup", endStroke, false);
          canvas.addEventListener("mouseout", endStroke, false);
          canvas.addEventListener("mouseenter", mouseEnter, false);

          return { canvas, context };
        } else {
          return { canvas: null, context: null };
        }
      }
      return { canvas: null, context: null };
    },
    setDrawingMode(mode: string) {
      if (drawingCanvas.context !== null) {
        drawingCanvas.context.globalCompositeOperation =
          mode === "brush" ? "source-over" : "destination-out";
      }
    },
    setStrokeWidth(width: number) {
      drawingCanvas.strokeWidth = width;
    },
    setBrushColor(color: string) {
      drawingCanvas.color = color;
    },
    createImageCanvas({
      id,
      width,
      height,
      backgroundColor,
    }: {
      id: string;
      width: number;
      height: number;
      backgroundColor: string;
    }) {
      try {
        imageStackCanvas = new fabric.Canvas(id, {
          backgroundColor: backgroundColor,
          preserveObjectStacking: true,
        });
        imageStackCanvas.setWidth(width);
        imageStackCanvas.setHeight(height);
        return imageStackCanvas;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    addImageLayer(src: string) {
      (function () {
        fabric.Image.fromURL(src, function (oImg: fabric.Image) {
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
    bringForward() {
      if (selectedImage !== null && imageStackCanvas !== null) {
        imageStackCanvas.bringForward(selectedImage);
      }
    },
    bringToFront() {
      if (selectedImage !== null && imageStackCanvas !== null) {
        imageStackCanvas.bringToFront(selectedImage);
      }
    },
    bringBack() {
      if (selectedImage !== null && imageStackCanvas !== null) {
        imageStackCanvas.sendToBack(selectedImage);
      }
    },
    bringToBackward() {
      if (selectedImage !== null && imageStackCanvas !== null) {
        imageStackCanvas.sendBackwards(selectedImage);
      }
    },
    deleteImage() {
      if (selectedImage !== null && imageStackCanvas !== null) {
        imageStackCanvas.remove(selectedImage);
      }
    },
    cloneCanvas(oldCanvas: HTMLCanvasElement) {
      const newCanvas = document.createElement("canvas");
      const context = newCanvas.getContext("2d");

      newCanvas.width = oldCanvas.width;
      newCanvas.height = oldCanvas.height;

      if (context !== null) {
        context.drawImage(oldCanvas, 0, 0);
      }

      return { canvas: newCanvas, context };
    },
    canvasToDataUrl(type: string) {
      if (type === "image") {
        if (imageStackCanvas !== null) {
          const pngURL = imageStackCanvas.toDataURL();
          return pngURL;
        } else {
          return "";
        }
      } else if (type === "mask") {
        if (drawingCanvas.canvas !== null && drawingCanvas.context !== null) {
          const { canvas, context } = this.cloneCanvas(drawingCanvas.canvas);
          if (context !== null) {
            context.globalCompositeOperation = "destination-over";
            context.fillStyle = "black";
            context.fillRect(
              0,
              0,
              drawingCanvas.canvas.width,
              drawingCanvas.canvas.height
            );
            const pngURL = canvas.toDataURL();
            return pngURL;
          } else {
            return "";
          }
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    dataURItoBlob(dataURI: string) {
      const byteString = window.atob(dataURI.split(",")[1]);
      const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const bb = new Blob([ab], { type: mimeString });
      return bb;
    },
    imageCanvasToBlob() {
      const dataURI = this.canvasToDataUrl("image");
      const blob = this.dataURItoBlob(dataURI);
      return blob;
    },
    drawingCanvasToBlob() {
      const dataURI = this.canvasToDataUrl("mask");
      const blob = this.dataURItoBlob(dataURI);
      return blob;
    },
  };
})();

export default inpainter;
