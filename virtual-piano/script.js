const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const letters = document.querySelector('.btn-letters');
const notes = document.querySelector('.btn-notes');
const btn = document.querySelectorAll('.btn');
const fullScreen = document.querySelector('.fullscreen');

let isMouseActive = false;

piano.addEventListener('mousedown', e => {
    if (e.target.classList.contains('piano-key')) {
        const note = e.target.dataset.note;
        note && (playAudio(note), e.target.classList.add('piano-key-active'), e.target.classList.add('piano-key-active-pseudo'), isMouseActive = true);
    }
});

piano.addEventListener('mouseover', e => {
    if (isMouseActive) {
        const note = e.target.dataset.note;
        note && (playAudio(note), e.target.classList.add('piano-key-active'), e.target.classList.add('piano-key-active-pseudo'));
    }
});

piano.addEventListener('mouseout', e => {
    e.target.classList.contains('piano-key') && (e.target.classList.remove('piano-key-active'), e.target.classList.remove('piano-key-active-pseudo'));
});

document.addEventListener("mouseup", e => {
    e.target.classList.contains('piano-key') && e.target.classList.remove('piano-key-active'),e.target.classList.remove('piano-key-active-pseudo'), isMouseActive = false
});

const playAudio = e => {
    const audio = document.querySelector(`audio[data-note="${e}"]`);
    audio.currentTime = 0;
    audio.play();
};

let isKeyActive = false;

window.addEventListener('keydown', e => {
    if (isKeyActive) return false;
    isKeyActive = true;
    pianoKeys.forEach(el => {
        if (e.code.substr(3) === el.dataset.letter) {
            const note = el.dataset.note
            note && (playAudio(note), el.classList.add('piano-key-active'), el.classList.add('piano-key-active-pseudo'))
        }
    });
});

window.addEventListener('keyup', e => {
    pianoKeys.forEach(el => e.code.substr(3) === el.dataset.letter && (el.classList.remove('piano-key-active'), el.classList.remove('piano-key-active-pseudo'))), isKeyActive = false
});

letters.addEventListener('click', () => {
  letters.classList.add('btn-active');
  notes.classList.remove('btn-active');
  pianoKeys.forEach(el => el.classList.add('letter'));
    });

notes.addEventListener('click', () => {
    letters.classList.remove('btn-active');
    notes.classList.add('btn-active');
    pianoKeys.forEach(el => el.classList.remove('letter'));
});

fullScreen.addEventListener('click', () =>
    document.fullscreenElement != null ? deactivateFullscreen() : activateFullscreen(document.documentElement)
);

const deactivateFullscreen = () => {
    if (document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
};

const activateFullscreen = (element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitrequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullscreen) {
        element.mozRequestFullScreen();
    }
};
