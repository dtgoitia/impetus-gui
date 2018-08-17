export interface IKeyPressEvent {
  keyCode: number;
  altKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
}

interface IKeyCodeMap {
  [x: number]: string;
}

const keyCodeMap: IKeyCodeMap = {
  9: 'tab',
  13: 'enter',
  27: 'escape',
  32: 'space',

  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',

  45: 'Insert',
  46: 'Delete',

  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',

  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',

  97: 'Numpad1',
  98: 'Numpad2',
  99: 'Numpad3',
  100: 'Numpad4',
  101: 'Numpad5',
  102: 'Numpad6',
  103: 'Numpad7',
  104: 'Numpad8',
  105: 'Numpad9',

  107: 'NumpadAdd',
  109: 'NumpadSubstract',

  112: 'F1',
  113: 'F2',
  114: 'F3',
  115: 'F4',
  116: 'F5',
  117: 'F6',
  118: 'F7',
  119: 'F8',
  120: 'F9',
  121: 'F10',
  122: 'F11',
  123: 'F12',

  186: ';',
  188: ',',
  190: '.',
};

// tslint:disable
console.log(keyCodeMap);

export const getPressedKeys = (event: IKeyPressEvent): string => {
  const result: string[] = [];
  if (event.ctrlKey) { result.push('ctrl') };
  if (event.altKey) { result.push('alt') };
  if (event.shiftKey) { result.push('shift') };
  if (event.keyCode) { result.push(keyCodeMap[event.keyCode]); };
  return result.join('+');
};
