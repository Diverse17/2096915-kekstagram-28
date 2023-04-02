const EFFECTS_LIST = [
  {
    name: 'none',
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const EFFECT_DEFAULT = EFFECTS_LIST[0];
let chosenEffect = EFFECT_DEFAULT;

const shownImage = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.effects__list');

noUiSlider.create(slider, {
  range: {
    min: EFFECT_DEFAULT.min,
    max: EFFECT_DEFAULT.max,
  },
  start: EFFECT_DEFAULT.max,
  step: EFFECT_DEFAULT.step,
  connect: 'lower'
});

const isDefault = () => chosenEffect === EFFECT_DEFAULT;

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.max,
    step: chosenEffect.step
  });

  if (isDefault()) {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return false;
  }
  chosenEffect = EFFECTS_LIST.find((effect) => effect.name === evt.target.value);
  shownImage.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onUpdateSlider = () => {
  const sliderValue = slider.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  shownImage.style.filter = (isDefault()) ? EFFECT_DEFAULT.filter : `${chosenEffect.filter}(${sliderValue}${chosenEffect.unit})`;
};

const resetEffects = () => {
  chosenEffect = EFFECT_DEFAULT;
  updateSlider();
};

effectsList.addEventListener('change', onEffectsChange);
slider.noUiSlider.on('update', onUpdateSlider);

export { resetEffects };
