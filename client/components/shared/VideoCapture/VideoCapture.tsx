import React, { useEffect, useRef, useState } from "react";
import "@/dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
import { CameraEnhancer, CameraView } from "dynamsoft-camera-enhancer";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "dynamsoft-utility";
import { useRouter } from "next/navigation";
import { Camera, AlertCircle } from "lucide-react";

const componentDestroyedErrorMsg = "VideoCapture Component Destroyed";

function VideoCapture() {
  const router = useRouter();
  const cameraViewContainer = useRef<HTMLDivElement>(null);
  const resultsContainer = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect((): any => {
    let resolveInit: () => void;
    const pInit: Promise<void> = new Promise((r) => {
      resolveInit = r;
    });
    let isDestroyed = false;

    let cvRouter: CaptureVisionRouter;
    let cameraEnhancer: CameraEnhancer;

    (async () => {
      try {
        setIsScanning(true);
        // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
        const cameraView = await CameraView.createInstance();
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        } // Check if component is destroyed after every async
        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }

        // Get default UI and append it to DOM.
        cameraViewContainer.current!.append(cameraView.getUIElement());

        // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
        cvRouter = await CaptureVisionRouter.createInstance();
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }
        cvRouter.setInput(cameraEnhancer);

        // Define a callback for results.
        cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            if (!result.barcodeResultItems.length) return;

            resultsContainer.current!.textContent = "";
            console.log(result);
            for (let item of result.barcodeResultItems) {
              resultsContainer.current!.textContent += `${item.formatString}: ${item.text}\n\n`;
              router.push(`/results?barcode=${item.text}`);
            }
          },
        });

        // Filter out unchecked and duplicate results.
        const filter = new MultiFrameResultCrossFilter();
        // Filter out unchecked barcodes.
        filter.enableResultCrossVerification("barcode", true);
        // Filter out duplicate barcodes within 3 seconds.
        filter.enableResultDeduplication("barcode", true);
        await cvRouter.addResultFilter(filter);
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }

        // Open camera and start scanning single barcode.
        await cameraEnhancer.open();
        cameraView.setScanLaserVisible(true);
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }
        await cvRouter.startCapturing("ReadSingleBarcode");
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }
      } catch (ex: any) {
        if ((ex as Error)?.message === componentDestroyedErrorMsg) {
          console.log(componentDestroyedErrorMsg);
        } else {
          let errMsg = ex.message || ex;
          console.error(errMsg);
          setError(errMsg);
        }
      } finally {
        setIsScanning(false);
      }
    })();

    // Resolve pInit promise once initialization is complete.
    resolveInit!();

    // componentWillUnmount. dispose cvRouter when it's no longer needed
    return async () => {
      isDestroyed = true;
      try {
        // Wait for the pInit to complete before disposing resources.
        await pInit;
        cvRouter?.dispose();
        cameraEnhancer?.dispose();
      } catch (_) {}
    };
  }, [router]);

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="relative">
        <div
          ref={cameraViewContainer}
          className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg"
        ></div>
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <div className="text-white text-center">
              <Camera className="animate-pulse w-12 h-12 mx-auto mb-2" />
              <p>Initializing camera...</p>
            </div>
          </div>
        )}
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
      {/* <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Results:</h2>
        <div
          ref={resultsContainer}
          className="p-4 bg-gray-100 rounded-lg min-h-[100px] whitespace-pre-wrap"
        ></div>
      </div> */}
    </div>
  );
}

export default VideoCapture;
