class Utils {

  static generateMainPIN(chars) {
    let numList = '0123456789';
    let generatedPin = '';
    for (let i = 0; i < chars; i++) {
      generatedPin += numList[Math.floor(Math.random() * 10)];
    }
    return generatedPin;
  }

};

module.exports = Utils;