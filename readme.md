# unrealspeech-api <!-- omit from toc -->

> TypeScript client for the [Unreal Speech](https://unrealspeech.com/) [TTS API](https://docs.unrealspeech.com/reference/getting-started-with-our-api).

<p>
  <a href="https://github.com/transitive-bullshit/unrealspeech-api/actions/workflows/main.yml"><img alt="Build Status" src="https://github.com/transitive-bullshit/unrealspeech-api/actions/workflows/main.yml/badge.svg" /></a>
  <a href="https://www.npmjs.com/package/unrealspeech-api"><img alt="NPM" src="https://img.shields.io/npm/v/unrealspeech-api.svg" /></a>
  <a href="https://github.com/transitive-bullshit/unrealspeech-api/blob/main/license"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue" /></a>
  <a href="https://prettier.io"><img alt="Prettier Code Formatting" src="https://img.shields.io/badge/code_style-prettier-brightgreen.svg" /></a>
</p>

- [Intro](#intro)
- [Why?](#why)
- [Install](#install)
- [Usage](#usage)
- [License](#license)

## Intro

This package is a rewrite of https://github.com/unrealspeech/unrealspeech-js to expose a more standards-based TS package for the [Unreal Speech](https://unrealspeech.com/) [TTS API](https://docs.unrealspeech.com/reference/getting-started-with-our-api).

## Why?

Their first-party JS package has several issues:

- it has a bogus dependency `fs`
- it uses `node-fetch` instead of universal `fetch`
- it includes additional Node.js-specific functionality related to playing media via ffmpeg, which doesn't belong in this type of NPM package
- some of the types are also incorrect
- [ky](https://github.com/sindresorhus/ky) handles automatic retries, is very customizable, and is built on top of `fetch`

## Install

```sh
npm install unrealspeech-api
```

This package is [ESM-only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c). If your project uses CommonJS, consider switching to ESM or use [dynamic `import()`](https://v8.dev/features/dynamic-import).

## Usage

```ts
import { UnrealSpeechClient } from 'unrealspeech-api'

const unrealSpeech = new UnrealSpeechClient({
  apiKey: process.env.UNREAL_SPEECH_API_KEY
})

const shortResult = await unrealSpeech.stream({
  text: 'Hello, World!',
  voiceId: 'Scarlett'
})
console.log(shortResult)

const mediumResult = await unrealSpeech.speech({
  text: 'Hello, World! ...',
  voiceId: 'Scarlett'
})
console.log(mediumResult)

const synthesisTask = await unrealSpeech.createSynthesisTask({
  text: 'Hello, World! ...',
  voiceId: 'Scarlett'
})
console.log(synthesisTask)

const updatedSynthesisTask = await unrealSpeech.getSynthesisTask(
  synthesisTask.TaskId
)
consolelog(updatedSynthesisTask)
```

## License

MIT © [Travis Fischer](https://x.com/transitive_bs)

If you found this project interesting, [consider following me on Twitter](https://x.com/transitive_bs).
