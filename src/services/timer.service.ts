export const Timer = {
  start(duration: number, onTick: (count: number) => void): Promise<void> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        duration--;

        if (duration === 0) {
          clearInterval(interval);
          resolve();
        }

        onTick(duration);
      }, 1000);
    });
  },
};
