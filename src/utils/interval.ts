export default function interval(callback: () => void, delay: number) {
  let start = new Date().getTime();
  let requestId: number | undefined;

  function loop() {
    const current = new Date().getTime();
    const delta = current - start;
    if (delta >= delay) {
      callback();
      start = current;
    }
    // window.cancelAnimationFrame(requestId!);
    requestId = window.requestAnimationFrame(loop);
  }

  requestId = window.requestAnimationFrame(loop);

  return () => {
    if (!requestId) {
      return;
    }
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
  };
}
