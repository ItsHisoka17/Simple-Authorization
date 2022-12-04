class Utils {

  static generateMainPIN(chars) {
    let numList = '0123456789';
    let generatedPin = '';
    for (let i = 0; i < chars; i++) {
      generatedPin += numList[Math.floor(Math.random() * 10)];
    }
    return generatedPin;
  }

  static createPINReloadScript(PIN) {
    return `<p style="font-size: 35px;">YOUR PIN: ${PIN}</p><br style="font-size: 18px;">This link will expire in 3 minutes</br><script>setTimeout(()=>document.write('<p style="font-size: 40px;">STILL THERE? RELOAD THE PAGE TO ACCESS THE CODE</p>'), 15000);</script>`
  }

};

module.exports = Utils;