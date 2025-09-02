#!/usr/bin/env python3
import sys
from rembg import remove
from typing import Tuple, Optional

def hex_to_rgba(hex_code: str) -> Tuple[int, int, int, int]:
  """Mengubah string kode hex (#RRGGBB) menjadi tuple RGBA (R, G, B, A)."""
  hex_code = hex_code.lstrip('#')
  if len(hex_code) != 6:
    raise ValueError("Kode hex harus memiliki 6 karakter (RRGGBB)")
  r = int(hex_code[0:2], 16)
  g = int(hex_code[2:4], 16)
  b = int(hex_code[4:6], 16)
  return (r, g, b, 255)

def hapus_background(
  input_image_path: str,
  output_png_path: str,
  bg_color: Optional[Tuple[int, int, int, int]] = None
):
  """Menghapus background gambar."""
  try:
    with open(input_image_path, "rb") as f:
      input_bytes = f.read()
    output_bytes = remove(input_bytes, bgcolor=bg_color)
    with open(output_png_path, "wb") as f:
      f.write(output_bytes)
    if bg_color:
      print(f"Sukses! Background diubah menjadi warna {bg_color} dan disimpan di {output_png_path}")
    else:
      print(f"Sukses! Background transparan disimpan di {output_png_path}")
  except Exception as e:
    print(f"Terjadi error: {e}")

if __name__ == '__main__':
  if len(sys.argv) < 3:
    print("\nCara Penggunaan:")
    print("  python3 rembege_final.py <input> <output> [warna]")
    print("\nContoh (Transparan):")
    print("  python3 rembege_final.py in.jpg out.png")
    print("\nContoh (Warna RGBA):")
    print("  python3 rembege_final.py in.jpg out.png \"255,0,0,255\"")
    print("\nContoh (Warna Hex):")
    print("  python3 rembege_final.py in.jpg out.png \"#FF0000\"\n")
    sys.exit(1)

  input_path = sys.argv[1]
  output_path = sys.argv[2]
  color_tuple = None

  if len(sys.argv) > 3:
    color_input = sys.argv[3]
    try:
      if color_input.startswith('#'):
        color_tuple = hex_to_rgba(color_input)
      elif ',' in color_input:
        color_tuple = tuple(map(int, color_input.split(',')))
        if len(color_tuple) not in [3, 4]:
          raise ValueError("Format RGBA harus R,G,B atau R,G,B,A")
      else:
        raise ValueError("Format warna tidak dikenali.")
    except ValueError as e:
      print(f"Error format warna tidak valid: {e}")
      sys.exit(1)

  hapus_background(input_path, output_path, color_tuple)