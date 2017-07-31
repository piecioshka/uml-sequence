'use strict';

const options = { theme: 'simple' };
let $editor = document.querySelector('.editor');
let $diagram = document.querySelector('.diagram');
let $errMessage = document.querySelector('.error-message');

function render() {
    let code = $editor.textContent;

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

$editor.addEventListener('keyup', render);
$editor.addEventListener('blur', render);
window.addEventListener('load', setup);
