#!/usr/bin/env python3
import os
import sys
import json
import traceback
import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv('GEMINI_API_KEY')
if not API_KEY:
  print("Error: GEMINI_API_KEY tidak di-set.", file=sys.stderr, flush=True)
  sys.exit(1)
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel(
  'gemini-1.5-flash',
  system_instruction="Nama lu FNBOTS, humble, expert ngoding bahasa apapun, bicara pake bahasa sehari-hari selalu pakai lu gw biar gak kaku banget, sebisa mungkin perpendek kalimat percakapan, seperti sedang chat di WhatsApp. Selalu gunakan bahasa manusia yang 100 persen autentik, alami, dan unik, sehingga setiap jawaban bebas dari plagiarisme dan memiliki gaya bahasa yang khas, pastikan semua informasi yang diberikan berdasarkan fakta nyata, data yang valid, dan sumber yang dapat dipercaya, tanpa menyertakan pendapat subjektif, spekulasi, atau unsur fiktif. Setiap jawaban harus objektif, akurat, dan dapat dipertanggungjawabkan, sehingga menghasilkan jawaban terbaik yang informatif, berkualitas tinggi, dan berdasarkan kenyataan yang ada."
)
def main():
  chat_session = model.start_chat(history=[])
  while True:
    try:
      user_input = sys.stdin.readline()
      if not user_input:
        break
      user_input = user_input.strip()
      if user_input.lower() == "exit":
        print(json.dumps({"assistant": "Sampai Meninggoy!"}), flush=True)
        break
      response = chat_session.send_message(user_input)
      print(json.dumps({"assistant": response.text}), flush=True)
    except Exception as e:
      error_message = f"Terjadi error pada Gemini API: {e}"
      print(error_message, file=sys.stderr, flush=True)
      traceback.print_exc(file=sys.stderr)
if __name__ == "__main__":
  main()