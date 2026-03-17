import { useState } from "react";

export default function ButtonAddNewVet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-green-600 text-white rounded-md"
      >
        Add Vet
      </button>

      {open && (
        <div className="fixed inset-0 grid place-items-center bg-black/30">
          {/**This modal will scan for id's and get the details of the name */}
        </div>
      )}
    </>
  );
}