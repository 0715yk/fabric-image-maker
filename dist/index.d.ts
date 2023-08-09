import "./style.css";
import { fabric } from "fabric";
declare const inpainter: {
    createBaseCanvas(id: string): fabric.Canvas | null;
    addImageLayer(src: string): void;
    bringForward(): void;
    bringToFront(): void;
    canvasToDataUrl(): string;
};
export default inpainter;
