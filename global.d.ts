// This file will add both p5 instanced and global intellisence.
// It makes sure that all the global p5 functions are available to typescript

import module = require('p5');
import * as p5Global from 'p5/global';

export = module;
export as namespace p5;
declare global {
  interface Window {
    p5: typeof module;
  }

  function loadSound(
    path: string | string[] | p5.File,
    successCallback?: () => void,
    errorCallback?: (err: unknown) => void,
    loadingCallback?: (percectangeLoaded: number) => void
  ): p5.SoundFile;
}
