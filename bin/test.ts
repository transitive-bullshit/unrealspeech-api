import 'dotenv/config'

import { UnrealSpeechClient } from '../src'

async function main() {
  const unrealSpeech = new UnrealSpeechClient()

  const res = await unrealSpeech.speech({
    text: 'Hello, World!',
    voiceId: 'Scarlett'
  })
  console.log(res)
}

await main()
