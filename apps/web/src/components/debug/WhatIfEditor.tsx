"use client";

import { useRef, useState } from "react";
import { useFocusRestore } from "@/hooks/useFocusRestore";

export default function WhatIfEditor() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Record the trigger that opened this modal and restore focus to it on close
  // (including when the user dismisses with Esc).
  useFocusRestore(open, panelRef);

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Open What-If Editor
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={handleClose}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="What-If Editor"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Escape") handleClose();
            }}
            className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 outline-none"
          >
            <h3 className="text-lg font-semibold mb-3">What-If Editor</h3>
            <p className="text-sm text-gray-600 mb-4">
              Simulate a hypothetical call and preview the resulting contract
              state.
            </p>
            <textarea
              className="w-full h-32 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter the hypothetical invocation (e.g. transfer(from, to, amount))"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Run
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
