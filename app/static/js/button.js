export const btn = document.getElementById("loading-button");

export function enableButton() {
   btn.classList.remove("disabled")
}

export function disableButton() {
    btn.classList.add("disabled")
}