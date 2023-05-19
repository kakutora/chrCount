const t = document.getElementById("inputArea__box");
const inputInfo = document.querySelectorAll(".input__info");
t.addEventListener("input", () => {
  inputInfo[0].innerHTML = t.value.replace(/\s+/g, "").length;
  inputInfo[1].innerHTML = t.value.replace(/\n+/g, "").length;
  inputInfo[2].innerHTML = t.value.split(/\r*\n/).length;
  for (let i = 400; i < 10000; i += 400) {
    if (t.value.length <= 400) {
      inputInfo[3].innerHTML = 1;
      break;
    } else if (t.value.length >= i) {
      inputInfo[3].innerHTML = Math.ceil(t.value.length / 400);
      break;
    } else if (t.value.length == 0) {
      inputInfo[3].innerHTML = 0;
      break;
    }
  }
  localStorage.setItem("chr", t.value);
});

let num = t.value.length;

window.addEventListener("load", () => {
  if (localStorage.getItem("chr")) {
    t.innerHTML = localStorage.getItem("chr");
    inputInfo[0].innerHTML = t.value.replace(/\s+/g, "").length;
    inputInfo[1].innerHTML = t.value.replace(/\n+/g, "").length;
    inputInfo[2].innerHTML = t.value.split(/\r*\n/).length;
    for (let i = 400; i < 10000; i += 400) {
      if (t.value.length <= 400) {
        inputInfo[3].innerHTML = 1;
        break;
      } else if (t.value.length >= i) {
        inputInfo[3].innerHTML = Math.ceil(t.value.length / 400);
        break;
      } else if (t.value.length == 0) {
        inputInfo[3].innerHTML = 0;
        break;
      }
    }
  }
});

const inputBtnCopy = document.querySelector(".inputArea__btn--copy");
const inputBtnClear = document.querySelector(".inputArea__btn--clear");
const inputBtnClearS = document.querySelector(".inputArea__btn--clearS");
const inputBtnDownload = document.querySelector(".inputArea__btn--download");
const inputBtnSave = document.querySelectorAll(".inputArea__btn--save");
const inputBtnLoad = document.querySelectorAll(".inputArea__btn--load");

inputBtnCopy.addEventListener("click", () => {
  navigator.clipboard.writeText(t.value);
});
inputBtnClear.addEventListener("click", () => {
  t.value = "";
});
inputBtnClearS.addEventListener("click", () => {
  window.sessionStorage.clear();
});
inputBtnDownload.addEventListener("click", () => {
  download_txt("chrCount.txt", t.value);
});
inputBtnSave[0].addEventListener("click", () => {
  window.sessionStorage.setItem("chrItem1", t.value);
});
inputBtnSave[1].addEventListener("click", () => {
  window.sessionStorage.setItem("chrItem2", t.value);
});
inputBtnSave[2].addEventListener("click", () => {
  window.sessionStorage.setItem("chrItem3", t.value);
});
inputBtnLoad[0].addEventListener("click", () => {
  t.value = window.sessionStorage.getItem("chrItem1");
});
inputBtnLoad[1].addEventListener("click", () => {
  t.value = window.sessionStorage.getItem("chrItem2");
});
inputBtnLoad[2].addEventListener("click", () => {
  t.value = window.sessionStorage.getItem("chrItem3");
});
function download_txt(file_name, data) {
  const blob = new Blob([data], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = file_name;
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
