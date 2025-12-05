import { HexColorPicker } from "react-colorful";
import { useState } from "react";

export function ColorPicker() {
  const [color, setColor] = useState("#aabbcc");

  return <HexColorPicker color={color} onChange={setColor} />;
}