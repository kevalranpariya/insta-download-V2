export const insta:object[] = [];

export const teleSendPostURL:any[] = [];

export const globalInterval: {
  intervalId: NodeJS.Timeout | null; // Will store the interval ID

  // Function to start the interval
  start: (callback: () => void, interval: number) => void;

  // Function to stop the interval
  stop: () => void;
} = {
  intervalId: null,

  // Function to start the interval
  start: function (callback, interval) {
    if (!this.intervalId) {
      this.intervalId = setInterval(callback, interval);
      console.log('Interval started');
    } else {
      console.log('Interval is already running');
    }
  },

  // Function to stop the interval
  stop: function () {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Interval stopped');
    } else {
      console.log('No interval is running');
    }
  },
};