import Konva from "konva";
declare const inpainter: {
    /**
     * 이미지 레이어에 하나 이상의 이미지가 올라가 있는 상태에만 작동하는 함수입니다.
     * 모든 이미지에는 transformer(resizing, rotating 기능) 기능이 포함되는데, 이미지가 아닌 다른 부분을 눌렀을 때 잠시 모든 Transformer를 detach 해주는 함수입니다.
     * Konva.Stage가 아닌 영역에서 onClick 이벤트를 걸어서 해당 메서드를 써주면 좀 더 자연스러운 UX를 만들 수 있습니다.
     *
     * @alpha
     * @param
     * @returns
     *
     * @example
     * ```typescript
    import inpainter from "fabric-image-maker";

    document.body.addEventListener("click", function (e: MouseEvent) {
      if (e.target !== null) {
        const target = e.target as HTMLElement;

        if (target.parentElement.parentElement !== document.getElementById("app")) {
          inpainter.detachAllTransformer();
        }
      }
    });
     * ```
     */
    detachAllTransformer(): void;
    /**
     * KonvaJS의 base가 되는 Stage(=Base Canvas)를 생성 및 리턴합니다. 관련 기능을 실행하기 위해 가장 먼저 실행해야 하는 함수입니다.
     * 해당 모듈에는 하나의 Ca
     * 개발자가 작업을 할 때에 이 Stage 리턴값을 가지고 해야할 작업은 특별히 없습니다(직접 접근하기 보다는 모듈에서 제공하는 함수를 쓸 것을 권장합니다).
     * 만약 null 이 나왔을 경우(모듈 자체에 에러가 있는 경우) 분기처리를 하여 에러 처리를 하기 위한 용도로 리턴값을 만들어놨습니다.
     *
     * @alpha
     * @param canvasInfo - 생성할 Stage(Canvas)와 관련된 정보를 넣어줍니다.
     * @returns 정상적으로 canvas가 생성됐다면 Konva.Stage 객체가 리턴되고, 아닌 경우 null이 리턴됩니다.
     *
     * @example
     * ```typescript
      import inpainter from "fabric-image-maker";

      const stage = inpainter.createBaseKonvaStage({
        id: "app",
        width: 900,
        height: 700,
        backgroundColor: "skyblue",
      });
     * ```
     */
    createBaseKonvaStage({ id, width, height, backgroundColor, }: {
        id: string;
        width: number;
        height: number;
        backgroundColor: string;
    }): import("konva/lib/Stage").Stage | null;
    /**
     * imgNode
     *
     * @alpha
     * @param imgNode - 파라미터로 넣어준 Konva.Image node를 제외한 모든 Image Node의 Transformer를 제거하고, 파라미터로 넣어준 노드에만 Transformer를 적용합니다(`addImageLayer`를 통해 Konva.Image node를 return 받을 수 있습니다).
     * @returns
     */
    detachTransformer(imgNode: Konva.Shape): void;
    /**
     * 이미지를 업로드할 때 사용하는 메서드 입니다. 이미지를 업로드하는 로직을 작성해놓은 다음에 src 정보를 string 형태로 파라미터로 넣어주면 해당 src의 이미지가 Konva.Stage에 그려집니다.
     *
     * @alpha
     * @param src - Konva.Stage에 그려줄 이미지 src 값을 넣어줍니다.
     * @returns 정상적으로 image layer가 생성됐다면 Konva.Image 객체가 리턴되고, 아닌 경우 null이 리턴됩니다.
     *
     * @example
     * ```typescript
    const imageInputElement = document.querySelector(
      "#imageInput"
    ) as HTMLInputElement;
    const uploadBtnElement = document.querySelector(
      "#uploadBtn"
    ) as uploadBtnElement;

    if (uploadBtnElement !== null && imageInputElement !== null) {
      uploadBtnElement.addEventListener("click", function () {
        if (imageInputElement.files !== null) {
          const file = imageInputElement.files[0];
          const reader = new FileReader();
          const img = new Image() as HTMLImageElement;

          reader.readAsDataURL(file);
          reader.onload = (e) => {
            if (img !== null && e?.target !== null) {
              inpainter.addImageLayer(e.target.result as string);
            }
          };
        }
      });
    }
     * ```
     */
    addImageLayer(src: string): null;
    /**
     * 현재 선택된 이미지 노드를 한 레벨 앞으로 이동시킵니다.
     *
     * @alpha
     * @param
     * @returns
     *
     * @example
     * ```typescript
    import inpainter from "fabric-image-maker";

    const bringForwardBtnElement = document.querySelector(
      "#bringForwardBtn"
    ) as HTMLButtonElement;

    bringForwardBtnElement.addEventListener("click", function () {
      inpainter.bringForward();
    });
     * ```
     */
    bringForward(): void;
    /**
     * 현재 선택된 이미지 노드를 맨 위로 이동시킵니다.
     *
     * @alpha
     * @param
     * @returns
     *
     * @example
     * ```typescript
    import inpainter from "fabric-image-maker";

    const bringToFrontBtnElement = document.querySelector(
      "#bringToFrontBtn"
    ) as HTMLButtonElement;

    bringToFrontBtnElement.addEventListener("click", function () {
      inpainter.bringToFront();
    });
     * ```
     */
    bringToFront(): void;
    /**
     * 현재 선택된 이미지 노드를 한 맨 뒤로 이동시킵니다.
     *
     * @alpha
     * @param
     * @returns
     *
     * @example
     * ```typescript
    import inpainter from "fabric-image-maker";

    const bringToBackBtnElement = document.querySelector(
      "#sendToBackBtn"
    ) as HTMLButtonElement;

    bringToBackBtnElement.addEventListener("click", function () {
      inpainter.bringBack();
    });
     * ```
     */
    bringBack(): void;
    /**
     * 현재 선택된 이미지 노드를 한 레벨 뒤로 이동시킵니다.
     *
     * @alpha
     * @param
     * @returns
     *
     * @example
     * ```typescript
    import inpainter from "fabric-image-maker";

    const sendBackwardBtnElement = document.querySelector(
      "#sendBackwardBtn"
    ) as HTMLButtonElement;

    sendBackwardBtnElement.addEventListener("click", function () {
      inpainter.bringToBackward();
    });
     * ```
     */
    bringToBackward(): void;
    /**
     * 현재 선택된 이미지 노드를 제거합니다.
     *
     * @alpha
     * @param
     * @returns
     *
     * @example
     * ```typescript
    import inpainter from "fabric-image-maker";

    const canvasBtn2Element = document.querySelector(
      "#canvasBtn2"
    ) as HTMLButtonElement;

    canvasBtn2Element.addEventListener("click", function () {
      inpainter.deleteImage();
    });
     * ```
     */
    deleteImage(): void;
    /**
     * 마스킹 모드가 켜져있는지 아닌지를 리턴해주는 함수입니다.
     *
     * @alpha
     * @param
     * @returns 현재 masking 모드가 on 상태인지 off 상태인지를 리턴합니다(true/false)
     *
     */
    isDrawingModeOn(): boolean;
    /**
     * masking canvas를 생성하는 함수입니다. 'createBaseKonvaStage' 메서드와 마찬가지로 사용하고자 했을 때, 초기에 생성을 해주고 시작해줘야 합니다.
     * 두번 실행할 시에는 기존의 Layer에 덮어씌워 집니다(= 2개 이상 생성이 불가능합니다).
     *
     * @alpha
     * @param canvasInfo - 초기 color 정보 및 strokeWidth 정보를 입력해줍니다.
     * @returns 정상적으로 생성 성공시 drawning Konva Layer가 리턴되고, 실패시 null 이 리턴됩니다.
     *
     * @example
     * ```typescript
    import inpainter from "fabric-image-maker";

    inpainter.createDrawingCanvas({ color: "#ffffff", strokeWidth: 60 });
     * ```
     */
    createDrawingCanvas({ color, strokeWidth, }: {
        color: string;
        strokeWidth: number;
    }): import("konva/lib/Layer").Layer | null;
    /**
     * 마스킹 모드를 on/off 해주는 함수 입니다.
     *
     * @alpha
     * @param
     * @returns 현재 masking 모드가 on 상태인지 off 상태인지를 리턴합니다(true/false)
     *
     * @example
     * ```typescript
    import inpainter from "fabric-image-maker";

    const maskingBtnElement = document.querySelector(
      "#maskingBtn"
    ) as HTMLButtonElement;

    maskingBtnElement.addEventListener("click", function () {
      const nowModeOn = inpainter.activateDrawingMode();
      if (nowModeOn) {
        maskingBtnElement.style.background = "green";
        maskingBtnElement.textContent = "masking mode status : on";
      } else {
        maskingBtnElement.style.background = "red";
        maskingBtnElement.textContent = "masking mode status : off";
      }
    });
     * ```
     */
    activateDrawingMode(): boolean;
    /**
     * masking mode 중에 brush 모드로 그릴지, eraser 모드로 지울지를 선택하는 함수입니다.
     * 파라미터에 'brush', 'eraser' 값을 넣어줌으로써 사용할 수 있습니다.
     *
     * @alpha
     * @param mode - brush 모드를 할지, eraser 모드를 할지 선택하여 입력(두 개의 모드만 지원하며 다른 파라미터를 넣으면 동작하지 않습니다).
     * @returns
     *
     * @example
     * ```typescript
    import inpainter from "fabric-image-maker";

    const select = document.querySelector("#selection");

    if (select !== null) {
      select.addEventListener("change", function (e) {
        const mode = (e.target as HTMLTextAreaElement).value;
        inpainter.setDrawingMode(mode);
      });
    }
     * ```
     */
    setDrawingMode(mode: string): void;
    /**
     * masking mode의 brush 크기인 stroke width를 조절하는 함수입니다.
     * 파라미터에 width값을(number type) 넣어줌으로써 사용할 수 있습니다.
     *
     * @alpha
     * @param width - stroke width를 넣어줍니다.
     * @returns
     *
     * @example
     * ```typescript
    import inpainter from "fabric-image-maker";

    const pixelInput = document.querySelector("#pixelInput") as HTMLInputElement;
    
    pixelInput.addEventListener("change", function () {
      inpainter.setStrokeWidth(parseInt(pixelInput.value));
    });
     * ```
     */
    setStrokeWidth(width: number): void;
    /**
     * masking mode의 brush color를 조절하는 함수입니다(지우개 컬러는 조절 불가).
     * 파라미터에 color(string type) 넣어줌으로써 사용할 수 있습니다.
     *
     * @alpha
     * @param color - color 값을 넣어줍니다.
     * @returns
     *
     * @example
     * ```typescript
    import inpainter from "fabric-image-maker";

    const colorSelect = document.querySelector("#colorSelection");

    if (colorSelect !== null) {
      colorSelect.addEventListener("change", function (e) {
        const color = (e.target as HTMLTextAreaElement).value;
        inpainter.setStrokeColor(color);
      });
    }
     * ```
     */
    setStrokeColor(color: string): void;
    /**
     * image layer or masking layer를 선택하여 파라미터에 입력해주면 이를 바탕으로 실제 Konva Layer를 url 형식의(string) 데이터로 리턴합니다.
     * 파라미터에 image or mask(string type) 타입을 정해서 넣어줌으로써 사용할 수 있습니다.
     *
     * @alpha
     * @param type - "image" or "mask" (다른 parameter는 동작하지 않고 ""를 리턴합니다.)
     * @returns 정상적으로 리턴되면 dataURL 값이 string으로 리턴되고, 실패시엔 "" 가 리턴됩니다.
     *
     * @example
     * ```typescript
    import inpainter from "fabric-image-maker";

    const mergeBtnElement = document.querySelector(
      "#mergeBtn"
    ) as HTMLButtonElement;

    mergeBtnElement.addEventListener("click", function () {
      const mergedImageElement = document.querySelector(
        "#merged_image"
      ) as HTMLImageElement;
      const url = inpainter.canvasToDataUrl("image");
      mergedImageElement.src = url;
      mergedImageElement.style.border = "1px solid black";
    });
     * ```
     */
    canvasToDataUrl(type: string): string;
    /**
     * image layer 를 blob 데이터 형태로 반환합니다.
     *
     * @alpha
     * @param
     * @returns 정상적으로 리턴되면 blob 데이터가 리턴되고, 실패시엔 null이 리턴됩니다.
     *
     * @example
     * ```typescript
    import inpainter from "fabric-image-maker";

    const getBlobBtnElement = document.querySelector(
      "#getBlobBtn"
    ) as HTMLButtonElement;

    getBlobBtnElement.addEventListener("click", function () {
      const response = inpainter.imageCanvasToBlob();
      console.log(response);
    });
     * ```
     */
    imageCanvasToBlob(): null | Blob;
    /**
     * masking layer 를 blob 데이터 형태로 반환합니다.
     *
     * @alpha
     * @param
     * @returns 정상적으로 리턴되면 blob 데이터가 리턴되고, 실패시엔 null이 리턴됩니다.
     *
     * @example
     * ```typescript
    import inpainter from "fabric-image-maker";

    const getMaskingBlobBtnElement = document.querySelector(
      "#getMaskingBlobBtn"
    ) as HTMLButtonElement;

    getMaskingBlobBtnElement.addEventListener("click", function () {
      const response = inpainter.drawingCanvasToBlob();
      console.log(response);
    });
     * ```
     */
    drawingCanvasToBlob(): null | Blob;
};
export default inpainter;
