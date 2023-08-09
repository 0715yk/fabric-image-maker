import { fabric } from "fabric";

// "test": "echo \"Error: no test specified\" && exit 1",
// "dev": "vite",

const inpainter = (function () {
  let canvas = null as null | fabric.Canvas;
  let selectedObject = null as null | fabric.Image;

  return {
    createBaseCanvas(id: string) {
      try {
        canvas = new fabric.Canvas(id, {
          backgroundColor: "green",
          preserveObjectStacking: true,
        });

        return canvas;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    addImageLayer(src: string) {
      (function () {
        fabric.Image.fromURL(src, function (oImg: fabric.Image) {
          if (canvas !== null) {
            oImg.set("left", 0).set("top", 0);
            oImg.on("selected", function () {
              selectedObject = oImg;
            });
            canvas.add(oImg);
          }
        });
      })();
    },
    bringForward() {
      if (selectedObject !== null && canvas !== null) {
        canvas.bringForward(selectedObject);
      }
    },
    bringToFront() {
      if (selectedObject !== null && canvas !== null) {
        canvas.bringToFront(selectedObject);
      }
    },
    canvasToDataUrl() {
      if (canvas !== null) {
        const pngURL = canvas.toDataURL();
        return pngURL;
      } else {
        return "";
      }
    },
  };
})();

export default inpainter;

// 1) stage를 만든다.
// 2) 이미지를 업로드하면 새로운 레이어를 만든다.
// 3) 이미지를 업로드하면 새로운 레이어를 만든다,,, X N번
// 4) 최상단에는 마스킹 용 레이어가 있다(default)
// 5) 이 뒤에 canvas 크기는 고정인지 아니면 상대적으로 더큰 이미지가 기준이 되는지?

// 추가할 기능
// - 마스킹 부분 적용 및 따로 추출할 수 있도록 만들기
// - 모든 메서드에는 return 값이 임의로라도 있어야한다(비동기 처리인 것 같아서 여기에 대한 고려도 필요).

// 궁금한 점
// - 이 뒤에 canvas 크기는 고정인지 아니면 상대적으로 더큰 이미지가 기준이 되는지?
// - 마스킹은 그림 그리는 정도로 처리하면 되는지?(brush 크기 조절 기능?)
// - 최종적으로 canvas의 이미지를 추출하고, masking layer도 이미지로 추출하면 되는지? 데이터 타입은 뭐로 주면 되는지?
