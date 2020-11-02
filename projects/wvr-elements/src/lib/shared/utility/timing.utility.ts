const wvrTimeout = (cb: Function, delay = 1): Function => {
  let elapsedTime = 0;
  const raf = requestAnimationFrame(deltaTime => {
    elapsedTime += deltaTime;
    if (elapsedTime > delay) {
      cancelAnimationFrame(raf);
      cb();
    }
  });

  return () => {
    cancelAnimationFrame(raf);
  };

};

export {
  wvrTimeout
};
