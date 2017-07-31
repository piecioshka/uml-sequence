'use strict';

const options = { theme: 'simple' };
let $editor = document.querySelector('.editor');
let $diagram = document.querySelector('.diagram');
let $errMessage = document.querySelector('.error-message');

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

$editor.addEventListener('keyup', render);
$editor.addEventListener('blur', render);
window.addEventListener('load', setup);
