import { fabric } from "fabric";
declare const inpainter: {
    createDrawingCanvas(id: string): {
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
    } | {
        canvas: null;
        context: null;
    };
    setDrawingMode(mode: string): void;
    setStrokeWidth(width: number): void;
    setBrushColor(color: string): void;
    createImageCanvas({ id, width, height, backgroundColor, }: {
        id: string;
        width: number;
        height: number;
        backgroundColor: string;
    }): fabric.Canvas | null;
    addImageLayer(src: string): void;
    bringForward(): void;
    bringToFront(): void;
    bringBack(): void;
    bringToBackward(): void;
    deleteImage(): void;
    cloneCanvas(oldCanvas: HTMLCanvasElement): {
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D | null;
    };
    canvasToDataUrl(type: string): string;
    dataURItoBlob(dataURI: string): Blob;
    imageCanvasToBlob(): Blob;
    drawingCanvasToBlob(): Blob;
};
export default inpainter;
