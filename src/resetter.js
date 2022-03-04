//Function to reset everything after submitting

const resetFields = async (e) => {
  let changer = document.getElementsByTagName("input");
  if (changer) {
    for (let i = 0; i < changer.length; i++) {
      let input = changer[i];
      if (input.name === "letter") {
        input.className = "letter";
        input.disabled = true;
      }
      if (input.name === "space") {
        input.className = "space";
        input.disabled = true;
      }
    }
    changer[0].focus();
  }
  let showbutt = document.querySelector("button");
  showbutt.className = "hidden-button";
};

module.exports = resetFields