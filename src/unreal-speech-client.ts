import defaultKy, { type KyInstance } from 'ky'

import type {
  SpeechPayload,
  SpeechResponse,
  StreamPayload,
  SynthesisTask,
  SynthesisTaskPayload,
  SynthesisTaskResponse,
  TimestampType
} from './types'
import { assert, getEnv } from './utils'

export class UnrealSpeechClient {
  protected readonly ky: KyInstance

  constructor({
    apiKey = getEnv('UNREAL_SPEECH_API_KEY'),
    baseUrl = 'https://api.v6.unrealspeech.com',
    ky = defaultKy
  }: {
    apiKey?: string
    baseUrl?: string
    ky?: KyInstance
  } = {}) {
    assert(
      apiKey,
      'UnrealSpeechClient missing required "apiKey" (defaults to UNREAL_SPEECH_API_KEY)'
    )

    this.ky = ky.extend({
      prefixUrl: baseUrl,
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
  }

  async stream({
    text,
    voiceId = 'Scarlett',
    bitrate = '192k',
    speed = 0,
    pitch = 1.0,
    codec = 'libmp3lame',
    temperature = 0.25
  }: {
    text: string
    voiceId?: string
    bitrate?: string
    timestampType?: TimestampType
    speed?: number
    pitch?: number
    codec?: string
    temperature?: number
  }): Promise<ArrayBuffer> {
    const json: StreamPayload = {
      Text: text,
      VoiceId: voiceId,
      Bitrate: bitrate,
      Speed: speed,
      Pitch: pitch,
      Codec: codec,
      Temperature: temperature
    }

    return this.ky.post('stream', { json }).arrayBuffer()
  }

  async createSynthesisTask({
    text,
    voiceId = 'Scarlett',
    bitrate = '192k',
    timestampType = 'word',
    speed = 0,
    pitch = 1.0
  }: {
    text: string
    voiceId?: string
    bitrate?: string
    timestampType?: TimestampType
    speed?: number
    pitch?: number
  }): Promise<SynthesisTask> {
    const json: SynthesisTaskPayload = {
      Text: [text],
      VoiceId: voiceId,
      Bitrate: bitrate,
      TimestampType: timestampType,
      Speed: speed,
      Pitch: pitch
    }

    const data = await this.ky
      .post('synthesisTasks', { json })
      .json<SynthesisTaskResponse>()

    return data.SynthesisTask
  }

  async getSynthesisTask(taskId: string): Promise<SynthesisTask> {
    const data = await this.ky
      .get(`synthesisTasks/${taskId}`)
      .json<SynthesisTaskResponse>()

    return data.SynthesisTask
  }

  async speech({
    text,
    voiceId = 'Scarlett',
    bitrate = '192k',
    timestampType = 'sentence',
    speed = 0,
    pitch = 1.0,
    timeoutMs = 180_000
  }: {
    text: string
    voiceId?: string
    bitrate?: string
    timestampType?: TimestampType
    speed?: number
    pitch?: number
    timeoutMs?: number
  }): Promise<SpeechResponse> {
    const json: SpeechPayload = {
      Text: text,
      VoiceId: voiceId,
      Bitrate: bitrate,
      OutputFormat: 'uri',
      TimestampType: timestampType,
      Speed: speed,
      Pitch: pitch
    }

    return this.ky
      .post('speech', { json, timeout: timeoutMs })
      .json<SpeechResponse>()
  }
}
