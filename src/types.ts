export type TimestampType = 'word' | 'sentence'

export interface SynthesisTask {
  CreationTime: string
  OutputUri: string
  RequestCharacters: string
  TaskId: string
  TaskStatus: string
  VoiceId: string
}

export interface SynthesisTaskResponse {
  SynthesisTask: SynthesisTask
}

export interface UnrealSpeechOptions {
  text: string
  voiceId?: string
  bitrate?: string
  speed?: number
  pitch?: number
  codec?: string
  temperature?: number
  timestampType?: TimestampType
}

export interface StreamPayload {
  Text: string
  VoiceId: string
  Bitrate: string
  Speed: number
  Pitch: number
  Codec: string
  Temperature: number
}

export interface SynthesisTaskPayload {
  Text: string[]
  VoiceId: string
  Bitrate: string
  TimestampType: string
  Speed: number
  Pitch: number
}

export interface SpeechPayload {
  Text: string
  VoiceId: string
  Bitrate: string
  OutputFormat: string
  TimestampType: string
  Speed: number
  Pitch: number
}

export interface SpeechResponse {
  CreationTime: string
  OutputUri: string
  RequestCharacters: number
  TaskId: string
  TaskStatus: string
  TimestampsUri: string
  VoiceId: string
}
