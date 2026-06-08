import React from 'react';

const WebCompiler = () => {
  return (
    <div className="h-[calc(100vh-64px)] w-full overflow-hidden">
      <iframe
        src="https://webcompiler-yecv.onrender.com/"
        title="Web Compiler"
        className="w-full h-full border-none"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
  );
};

export default WebCompiler;
