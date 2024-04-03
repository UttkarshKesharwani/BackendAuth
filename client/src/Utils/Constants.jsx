 export const RandomCaptcha = () => {
  const captcha = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  return captcha;
};
