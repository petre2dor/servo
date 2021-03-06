// To make sure that we take the snapshot at the right time, we do double
// requestAnimationFrame. In the second frame, we take a screenshot, that makes
// sure that we already have a full frame.
function importWorkletAndTerminateTestAfterAsyncPaint(worklet, code) {
    if (typeof worklet == "undefined") {
        takeScreenshot();
    } else {
        var blob = new Blob([code], {type: 'text/javascript'});
        worklet.addModule(URL.createObjectURL(blob)).then(function() {
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    takeScreenshot();
                });
            });
        });
    }
}

