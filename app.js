// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var  amountOfCameras = 0;
var currentFacingMode = 'environment';

document.addEventListener('DOMContentLoaded', function(event) {
  // do some WebRTC checks before creating the interface
  DetectRTC.load(function() {
    // do some checks
    if (DetectRTC.isWebRTCSupported == false) {
      alert(
        'Please use Chrome, Firefox, iOS 11, Android 5 or higher, Safari 11 or higher',
      );
    } else {
      if (DetectRTC.hasWebcam == false) {
        alert('Please install an external webcam device.');
      } else {
        amountOfCameras = DetectRTC.videoInputDevices.length;

        function cameraStart();
      }
    }

    console.log(
      'RTC Debug info: ' +
        '\n OS:                   ' +
        DetectRTC.osName +
        ' ' +
        DetectRTC.osVersion +
        '\n browser:              ' +
        DetectRTC.browser.fullVersion +
        ' ' +
        DetectRTC.browser.name +
        '\n is Mobile Device:     ' +
        DetectRTC.isMobileDevice +
        '\n has webcam:           ' +
        DetectRTC.hasWebcam +
        '\n has permission:       ' +
        DetectRTC.isWebsiteHasWebcamPermission +
        '\n getUserMedia Support: ' +
        DetectRTC.isGetUserMediaSupported +
        '\n isWebRTC Supported:   ' +
        DetectRTC.isWebRTCSupported +
        '\n WebAudio Supported:   ' +
        DetectRTC.isAudioContextSupported +
        '\n is Mobile Device:     ' +
        DetectRTC.isMobileDevice,
    );
  });
});
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    cameraSwitch = document.querySelector("#switchCameraButton")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

cameraSwitch.onClick = function(){

if (amountOfCameras > 1) {
    switchCameraButton.style.display = 'block';

    switchCameraButton.addEventListener('click', function() {
      if (currentFacingMode === 'environment') currentFacingMode = 'user';
      else currentFacingMode = 'environment';

      cameraTrigger();
    });
  }
}


// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
