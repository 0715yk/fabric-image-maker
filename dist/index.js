"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fabric_1 = require("fabric");
var inpainter = (function () {
  var canvas = null;
  var selectedObject = null;
  return {
    createBaseCanvas: function (id) {
      try {
        canvas = new fabric_1.fabric.Canvas(id, {
          backgroundColor: "green",
          preserveObjectStacking: true,
        });
        return canvas;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    addImageLayer: function (src) {
      (function () {
        fabric_1.fabric.Image.fromURL(src, function (oImg) {
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
    bringForward: function () {
      if (selectedObject !== null && canvas !== null) {
        canvas.bringForward(selectedObject);
      }
    },
    bringToFront: function () {
      if (selectedObject !== null && canvas !== null) {
        canvas.bringToFront(selectedObject);
      }
    },
    canvasToDataUrl: function () {
      if (canvas !== null) {
        var pngURL = canvas.toDataURL();
        return pngURL;
      } else {
        return "";
      }
    },
  };
})();
exports.default = inpainter;
// 1) stage를 만든다.
// 2) 이미지를 업로드하면 새로운 레이어를 만든다.
// 3) 이미지를 업로드하면 새로운 레이어를 만든다,,, X N번
// 4) 최상단에는 마스킹 용 레이어가 있다(default)
// 5) 이 뒤에 canvas 크기는 고정인지 아니면 상대적으로 더큰 이미지가 기준이 되는지?

// 추가할 기능
// - 마스킹 부분 적용 및 따로 추출할 수 있도록 만들기
// - 모든 메서드에는 return 값이 임의로라도 있어야한다(비동기 처리인 것 같아서 여기에 대한 고려도 필요).
// - testing code 작성

// 궁금한 점
// - 이 뒤에 canvas 크기는 고정인지 아니면 상대적으로 더큰 이미지가 기준이 되는지?
// - 마스킹은 그림 그리는 정도로 처리하면 되는지?(brush 크기 조절 기능?)
// - 최종적으로 canvas의 이미지를 추출하고, masking layer도 이미지로 추출하면 되는지? 데이터 타입은 뭐로 주면 되는지?
