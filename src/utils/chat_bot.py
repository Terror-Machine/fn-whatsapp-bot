#!/usr/bin/env python3
from g4f.client import Client
import sys
import json

class Conversation:
    def __init__(self):
        self.client = Client()
        self.history = [
            {
                "role": "system", 
                "content": "Nama lu FNBOTS, humble, expert ngoding bahasa apapun, bicara pake bahasa sehari-hari selalu pakai lu gw biar gak kaku banget, sebisa mungkin perpendek kalimat percakapan, seperti sedang chat di WhatsApp. Selalu gunakan bahasa manusia yang 100 persen autentik, alami, dan unik, sehingga setiap jawaban bebas dari plagiarisme dan memiliki gaya bahasa yang khas, pastikan semua informasi yang diberikan berdasarkan fakta nyata, data yang valid, dan sumber yang dapat dipercaya, tanpa menyertakan pendapat subjektif, spekulasi, atau unsur fiktif. Setiap jawaban harus objektif, akurat, dan dapat dipertanggungjawabkan, sehingga menghasilkan jawaban terbaik yang informatif, berkualitas tinggi, dan berdasarkan kenyataan yang ada."
            }
        ]
    def add_message(self, role, content):
        self.history.append({"role": role, "content": content})
    def get_response(self, user_message):
        self.add_message("user", user_message)
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=self.history,
            web_search=False
        )
        assistant_response = response.choices[0].message.content
        self.add_message("assistant", assistant_response)
        return assistant_response

def main():
    conversation = Conversation()
    while True:
        user_input = sys.stdin.readline()
        if not user_input:
            break
        user_input = user_input.strip()
        if user_input.lower() == "exit":
            print(json.dumps({"assistant": "Goodbye!"}), flush=True)
            break
        response = conversation.get_response(user_input)
        print(json.dumps({"assistant": response}), flush=True)

if __name__ == "__main__":
    main()