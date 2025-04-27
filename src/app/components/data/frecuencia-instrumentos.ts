export interface StringTuning {
    note: string;
    frequency: number;
  }
  
  export const instrumentTunings: { [instrumentName: string]: StringTuning[] } = {
    guitarra: [
      { note: 'E2', frequency: 82.41 },
      { note: 'A2', frequency: 110.00 },
      { note: 'D3', frequency: 146.83 },
      { note: 'G3', frequency: 196.00 },
      { note: 'B3', frequency: 246.94 },
      { note: 'E4', frequency: 329.63 },
    ],
    bajo: [
      { note: 'E1', frequency: 41.20 },
      { note: 'A1', frequency: 55.00 },
      { note: 'D2', frequency: 73.42 },
      { note: 'G2', frequency: 98.00 },
    ],
    ukelele: [
      { note: 'G4', frequency: 392.00 },
      { note: 'C4', frequency: 261.63 },
      { note: 'E4', frequency: 329.63 },
      { note: 'A4', frequency: 440.00 },
    ],
    violin: [
      { note: 'G3', frequency: 196.00 },
      { note: 'D4', frequency: 293.66 },
      { note: 'A4', frequency: 440.00 },
      { note: 'E5', frequency: 659.26 },
    ],
    chelo: [
      { note: 'C2', frequency: 65.41 },
      { note: 'G2', frequency: 98.00 },
      { note: 'D3', frequency: 146.83 },
      { note: 'A3', frequency: 220.00 },
    ],
  };