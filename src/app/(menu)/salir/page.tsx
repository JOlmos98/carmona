"use client";

import { useEffect } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";

export default function Salir() {
  useEffect(() => {
    getCurrentWindow().close(); // o .destroy() ??
  }, []);

  return null;
}
