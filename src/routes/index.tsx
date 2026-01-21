import { onMount } from "solid-js";
import videojs from "video.js";
import "video.js/dist/video-js.min.css";

export default function Index() {
  onMount(() => {
    videojs("video");
  });
  return (
    <>
      <video
        controls
        style={{ "max-width": "400px", "max-height": "400px" }}
        class="video-js"
        src="https://download.samplelib.com/mp4/sample-5s.mp4"
        id="video"
      />
    </>
  );
}
