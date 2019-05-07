'use strict';

const options = { theme: 'simple' };
const $editor = document.querySelector('.editor');
const $diagram = document.querySelector('.diagram');
const $errMessage = document.querySelector('.error-message');

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
    const code = $editor.textContent;

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
    $diagram.textContent = '';
}

function reportError(err) {
    console.error(err);
    $errMessage.textContent = err.message;
}

function clearErrorMessage() {
    $errMessage.textContent = '';
}

function setup() {
    render();
    $editor.textContent = removeInitialIndentation($editor.textContent);
    $editor.focus();
}

function removeInitialIndentation(text) {
    return text.replace(/^ +/gm, '');
}

$editor.addEventListener('keyup', debounce(render, 200));
$editor.addEventListener('blur', render);
window.addEventListener('load', setup);
