export interface Settings {
  fullScreen: boolean;
  volume: number;
  language: string;
  isAudioEnabled: boolean;
}

export interface SettingsContextType extends Settings {
  setVolume: (v: number) => void;
  setLanguage: (lang: string) => void;
  setFullScreen: (v: boolean) => void;
  setIsAudioEnabled: (v: boolean) => void;
}

// export class Settings {

//     fullScreen: boolean;
//     volume: number;
//     language: string;
//     isAudioEnabled: boolean;

//     constructor() {
//         this.fullScreen = false;
//         this.volume = 0;
//         this.language = "en";
//         this.isAudioEnabled = false;
//     }
// }

// export const settings = new Settings();