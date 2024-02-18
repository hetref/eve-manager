"use client";
import { useState } from "react";
import QRCode from "qrcode.react";

function MyComponent() {
  const [uniqueId, setUniqueId] = useState("");
  const [qrGenerated, setQRGenerated] = useState(false);
  const [qrId, setQrId] = useState("");

  function handleCreateButtonClick() {
    const id = qrId;
    setUniqueId(id);
    setQRGenerated(true);
  }

  return (
    <div className="container mx-auto my-8 p-8 bg-gray-100 rounded-lg">
      {!qrGenerated && (
        <div className="text-center">
          <input
            type="text"
            value={qrId}
            onChange={(e) => setQrId(e.target.value)}
            className="border p-2 rounded-md"
          />
          <button
            className="bg-black text-white rounded-md px-4 py-2 mt-2"
            onClick={handleCreateButtonClick}
          >
            Create
          </button>
        </div>
      )}
      {uniqueId && qrGenerated && (
        <div className="flex justify-center items-center flex-col gap-6 mt-4">
          <p className="font-bold">Generated Unique ID: {uniqueId}</p>
          <QRCode value={uniqueId} />
        </div>
      )}
    </div>
  );
}

export default MyComponent;
