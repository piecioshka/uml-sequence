'use strict';

const options = { theme: 'simple' };
let $editor = document.querySelector('.editor');
let $diagram = document.querySelector('.diagram');
let $errMessage = document.querySelector('.error-message');

// https://davidwalsh.name/function-debounce
function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function render() {
    let code = $editor.innerText;

    clearErrorMessage();

    try {
        let d = window.Diagram.parse(code);
        clearLatestDiagram();
        d.drawSVG($diagram, options);
    } catch (err) {
        reportError(err);
    }
}

function clearLatestDiagram() {
    $diagram.innerText = '';
}

function reportError(err) {
    console.error(err);
    $errMessage.innerText = err.message;
}

function clearErrorMessage() {
    $errMessage.innerText = '';
}

function setup() {
    render();
    $editor.innerText = removeInitialIndentation($editor.innerText);
    $editor.focus();
}

function removeInitialIndentation(text) {
    return text.replace(/^ +/gm, '');
}

$editor.addEventListener('keyup', debounce(render, 200));
$editor.addEventListener('blur', render);
window.addEventListener('load', setup);
