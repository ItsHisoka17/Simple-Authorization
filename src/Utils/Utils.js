class Utils {

  static generateMainPIN(chars, type=null) {
    let numList = '0123456789';
    let charList = "abcdefghijklmnopqrstuvwxyz";
    let generatedPin = '';
  if (!type||type==="nums"){
    for (let i = 0; i < chars; i++) {
      generatedPin += numList[Math.floor(Math.random() * 10)];
    }
  } else {
    if (type && type==="mixed"){
      for (let i = 0; i < chars/2; i++){
        generatedPin += numList[Math.floor(Math.random() * 10)];
      };
      for (let i = 0; i < (chars-1)/2; i++){
        generatedPin += charList[Math.floor(Math.random() * charList["length"])];
      }
    }
  }
    return [...generatedPin].sort(()=>{return 0.5-Math.random()}).join('');
  }

  static createPINReloadScript(PIN, ms, callbackURL) {
    return `<p style="font-size: 35px;"><form action="`${callbackURL}`">ENTER YOUR PIN: <input name="auth_pin"></input></form></p><br style="font-size: 18px;">This link will expire in ${Math.round((ms/1000)/60)} Minutes</br><script>setTimeout(()=>document.write('<p style="font-size: 40px;">STILL THERE? RELOAD THE PAGE TO ACCESS THE CODE</p>'), 15000);</script>`
  }

  static get reloadMessage() {
    return '<p style="font-size: 40px">EXPIRED URL</p>'
  }

  static validate(e) { 
    let t;
    let emailRGX = /^([A-Za-z]|[0-9])+@[A-Za-z]+\.[A-Za-z]+$/;
    if (emailRGX.exec(e)){
      t = true;
    } else {
      t = false;
    };
    return t;
  }; 
};

module.exports = Utils;