export class Beep {
  public highFrequency: number;
  public lowFrequency: number;
  private audioContext: AudioContext;
  private duration: number;
  private volume: number;
  constructor(audioContext = new AudioContext()) {
    this.audioContext = audioContext;
    this.duration = 100;
    this.volume = 100;
    this.highFrequency =  1400;
    this.lowFrequency = 600;
  }
  public high() {
    this.beep(this.highFrequency);
  }

  public low() {
    this.beep(this.lowFrequency);
  }

  private beep(frequency: number): void {
    // Setup
    const oscilator: OscillatorNode = this.audioContext.createOscillator();
    const gain: GainNode = this.audioContext.createGain();
    oscilator.connect(gain);
    oscilator.frequency.value = frequency;
    oscilator.type = 'square';
    gain.connect(this.audioContext.destination);
    gain.gain.value = this.volume * 0.01;

    // Play
    oscilator.start(this.audioContext.currentTime);
    oscilator.stop(this.audioContext.currentTime + this.duration * 0.001);
  }
}
