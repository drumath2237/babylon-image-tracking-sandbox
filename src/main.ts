import "./style.scss";

import {
  Engine,
  IWebXRImageTrackingOptions,
  MeshBuilder,
  Quaternion,
  Scene,
  TransformNode,
  WebXRFeatureName,
  WebXRImageTracking,
} from "@babylonjs/core";

type TrackableObjectDictionary = {
  [id: number]: TransformNode;
};

const main = async () => {
  const renderCanvas = document.getElementById(
    "renderCanvas"
  ) as HTMLCanvasElement;
  if (!renderCanvas) {
    return;
  }

  renderCanvas.width = document.firstElementChild?.clientWidth ?? 0;
  renderCanvas.height = document.firstElementChild?.clientHeight ?? 0;

  const engine = new Engine(renderCanvas, true);
  const scene = new Scene(engine);

  scene.createDefaultCameraOrLight(true, true, true);

  const trackingCubeList: TrackableObjectDictionary = [];

  const xr = await scene.createDefaultXRExperienceAsync({
    uiOptions: {
      sessionMode: "immersive-ar",
      referenceSpaceType: "unbounded",
    },
  });
  const featureManager = xr.baseExperience.featuresManager;

  const imageTracking = featureManager.enableFeature(
    WebXRFeatureName.IMAGE_TRACKING,
    "latest",
    {
      images: [
        {
          src: "https://www.oreilly.co.jp/books/images/picture_large978-4-87311-565-8.jpeg",
          estimatedRealWorldWidth: 0.05,
        },
        {
          src: "https://www.oreilly.co.jp/books/images/picture_large978-4-8144-0001-0.jpeg",
          estimatedRealWorldWidth: 0.05,
        },
        {
          src: "https://www.oreilly.co.jp/books/images/picture_large978-4-8144-0002-7.jpeg",
          estimatedRealWorldWidth: 0.05,
        },
        {
          src: "https://www.oreilly.co.jp/books/images/picture_large978-4-8144-0008-9.jpeg",
          estimatedRealWorldWidth: 0.05,
        },
        {
          src: "https://www.oreilly.co.jp/books/images/picture_large978-4-8144-0018-8.jpeg",
          estimatedRealWorldWidth: 0.05,
        },
        {
          src: "https://www.oreilly.co.jp/books/images/picture_large4-87311-307-5.jpeg",
          estimatedRealWorldWidth: 0.05,
        },
      ],
    } as IWebXRImageTrackingOptions
  ) as WebXRImageTracking;

  imageTracking.onTrackableImageFoundObservable.add((event) => {
    trackingCubeList[event.id] = MeshBuilder.CreateBox(
      "trackable cube",
      { size: 0.02 },
      scene
    );
  });

  imageTracking.onTrackedImageUpdatedObservable.add((event) => {
    const trackingCube = trackingCubeList[event.id];
    if (!trackingCube) {
      return;
    }

    event.transformationMatrix.decompose(
      trackingCube.scaling,
      trackingCube.rotationQuaternion as Quaternion | undefined,
      trackingCube.position
    );
  });

  engine.runRenderLoop(() => {
    scene.render();
  });
};

main();

