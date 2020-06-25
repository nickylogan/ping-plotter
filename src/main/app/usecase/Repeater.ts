export type RepeatTerminator = () => void;

export type RepeatCallback = (stop: RepeatTerminator) => void;

type Repeat = {
  callback: RepeatCallback
  interval: number
  intervalObj?: NodeJS.Timeout
};

class Repeater {
  private readonly repeats: { [id: string]: Repeat };

  constructor() {
    this.repeats = {};
  }

  repeat(id: string, callback: RepeatCallback, interval: number) {
    this.repeats[id] = {
      callback: callback,
      interval: interval,
      intervalObj: setInterval(() => {
        callback(() => clearInterval(this.repeats[id].intervalObj));
      }, interval),
    };
  }

  updateCallback(id: string, callback: RepeatCallback) {
    const r = this.repeats[id];
    clearInterval(r.intervalObj);

    r.callback = callback;
    r.intervalObj = setInterval(() => {
      callback(() => clearInterval(r.intervalObj));
    }, r.interval);
  }

  updateInterval(id: string, interval: number) {
    const r = this.repeats[id];
    clearInterval(r.intervalObj);

    r.interval = interval;
    r.intervalObj = setInterval(() => {
      r.callback(() => clearInterval(r.intervalObj));
    }, interval);
  }

  stop(id: string) {
    const r = this.repeats[id];
    if (!r) return;

    clearInterval(r.intervalObj);
    delete this.repeats[id];
  }
}

export default Repeater;
