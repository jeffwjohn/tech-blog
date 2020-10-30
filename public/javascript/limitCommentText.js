const textarea = document.querySelector("textarea");

document.getElementById('commentTextArea').onkeyup = function () {
    document.getElementById('count').innerHTML = "Characters left: " + (250 - this.value.length);
};
textarea.addEventListener("input", event => {

    const target = event.currentTarget;
    const maxLength = target.getAttribute("maxlength");
    const currentLength = target.value.length;

    if (currentLength >= maxLength) {
        return console.log("You have reached the maximum number of characters.");
    }

    console.log(`${maxLength - currentLength} chars left`);
});