const loadScript = (url) => new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.async = true;
    script.type = 'text/javascript';
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;

    document.head.appendChild(script);
});

const createLoadingScreen = () => {
    ((self) => {
        'use strict';

        const classes = {
            laodingScreenContainer: 'wof-loading-screen-container',
            loadingScreenContent: 'wof-loading-screen-content',
            loadingScreenText: 'wof-loading-screen-text',
            loadingStyle: 'wof-loading-style',
        };

        const selectors = Object.keys(classes).reduce((createdSelector, key) => (
            createdSelector[key] = `.${ classes[key] }`, createdSelector
        ), {});

        self.init = () => {
            self.buildCSS();
            self.buildHTML();
        };

        self.reset = () => {
            const loadingScreenContainer = document.querySelector(selectors.loadingScreenContainer);
            const loadingStyle = document.querySelector(selectors.loadingStyle);

            loadingScreenContainer.remove();
            loadingStyle.remove();
        };

        self.buildCSS = () => {
            const { laodingScreenContainer, loadingScreenContent, loadingScreenText } = selectors;

            const style =
            `${ laodingScreenContainer } {
                position: fixed;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background-color: #363A5D;
            }
            ${ loadingScreenText } {
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                color: #999;
                width: 100px;
                height: 30px;
                margin: -7px 0 0 -45px;
                text-align: center;
                font-family: 'PT Sans Narrow', sans-serif;
                font-size: 20px;
                text-transform: capitalize;
            }
            ${ loadingScreenContent } {
                display: block;
                position: relative;
                left: 50%;
                top: 50%;
                width: 170px;
                height: 170px;
                margin: -85px 0 0 -85px;
                border: 3px solid #F00;
            }
            ${ loadingScreenContent }:after {
                content: "";
                position: absolute;
                border: 3px solid #0F0;
                left: 15px;
                right: 15px;
                top: 15px;
                bottom: 15px;
            }
            ${ loadingScreenContent }:before {
                content: "";
                position: absolute;
                border: 3px solid #00F;
                left: 5px;
                right: 5px;
                top: 5px;
                bottom: 5px;
            }
            ${ loadingScreenContent } {
                border: 3px solid transparent;
                border-top-color: #4D658D;
                border-bottom-color: #4D658D;
                border-radius: 50%;
                -webkit-animation: loader 2s linear infinite;
                -moz-animation: loader 2s linear infinite;
                -o-animation: loader 2s linear infinite;
                animation: loader 2s linear infinite;
            }
            ${ loadingScreenContent }:before {
                border: 3px solid transparent;
                border-top-color: #D4CC6A;
                border-bottom-color: #D4CC6A;
                border-radius: 50%;
                -webkit-animation: loader 3s linear infinite;
                -moz-animation: loader 2s linear infinite;
                -o-animation: loader 2s linear infinite;
                animation: loader 3s linear infinite;
            }
            ${ loadingScreenContent }:after {
                border: 3px solid transparent;
                border-top-color: #84417C;
                border-bottom-color: #84417C;
                border-radius: 50%;
                -webkit-animation: loader 1.5s linear infinite;
                animation: loader 1.5s linear infinite;
                -moz-animation: loader 2s linear infinite;
                -o-animation: loader 2s linear infinite;
            }
            @keyframes loader {
                0% {
                    -webkit-transform: rotate(0deg);
                    -ms-transform: rotate(0deg);
                    transform: rotate(0deg);
                }
                100% {
                    -webkit-transform: rotate(360deg);
                    -ms-transform: rotate(360deg);
                    transform: rotate(360deg);
                }
            }`;

            const styleElement = document.createElement('style');

            styleElement.classList.add(classes.loadingStyle);
            styleElement.innerHTML = style;
            document.head.appendChild(styleElement);
        };

        self.buildHTML = () => {
            const { laodingScreenContainer, loadingScreenContent, loadingScreenText } = classes;

            const loadingScreenHtml =
            `<div class="${ laodingScreenContainer }">
                <div class="${ loadingScreenText }">loading</div>
                <div class="${ loadingScreenContent }"></div>
            </div>`;

            document.body.insertAdjacentHTML('beforeend', loadingScreenHtml);
        };

        self.init();
    })({});
};

createLoadingScreen();

const scriptSource = [
    { name: 'jQuery', url: 'https://code.jquery.com/jquery-3.3.1.min.js' },
];

Promise.all(scriptSource.map((scriptUrl) => loadScript(scriptUrl.url))).then(() => {
    (($) => {
        $(document).ready(() => {
            'use strict';

            const self = {};

            const variables = {
                addedSliceNames: [],
                slicesRotate: [],
                slicesText: [],
                selectedText: '',
            };

            let config = {
                radius: 180,
                rotationTime: 5,
                animationTime: 15,
                rotateCount: 5,
                resetBtnText: 'Reset',
                startButtonText: 'Start Spin',
                dynamicHeaderText: 'You Can Add People To Spin',
                spinHeaderText: 'You Can Spin The Wheel',
                dynamicButtonText: 'Add Person',
                inputSliceText: 'Enter person name',
                isAnimation: true,
                stopperUp: true,
                confetti: true,
                onlyLetters: true,
                stopperDirection: 'top',
                spinContainerColor: '#363A5D',
                spinAddContainerColor: '#363A5D',
                containerColor: '#1F2544',
                spinButtonColor: '#416B58',
                spinAddButtonColor: '#416B58',
                spinOuterCircleColor: '#436850',
                spinInnerCircleColor: '#ADBC9F',
                winnerPopupBackground: '#363A5D',
                stopperColor: '#416B58',
                spinImage: 'https://i.hizliresim.com/cw090v2.png',
            };

            const defaultConfig = { ...config };

            const changedConfigNames = {
                startButtonText: {
                    label: 'Change Start Button Text',
                    inputType: 'text',
                },
                dynamicHeaderText: {
                    label: 'Change Dynamic Header Text',
                    inputType: 'text',
                },
                spinHeaderText: {
                    label: 'Change Spin Header Text',
                    inputType: 'text',
                },
                dynamicButtonText: {
                    label: 'Change Spin Add Button Text',
                    inputType: 'text',
                },
                rotationTime: {
                    label: 'Spin Rotation Speed',
                    inputType: 'select',
                    options: [3, 5, 7, 9, 11, 13, 15, 17, 19, 21],
                },
                animationTime: {
                    label: 'Spin Animation Speed',
                    inputType: 'select',
                    options: [3, 5, 7, 9, 11, 13, 15, 17, 19, 21],
                },
                rotateCount: {
                    label: 'Spin Rotate Count',
                    inputType: 'select',
                    options: [1, 2, 3, 4, 5],
                },
                spinContainerColor: {
                    label: 'Change Spin Background Color',
                    inputType: 'color',
                },
                spinAddContainerColor: {
                    label: 'Change Spin Add Background Color',
                    inputType: 'color',
                },
                containerColor: {
                    label: 'Change Background Color',
                    inputType: 'color',
                },
                spinButtonColor: {
                    label: 'Change Spin Button Color',
                    inputType: 'color',
                },
                spinAddButtonColor: {
                    label: 'Change Spin Add Button Color',
                    inputType: 'color',
                },
                spinOuterCircleColor: {
                    label: 'Change Spin Outer Circle Color',
                    inputType: 'color',
                },
                spinInnerCircleColor: {
                    label: 'Change Spin Inner Circle Color',
                    inputType: 'color',
                },
                stopperColor: {
                    label: 'Change Stopper Color',
                    inputType: 'color',
                },
                winnerPopupBackground: {
                    label: 'Change Winner Background Color',
                    inputType: 'color',
                },
                stopperDirection: {
                    label: 'Change Stopper Direction',
                    inputType: 'select',
                    options: ['top', 'bottom', 'left', 'right'],
                },
                stopperUp: {
                    label: 'Stopper Up Or Down',
                    inputType: 'checkbox',
                },
                confetti: {
                    label: 'Confetti Open Or Close',
                    inputType: 'checkbox',
                },
                isAnimation: {
                    label: 'Animation Open Or Close',
                    inputType: 'checkbox',
                },
                onlyLetters: {
                    label: 'Only Letters For Slice Name',
                    inputType: 'checkbox',
                },
            };

            const classes = {
                style: 'style',
                container: 'wof-container',
                wrapper: 'wof-wrapper',
                sliceContainer: 'wof-slice-container',
                slices: 'wof-slices',
                spinContainer: 'wof-spin-container',
                slice: 'wof-slice',
                sliceText: 'slice-text',
                spinIcon: 'wof-spin',
                spinIconImage: 'wof-spin-image',
                spinStopper: 'wof-spin-stoper',
                spinStopperContainer: 'wof-spin-stoper-container',
                spinHeaderContainer: 'wof-spin-header-container',
                spinBackground: 'wof-spin-background',
                spinStartButton: 'wof-spin-start-button',
                spinHeader: 'wof-spin-header',
                spinStartContainer: 'wof-spin-start-container',
                dynamicSliceAddContainer: 'wof-dynamic-slice-add-container',
                dynamicSliceHeaderContainer: 'wof-dynamic-slice-header-container',
                dynamicSliceHeader: 'wof-dynamic-slice-header',
                dynamicSliceInput: 'wof-dynamic-slice-input',
                dynamicSliceButton: 'wof-dynamic-slice-button',
                dynamicWinRate: 'wof-dynamic-win-rate',
                dynamicSliceContainer: 'wof-dynamic-slice-container',
                dynamicSliceTextContainer: 'wof-dynamic-slice-text-container',
                dynamicSliceText: 'wof-dynamic-slice-text',
                resetButton: 'wof-reset-button',
                spinSettingsPopupContainer: 'wof-spin-settings-popup-container',
                spinSettingsPopup: 'wof-spin-settings-popup',
                spinSettingsIcon: 'wof-spin-settings-icon',
                spinSettingsIconContainer: 'wof-spin-settings-icon-container',
                spinSettingsShow: 'wof-spin-settings-show',
                spinSettingsPopupText: 'wof-spin-settings-popup-text',
                spinSettingsPopupButton: 'wof-spin-settings-popup-button',
                spinSettingsPopupInput: 'wof-spin-settings-popup-input',
                spinCloseContainer: 'wof-spin-close-container',
                spinCloseButton: 'wof-spin-close-button',
                checkboxSwitch: 'wof-spin-switch',
                checkboxForSlider: 'wof-spin-slider',
                checkboxForRound: 'wof-spin-round',
                dynamicSliceTextDelete: 'wof-dynamic-slice-text-delete',
                winnerText: 'wof-winner-text',
                startButtonDisabled: 'wof-start-button-disabled',
                sliceNameInputError: 'wof-slice-name-input-error',
                winnerPopupContainer: 'wof-winner-popup-container',
                winnerPopup: 'wof-winner-popup',
                winnerPopupShow: 'wof-winner-popup-show',
                winnerPopupClose: 'wof-winner-popup-close',
                winnerIcon: 'wof-winner-icon',
                icons: 'wof-icons',
                fakeSliceText: 'wof-fake-slice-text',
                copyRight: 'wof-copy-right',
                inputError: 'wof-input-error',
                winnerHeader: 'wof-winner-header',
                laodingScreenContainer: 'wof-loading-screen-container',
                loadingScreenText: 'wof-loading-screen-text',
                loadingScreenContent: 'wof-loading-screen-content',
            };

            const selectors = Object.keys(classes).reduce((createdSelector, key) => (
                createdSelector[key] = `.${ classes[key] }`, createdSelector
            ), {});

            self.init = (starter) => {
                self.reset();
                self.buildCSS();
                self.buildHTML();
                self.setEvents();
                self.getSlicesLocal();

                setTimeout(() => {
                    const loadingScreen = $('.wof-loading-screen-container');
                    const loadingStyle = $('.wof-loading-style');

                    if (loadingScreen.length > 0) {
                        loadingScreen.remove();
                        loadingStyle.remove();
                    }
                }, 1000);

                if ((localStorage.getItem('config') || []) && starter) {
                    self.changeConfig();
                }
            };

            self.reset = () => {
                const { style, container, wrapper } = selectors;

                $(`${ style }, ${ container }, ${ wrapper }`).remove();
            };

            self.buildCSS = () => {
                const { container, wrapper, sliceContainer, slice, spinIcon, sliceText, spinStopper, spinBackground,
                    spinStartButton, spinIconImage, spinHeader, spinHeaderContainer, slices, spinStopperContainer,
                    dynamicSliceHeaderContainer, spinContainer, dynamicSliceAddContainer, dynamicSliceButton,
                    winnerText, dynamicSliceInput, dynamicSliceContainer, dynamicSliceText, dynamicSliceTextContainer,
                    checkboxSwitch, dynamicSliceHeader, resetButton, spinSettingsPopupContainer, spinSettingsIcon,
                    spinSettingsPopup, spinSettingsIconContainer, spinSettingsShow, spinSettingsPopupText, copyRight,
                    spinSettingsPopupInput, spinSettingsPopupButton, spinCloseContainer, spinCloseButton, winnerIcon,
                    checkboxForSlider, startButtonDisabled, checkboxForRound, dynamicSliceTextDelete, dynamicWinRate,
                    spinStartContainer, sliceNameInputError, icons, winnerPopupContainer, winnerPopup, fakeSliceText,
                    winnerPopupShow, winnerPopupClose, inputError, winnerHeader } = selectors;

                const { stopperDirection, stopperUp, isAnimation, spinContainerColor, spinOuterCircleColor,
                    stopperColor, spinInnerCircleColor, spinAddButtonColor, spinAddContainerColor, spinButtonColor,
                    animationTime, containerColor, winnerPopupBackground } = config;

                const stoperLocal = (stoperName, stoperCondition) => stopperDirection === stoperName &&
                stopperUp === stoperCondition;
                const stoperPosition = (stoperCondition) => (stopperUp === stoperCondition ? 'position: absolute;' : '');

                const customStyle =
                `@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Ubuntu', sans-serif;
                }
                ${ container } {
                    height: 100vh;
                    width: 100%;
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 9999;
                }
                ${ wrapper } {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    position: relative;
                    background-color: ${ containerColor };
                }
                ${ wrapper } svg:not(${ icons }) {
                    position: absolute !important;
                    z-index: 99999999;  
                }
                ${ spinBackground } {
                    height: 800px;
                    width: 450px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 30px;
                    flex-direction: column;
                    background-color: ${ spinContainerColor };
                    border-radius: 10px;
                    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35);
                    flex: 0 calc((100% / 3) + 60px);
                    position: relative;
                }
                ${ winnerText } {
                    color: ${ self.findDarkColor(winnerPopupBackground) ? '#000' : '#FFF' };
                    position: absolute;
                    top: 60%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 30px;
                    text-transform: capitalize;
                    width: max-content;
                }
                ${ spinHeaderContainer } {
                    width: calc(100% - (60 * 2px));
                }
                ${ spinHeader } {
                    font-size: 23px;
                    color: ${ self.findDarkColor(spinContainerColor) ? '#000' : '#FFF' };
                    font-weight: 900;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                ${ spinContainer } {
                    border: 25px solid ${ spinOuterCircleColor };
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35);
                }
                ${ spinStopperContainer } {
                    ${ stoperPosition(false) }
                    ${ stoperLocal('top', false) ? 'transform: rotate(180deg); top: 160px;' : '' }
                    ${ stoperLocal('bottom', false) ? 'transform: rotate(360deg); bottom: 160px;' : '' }
                    ${ stoperLocal('left', false) ? 'transform: rotate(270deg); left: 175px;' : '' }
                    ${ stoperLocal('right', false) ? 'transform: rotate(90deg); right: 175px;' : '' }
                    z-index: 999;
                }
                ${ spinStopper } {
                    ${ stoperPosition(true) }
                    ${ stopperDirection === 'top' || stopperDirection === 'bottom' ? 'left: 50%;' : '' }
                    ${ stoperLocal('bottom', true) ? 'bottom: -60px; transform: translate(-50%, -50%) rotate(180deg);' : '' } 
                    ${ stoperLocal('top', true) ? ' top: -5px; transform: translate(-50%, -50%) rotate(0deg);' : '' } 
                    ${ stoperLocal('right', true) ? 'right: -65px; transform: translate(-50%, -50%) rotate(90deg);' : '' }
                    ${ stoperLocal('left', true) ? 'left: -5px;transform: translate(-50%, -50%) rotate(270deg);' : '' }
                    background-image: url(${ self.setSvgColor(`<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="161.000000pt" height="150.000000pt" viewBox="0 0 161.000000 150.000000">
                        <g transform="translate(0.000000,150.000000) scale(0.100000,-0.100000)"
                        fill="${ config.stopperColor }" stroke="none">
                        <path d="M730 1269 c-110 -25 -220 -136 -245 -249 -14 -61 -7 -157 15 -205 25
                        -56 48 -108 121 -272 12 -27 34 -76 50 -111 16 -35 29 -65 29 -67 0 -3 14 -34
                        30 -70 17 -36 30 -69 30 -74 0 -15 27 -20 43 -8 22 18 305 582 323 644 31 107
                        0 231 -80 316 -71 75 -215 119 -316 96z"/>
                    </g>
                    </svg>`) });
                    background-size: contain;
                    height: 55px;
                    width: 60px;
                    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0));
                }
                ${ spinStopper }::before {
                    content: '';
                    height: 6px;
                    border-radius: 50%;
                    top: 15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 6px;
                    position: absolute;
                    background-color: ${ self.findDarkColor(stopperColor) ? '#000' : '#FFF' };
                }
                ${ sliceContainer } {
                    border-radius: 50%;
                    height: 390px;
                    width: 390px;
                    position: relative;
                    border: 20px solid ${ spinInnerCircleColor };
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    ${ isAnimation ? `animation: rotate ${ animationTime }s infinite linear;` : 'animation: none;' }
                }
                ${ slices } {
                    height: 360px;
                    width: 360px;
                    border-radius: 50%;
                    position: absolute;
                }
                ${ slice } {
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    opacity: 1;
                    left: 0px;
                    right: 0;
                    margin: 0 auto;
                    text-transform: capitalize;
                }
                ${ sliceText } {
                    position: absolute;
                    top: -110px;
                    left: 50%;
                    transform: translateX(-50%) rotate(90deg);
                    width: max-content;
                    font-weight: 500;
                }
                ${ fakeSliceText } {
                    position: absolute;
                    top: -125px;
                    left: 50%;
                    font-size: 20px;
                    transform: translateX(-50%) rotate(90deg);
                    width: max-content;
                    font-weight: 500;
                }
                ${ spinIcon } {
                    position: absolute;
                    height: 50px;
                    width: 50px;
                    border-radius: 50%;
                }
                ${ spinIconImage } {
                    width: 100%;
                    height: 100%;
                }
                ${ spinStartContainer } {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }
                ${ spinStartButton } {
                    width: calc(100% - (60 * 2px));
                    height: 50px;
                    border-radius: 5px;
                    background-color: ${ spinButtonColor };
                    color: ${ self.findDarkColor(spinButtonColor) ? '#000' : '#FFF' };
                    border: none;
                    cursor: pointer;
                    font-weight: 900;
                    font-size: 23px;
                    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35);
                    padding: 0 40px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                ${ startButtonDisabled } {
                    background-color: #ccc;
                    pointer-events: none;
                }
                ${ spinStartContainer }:has(${ startButtonDisabled }) {
                    cursor: not-allowed;
                }
                ${ dynamicSliceContainer } {
                    height: 800px;
                    width: 450px;
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    background-color: ${ spinAddContainerColor };
                    padding: 76px 60px;
                    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35);
                    flex: 0 calc((100% / 3) + 60px);
                    position: relative;
                }
                ${ dynamicSliceHeaderContainer } {
                    height: 100px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                ${ dynamicSliceHeader } {
                    font-size: 23px;
                    color: ${ self.findDarkColor(spinAddContainerColor) ? '#000' : '#FFF' };
                    font-weight: 900;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                ${ dynamicSliceAddContainer } {
                    height: 30%;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                }
                ${ dynamicSliceInput } {
                    width: 100%;
                    height: 50px;
                    border: none;
                    outline: none;
                    border-radius: 5px;
                    padding: 0 10px;
                    font-size: 20px;
                    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35);
                    border: 2px solid transparent;
                }
                ${ dynamicSliceInput }${ sliceNameInputError } {
                    border-color: red;
                }
                ${ dynamicSliceInput }${ sliceNameInputError } + ${ inputError } {
                    opacity: 1;
                }
                ${ inputError } {
                    margin: -10px 0 0 0;
                    width: 100%;
                    height: 15px;
                    color: red;
                    opacity: 0;
                    transition: opacity 0.1s;
                    font-size: 17px;
                }
                ${ dynamicSliceButton } {
                    width: 100%;
                    height: 50px;
                    border: none;
                    outline: none;
                    border-radius: 5px;
                    font-weight: 900;
                    font-size: 23px;
                    margin-bottom: 30px;
                    background-color: ${ spinAddButtonColor };
                    color: ${ self.findDarkColor(spinAddButtonColor) ? '#000' : '#FFF' };
                    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35);
                    cursor: pointer;
                    padding: 0 40px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                ${ dynamicSliceTextContainer } {
                    height: 50%;
                    width: 100%;
                    display: flex;
                    gap: 10px;
                    flex-direction: column;
                    overflow-y: auto;
                }
                ${ dynamicSliceText } {
                    color: ${ self.findDarkColor(spinAddContainerColor) ? '#000' : '#FFF' };
                    font-size: 16px;
                    font-weight: 800;
                    position: relative;
                    padding-left: 20px;
                    display: flex;
                    gap: 10px;
                    width: 100%;
                    min-height: 20px;
                    text-transform: capitalize;
                }
                ${ dynamicSliceTextDelete } {
                    width: 20px;
                    height: 100%;
                    position: absolute;
                    right: 10px;
                    color: ${ self.findDarkColor(spinAddContainerColor) ? '#000' : '#FFF' };
                    cursor: pointer;
                }
                ${ dynamicWinRate } {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    font-size: 17px;
                    font-weight: 800;
                    color: ${ self.findDarkColor(spinAddContainerColor) ? '#000' : '#FFF' };
                }
                ${ dynamicSliceText }:before {
                    content: '';
                    height: 6px;
                    position: absolute;
                    width: 6px;
                    background: ${ self.findDarkColor(spinAddContainerColor) ? '#000' : '#FFF' };
                    top: 50%;
                    transform: translateY(-50%);
                    border-radius: 50%;
                    left: 5px;
                }
                ${ dynamicSliceTextContainer }::-webkit-scrollbar {
                    width: 10px;
                }
                ${ dynamicSliceTextContainer }::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    border-radius: 3px;
                }
                ${ dynamicSliceTextContainer }::-webkit-scrollbar-thumb {
                    border-radius: 3px;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
                }
                ${ resetButton } {
                    position: absolute;
                    bottom: 10px;
                    right: 20px;
                    border-radius: 5px;
                    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35);
                    font-size: 15px;
                    color: ${ self.findDarkColor(containerColor) ? '#000' : '#FFF' };
                    font-weight: 600;
                    cursor: pointer;
                    padding: 5px 10px;
                }
                ${ spinSettingsIconContainer } {
                    position: absolute;
                    right: 15px;
                    top: 20px;
                    z-index: 9999;
                    cursor: pointer;
                    width: 25px;
                    height: 25px;
                }          
                ${ spinSettingsIcon } {
                    width: 25px;
                    height: 25px;
                    background-image: url(${ self.setSvgColor(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' 
                    stroke='${ self.findDarkColor(config.containerColor) ? '#000' : '#FFF' }' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z'></path><circle cx='12' cy='12' r='3'/>
                    </svg>`) });
                    background-size: cover;
                    border: none;
                    outline: none;
                    background-color: transparent;
                    cursor: pointer;
                }
                ${ spinSettingsPopupContainer } {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    display: none;
                    transition: opacity 0.2s ease-in-out;
                    z-index: 9991;
                }
                ${ spinSettingsPopupContainer }:before {
                    content: "";
                    height: 100%;
                    width: 100%;
                    background-color: rgba(0, 0, 0, 0.685);
                    position: absolute;
                    z-index: -1;
                }
                ${ spinCloseContainer } {
                    position: absolute;
                    right: 10px;
                    top: 10px;
                    z-index: 9992;
                }
                ${ spinCloseButton } {
                    font-size: 20px;
                    color: #fff;
                    cursor: pointer;
                }
                ${ spinSettingsPopup } {
                    height: 670px;
                    width: 990px;
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #1D1D1D;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    padding: 35px;
                    flex-wrap: wrap;
                    border-radius: 10px;
                    align-content: space-between;
                }
                ${ spinSettingsPopupText } {
                    display: flex;
                    gap: 10px;
                    color: #FFF;
                    flex-direction: column;
                }
                ${ spinSettingsPopupInput } {
                    width: 270px;
                    height: 35px;
                    border: none;
                    outline: none;
                    padding: 0 10px;
                    font-size: 16px;
                    border-radius: 5px;
                }
                ${ spinSettingsPopupInput }[type="color"] {
                    padding: revert-layer;
                    -webkit-appearance: none;
                }
                ${ spinSettingsPopupInput }[type="color"]::-webkit-color-swatch {
                    border: none;
                    border-radius: 3px;
                }
                ${ spinSettingsPopupInput }[type="color"]::-moz-color-swatch {
                    border: none;
                    border-radius: 3px;
                }
                ${ spinSettingsPopupButton } {
                    height: 60px;
                    width: 93%;
                    border-radius: 5px;
                    outline: none;
                    border: none;
                    position: absolute;
                    bottom: 20px;
                    font-size: 25px;
                    left: 50%;
                    transform: translateX(-50%);
                    cursor: pointer;
                }
                ${ checkboxSwitch } {
                    position: relative;
                    display: inline-block;
                    width: 60px;
                    height: 34px;
                }
                ${ spinSettingsPopupInput }[type="checkbox"] {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                ${ checkboxForSlider } {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc;
                    -webkit-transition: .4s;
                    transition: .4s;
                }
                ${ checkboxForSlider }:before {
                    position: absolute;
                    content: "";
                    height: 26px;
                    width: 26px;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    -webkit-transition: .4s;
                    transition: .4s;
                }
                ${ spinSettingsPopupInput }[type="checkbox"]:checked + ${ checkboxForSlider } {
                    background-color: #2196F3;
                }
                ${ spinSettingsPopupInput }[type="checkbox"]:focus + ${ checkboxForSlider } {
                    box-shadow: 0 0 1px #2196F3;
                }
                ${ spinSettingsPopupInput }[type="checkbox"]:checked + ${ checkboxForSlider }:before {
                    -webkit-transform: translateX(26px);
                    -ms-transform: translateX(26px);
                    transform: translateX(26px);
                }
                ${ checkboxForSlider }${ checkboxForRound } {
                    border-radius: 34px;
                }
                ${ checkboxForSlider }${ checkboxForRound }:before {
                    border-radius: 50%;
                }
                ${ spinSettingsPopupContainer }${ spinSettingsShow } {
                    display: flex;
                }
                ${ winnerPopupContainer } {
                    z-index: 99999;
                    width: 100%;
                    position: absolute;
                    height: 100%;
                    background: rgb(0 0 0 / 37%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    display: none;
                }
                ${ winnerPopupContainer }${ winnerPopupShow } {
                    display: flex;
                }
                ${ winnerPopup } {
                    width: 600px;
                    height: 200px;
                    background: ${ winnerPopupBackground };
                    border-radius: 10px;
                    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35);
                    position: relative;
                }
                ${ winnerHeader } {
                    width: 100%;
                    height: 60px;
                    border-radius: 10px 10px 0 0;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    padding-left: 200px;
                    font-size: 25px;
                }
                ${ winnerPopupClose } {
                    position: absolute;
                    top: 15px;
                    right: 10px;
                    cursor: pointer;
                }
                ${ winnerIcon } {
                    position: absolute;
                    left: 165px;
                    height: 28px;
                    width: 30px;
                }
                ${ copyRight } {
                    position: absolute;
                    bottom: 5px;
                    left: 5px;
                    color: ${ self.findDarkColor(containerColor) ? '#000' : 'aliceblue' };
                    font-size: 13px;
                }
                @keyframes rotate {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                @media (max-width: 512px) {
                    ${ container } {
                        display: none;
                    }
                }
                @media (max-width: 1024px) {
                    ${ container } {
                        display: none;
                    }
                }
                @media screen and (orientation: landscape) and (max-width: 1200px) {
                    ${ container } {
                        display: none;
                    }
                }`;

                $('head').append($('<style>').addClass(classes.style).text(customStyle));
            };

            self.onlyLetters = (text) => text.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ, ]/g, '');

            self.setSvgColor = (svg) => `"data:image/svg+xml,${ encodeURIComponent(svg) }"`;

            self.buildHTML = () => {
                const { container, wrapper, spinContainer, sliceContainer, spinIcon, spinStopper, spinBackground,
                    spinStartButton, spinIconImage, slices, spinStartContainer, spinHeaderContainer, spinHeader, icons,
                    spinStopperContainer, dynamicSliceAddContainer, dynamicSliceInput, dynamicSliceButton, resetButton,
                    dynamicSliceContainer, dynamicSliceHeader, dynamicSliceTextContainer, spinSettingsIconContainer,
                    dynamicSliceHeaderContainer, spinSettingsPopupContainer, spinSettingsPopup, winnerPopupContainer,
                    spinSettingsIcon, winnerPopup, winnerPopupClose, copyRight, inputError, winnerHeader,
                    winnerIcon } = classes;

                const { startButtonText, spinImage, spinHeaderText, inputSliceText, dynamicButtonText,
                    dynamicHeaderText, resetBtnText } = config;

                const mainHtml =
                `<div class="${ container }">
                    <div class="${ wrapper }">
                        <div class="${ spinBackground }">
                            <div class="${ spinHeaderContainer }">
                                <div class="${ spinHeader }">${ spinHeaderText }</div>
                            </div>
                            <div class="${ spinContainer }">
                                <div class="${ spinStopperContainer }">
                                    <div class="${ spinStopper }"></div>
                                </div>
                                <div class="${ sliceContainer }">
                                    <div class="${ slices }"></div>
                                </div>
                                <div class="${ spinIcon }">
                                    <img class="${ spinIconImage }" src="${ spinImage }">
                                </div>
                            </div>
                            <div class="${ spinStartContainer }">
                                <button class="${ spinStartButton }">${ startButtonText }</button>
                            </div>
                        </div>
                        <div class="${ dynamicSliceContainer }">
                            <div class="${ dynamicSliceHeaderContainer }">
                                <div class="${ dynamicSliceHeader }">${ dynamicHeaderText }</div>
                            </div>
                            <div class="${ dynamicSliceAddContainer }">
                                <input type="text" class="${ dynamicSliceInput }" placeHolder="${ inputSliceText }"
                                    id="sliceName" name="sliceName">
                                <div class="${ inputError }"></div>
                                <button class="${ dynamicSliceButton }">${ dynamicButtonText }</button>
                            </div>
                            <div class="${ dynamicSliceTextContainer }"></div>
                        </div>
                        <div class="${ resetButton }">${ resetBtnText }</div>
                        <div class="${ spinSettingsIconContainer }">
                            <button class="${ spinSettingsIcon }"></button>
                        </div>
                        <div class="${ spinSettingsPopupContainer }">
                            <div class="${ spinSettingsPopup }"></div>
                        </div>
                        <div class="${ winnerPopupContainer }">
                            <div class="${ winnerPopup }">
                                <div class="${ winnerHeader }">
                                    <div>We have a winner!</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                    class="${ icons } ${ winnerIcon }"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3
                                        16h14"/>
                                    </svg>
                                </div>
                                <div class="${ winnerPopupClose }">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" 
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                                    stroke-linejoin="round" class="${ classes.icons }">
                                        <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="${ copyRight }">
                            <span>For feedback and new developments, please contact Enes Kabakaya.<span>
                        </div>
                    </div>
                </div>`;

                $('body').after(mainHtml);
                self.generateSlices();
            };

            self.generateSlices = () => {
                const { slice, sliceText } = classes;

                $(selectors.slices).html('');

                variables.addedSliceNames.forEach((entity, index) => {
                    const angle = (360 / variables.addedSliceNames.length) * index;

                    $(selectors.slices).append($('<div>').attr('data-id', entity.id).addClass(slice).css({
                        transform: `rotate(${ angle }deg)`,
                        borderWidth: `${ config.radius }px 
                        ${ self.calculateSliceWidth(variables.addedSliceNames.length) }px 0`,
                        borderColor: `${ entity.color } transparent`,
                        transformOrigin: 'center bottom',
                    }).append($('<div>').text(entity.name).addClass(sliceText).css({
                        color: self.findDarkColor(entity.color) ? '#000' : '#FFF',
                    })));
                });
            };

            self.calculateSliceWidth = (totalSlices) => {
                const specialCases = { 1: 360, 2: 180, 3: 120, 4: 90 * 2, 5: 90 * 1.5 };

                return specialCases[totalSlices] || 90 * (7 / totalSlices);
            };

            self.remakeSlicesWidth = () => {
                const slicesCount = variables.addedSliceNames.length;

                if (slicesCount === 1) {
                    variables.addedSliceNames.forEach((entity, index) => {
                        $(selectors.slice).eq(index).css({
                            borderWidth: '360px 180px 0',
                            borderColor: `${ entity.color } transparent`,
                            background: `${ entity.color }`,
                            clipPath: 'none'
                        });

                        $(selectors.sliceText).eq(index).css({
                            margin: '20px 0',
                            transform: 'translateX(-50%) rotate(90deg)',
                        });
                    });
                }

                if (slicesCount === 2) {
                    variables.addedSliceNames.forEach((entity, index) => {
                        $(selectors.slice).eq(index).css({
                            borderWidth: '180px 180px 0',
                            borderColor: `${ entity.color } transparent`,
                            background: `${ entity.color }`,
                            clipPath: 'none'
                        });

                        $(selectors.sliceText).eq(index).css({
                            margin: '0',
                            transform: 'translateX(-50%) rotate(90deg)',
                        });
                    });
                }

                if (slicesCount === 3) {
                    variables.addedSliceNames.forEach((entity, index) => {
                        $(selectors.slice).eq(index).css({
                            borderWidth: '180px 180px 0',
                            borderColor: `${ entity.color } transparent`,
                            background: `${ entity.color }`,
                            clipPath: 'polygon(100% 0% , 50% 100% , -140% 0)',
                        });

                        $(selectors.sliceText).eq(index).css({
                            margin: '5px -20px',
                            transform: 'translateX(-50%) rotate(80deg)',
                        });
                    });
                }

                self.calculateTextFontSize();
            };

            self.getRandomColor = () => {
                const letters = '0123456789ABCDEF';
                let color = '#';

                [...Array(6)].forEach(() => {
                    color += letters[Math.floor(Math.random() * 16)];
                });

                return color;
            };

            self.findDarkColor = (color) => {
                const fixingColor = color.replace('#', '');
                const r = parseInt(fixingColor.substring(0, 2), 16);
                const g = parseInt(fixingColor.substring(2, 4), 16);
                const b = parseInt(fixingColor.substring(4, 6), 16);

                return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
            };

            self.setEvents = () => {
                const { spinStartButton, dynamicSliceButton, sliceContainer, dynamicSliceInput, resetButton,
                    winnerPopup, winnerPopupContainer, spinSettingsIcon, spinSettingsPopupContainer, inputError,
                    slice, winnerPopupClose } = selectors;

                const { startButtonDisabled, spinSettingsShow, winnerPopupShow, winnerText } = classes;

                const { confetti, isAnimation, rotationTime } = config;

                $(spinStartButton).on('click', () => {
                    let isRotating = false;

                    $(sliceContainer).css('animation', 'none');

                    if (!isRotating) {
                        self.setSpinToWheel();
                        isRotating = true;

                        $(spinStartButton).addClass(startButtonDisabled);

                        setTimeout(() => {
                            if (isRotating) {
                                $(winnerPopupContainer).addClass(winnerPopupShow);

                                $(winnerPopup).append($('<div>').text(variables.selectedText).addClass(winnerText));

                                $(spinStartButton).removeClass(startButtonDisabled);

                                if (confetti) {
                                    self.getAnimationData();
                                }

                                if (isAnimation) {
                                    $(sliceContainer).css('animation', 'rotate 20s infinite linear');
                                }

                                self.deleteSelectedSlice();
                            }

                            self.calculateTextFontSize();
                        }, (rotationTime + 1) * 1000);
                    }
                });

                $(dynamicSliceButton).on('click', () => {
                    const sliceName = config.onlyLetters ? self.onlyLetters($(dynamicSliceInput).val()) :
                        $(dynamicSliceInput).val();
                    const getDummyText = $(slice).data('name');

                    if (getDummyText === 'dummy' && sliceName !== '') {
                        $(slice).remove();
                        $(spinStartButton).removeClass(classes.startButtonDisabled);
                    }

                    if (sliceName !== '') {
                        if (sliceName.includes(',')) {
                            sliceName.split(',').forEach((entity) => {
                                if (entity.trim()) {
                                    self.addSlice(entity.trim());
                                }
                            });
                        } else {
                            self.addSlice(sliceName);
                        }
                        $(dynamicSliceInput).removeClass(classes.sliceNameInputError);

                        localStorage.setItem('added-slices', JSON.stringify(variables.addedSliceNames));
                        self.calculateTextFontSize();

                        $(dynamicSliceInput).val('');

                    } else {
                        $(dynamicSliceInput).addClass(classes.sliceNameInputError);
                        $(inputError).text('Please enter a valid slice name.');
                    }

                    self.remakeSlicesWidth();
                });

                $(resetButton).on('click', () => {
                    localStorage.removeItem('added-slices');
                    localStorage.removeItem('config');

                    config = { ...defaultConfig };
                    variables.addedSliceNames = [];

                    self.init(false);
                });

                $(winnerPopupClose).on('click', () => {
                    $(winnerPopupContainer).removeClass(classes.winnerPopupShow);
                    $(selectors.winnerText).html('');
                });

                $(selectors.wrapper).on('click', (e) => {
                    if ($(e.target).hasClass(winnerPopupShow)) {
                        $(winnerPopupContainer).removeClass(winnerPopupShow);
                        $(selectors.winnerText).html('');
                    }
                });

                $(spinSettingsIcon).on('click', () => {
                    $(spinSettingsPopupContainer).toggleClass(spinSettingsShow);

                    if ($(spinSettingsPopupContainer).hasClass(spinSettingsShow)) {
                        $(sliceContainer).css('animationPlayState', 'paused');
                    } else {
                        $(sliceContainer).css('animationPlayState', 'running');
                    }
                    self.setConfigNameAtPopup();
                });
            };

            self.dynamicSliceDeleteEvent = () => {
                const { dynamicSliceTextDelete } = selectors;

                $(dynamicSliceTextDelete).on('click', (e) => {
                    self.deleteSelectedText(e.currentTarget);
                });
            };

            self.deleteSelectedText = (element) => {
                const { dynamicSliceTextContainer, slice } = selectors;

                $(dynamicSliceTextContainer).html('');

                const deletedId = $(element).parent().data('id');

                variables.addedSliceNames.sort((a, b) => a - b);

                variables.addedSliceNames =
                    variables.addedSliceNames.filter((entity) => entity.id !== deletedId);

                $(`${ slice }[data-id="${ deletedId }"]`).remove();
                $(element).parent().remove();

                localStorage.setItem('added-slices', JSON.stringify(variables.addedSliceNames));

                variables.addedSliceNames.forEach((entity, index) => {
                    const angle = (360 / variables.addedSliceNames.length) * index;

                    $(slice).eq(index).css({
                        transform: `rotate(${ angle }deg)`,
                        borderColor: `${ entity.color } transparent`,
                        borderWidth: `${ config.radius }px 
                            ${ self.calculateSliceWidth(variables.addedSliceNames.length) }px 0`,
                        transformOrigin: 'center bottom',
                    });

                    $(selectors.sliceText).eq(index).css({
                        color: self.findDarkColor(entity.color) ? '#000' : '#FFF',
                    });
                });

                if (variables.addedSliceNames.length === 0) {
                    self.createFakeSlice();
                }

                self.setSliceNameAtLists();
                self.calculateTextFontSize();
                self.remakeSlicesWidth();
                self.dynamicSliceDeleteEvent();
            };

            self.setSpinToWheel = () => {
                const { spinStopper, spinStopperContainer, sliceContainer } = selectors;
                const { stopperUp, rotateCount, rotationTime } = config;

                const calculateStoperValue = self.calculatespinStopperValue(config.stopperDirection);
                const selectorName = $(stopperUp ? spinStopper : spinStopperContainer);
                const rotationValue =  calculateStoperValue + (self.getRotationValue(selectorName));
                const fakeRotate = 360 * rotateCount;
                const randomValueForRotate = self.setRandomRotateValue();
                const calculateSliceCountRngNumber = self.getRandomNumber(1, (variables.addedSliceNames.length * 2));

                const transformValue = `rotate(${ fakeRotate + rotationValue + randomValueForRotate +
                    calculateSliceCountRngNumber }deg)`;

                $(sliceContainer).css('transition', `transform ${ rotationTime }s ease`)
                    .css('transform', transformValue);
            };

            self.getRotationValue = (element) => {
                const transform =  $(element).css('transform');
                const matrix = transform.split('(')[1].split(')')[0].split(',');
                const rotate = 360 - Math.round(Math.atan2(matrix[1], matrix[0]) * (180 / Math.PI));

                return rotate;
            };

            self.calculatespinStopperValue = (stoperName) => {
                if ((stoperName === 'top' || stoperName === 'bottom')) {
                    return config.stopperUp ? 360 : 180;
                } else if ((stoperName === 'left' || stoperName === 'right')) {
                    return config.stopperUp ? 180 : 360;
                }

                return 0;
            };

            self.getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

            self.setRandomRotateValue = () => {
                const { slice, } = selectors;

                variables.slicesRotate = [];
                variables.slicesText = [];

                variables.addedSliceNames.forEach((entity, index) => {
                    const sliceRotate = self.getRotationValue($(slice).eq(index));
                    const sliceText = entity.name;

                    variables.slicesRotate.push(sliceRotate);
                    variables.slicesText.push(sliceText);
                });

                const sliceRotate = variables.slicesRotate[Math.floor(Math.random() * variables.slicesRotate.length)];
                const selectedSliceBackground = $(slice).eq(variables.slicesRotate.indexOf(sliceRotate)).css('border-color');
                const selectedSliceTextColor = $(slice).eq(variables.slicesRotate.indexOf(sliceRotate)).find(selectors.sliceText).css('color');

                $(selectors.winnerHeader).css('background', self.rgbaToHex(selectedSliceBackground.replace('rgba(0, 0, 0, 0)', '')));
                $(selectors.winnerIcon).css('color', selectedSliceTextColor);
                $(selectors.winnerHeader).css('color', selectedSliceTextColor);
                $(selectors.winnerPopupClose).css('color', selectedSliceTextColor);

                variables.selectedText = variables.slicesText[variables.slicesRotate.indexOf(sliceRotate)];

                return sliceRotate;
            };

            self.rgbaToHex = (color) => {
                const rgba = color.match(/\d+/g);

                return `#${ ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2]))
                    .toString(16).slice(1) }`;
            };

            self.calculateTextFontSize = () => {
                const fontSize = [];

                variables.addedSliceNames.forEach((entity, index) => {
                    if (entity.name.length >= 12) {
                        fontSize.push((100 / entity.name.length) * 2.5);
                    } else {
                        fontSize.push(20);
                    }

                    $(selectors.sliceText).eq(index).css('font-size', `${ fontSize[index] }px`);
                });
            };

            self.addSlice = (sliceName) => {
                const { dynamicSliceTextContainer, dynamicWinRate } = selectors;
                const id = (variables.addedSliceNames[variables.addedSliceNames.length - 1]?.id || 0) + 1;

                $(dynamicWinRate).remove();

                $(dynamicSliceTextContainer).append($('<div>').text(`${ sliceName.toLowerCase() }`).attr('data-id', id)
                    .addClass(classes.dynamicSliceText).append($(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${ classes.icons }"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`)
                        .addClass(classes.dynamicSliceTextDelete)));

                variables.addedSliceNames.push(
                    {
                        name: sliceName.toLowerCase(),
                        id,
                        color: self.getRandomColor(),
                    }
                );

                self.generateSlices(variables.addedSliceNames.length + 1);

                $(dynamicSliceTextContainer).append($('<div>').addClass(classes.dynamicWinRate));
                $(dynamicWinRate).text(`WinRate: ${ self.calculateWinRate() }`);

                self.dynamicSliceDeleteEvent();
            };

            self.getAnimationData = () => {
                $.ajax({
                    url: 'https://gist.githubusercontent.com/EnesKabakaya1/4759c137883e6a4efefdb18108919bf3/raw/13585f9aa94441edbc103f2aea07990362b06753/gistfile1.txt',
                    method: 'GET',
                    dataType: 'json',
                    charset: 'UTF-8',
                    success(data) {
                        window.wheelOfFortuneAnimation = data;

                        self.getLottieLibrary();
                    }, error() {
                        console.error('Lottie animation data not loaded!');
                    }
                });
            };

            self.getLottieLibrary = () => {
                $.ajax({
                    url: 'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.4/lottie.min.js',
                    method: 'GET',
                    dataType: 'script',
                    charset: 'UTF-8',
                    success() {
                        window.wheelOfFortuneAnimation = window.bodymovin.loadAnimation({
                            container: $(selectors.wrapper)[0],
                            renderer: 'svg',
                            loop: true,
                            autoplay: true,
                            animationData: window.wheelOfFortuneAnimation,
                        });

                        $(selectors.wrapper).on('click', () => {
                            $(selectors.wrapper).find(`svg:not(${ selectors.icons })`).remove();
                        });
                    }, error() {
                        console.error('Lottie library not loaded!');
                    }
                });
            };

            self.calculateWinRate = () => {
                const winRate = (100 / variables.addedSliceNames.length) || 0;

                return `${ winRate.toFixed(2) }%`;
            };

            self.setSliceNameAtLists = () => {
                variables.addedSliceNames.forEach((entity) => {
                    $(selectors.dynamicSliceTextContainer).append($('<div>').text(`${ entity.name.toLowerCase() }`).attr('data-id', entity.id)
                        .addClass(classes.dynamicSliceText).append($(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${ classes.icons }"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`)
                            .addClass(classes.dynamicSliceTextDelete)));
                });

                if (variables.addedSliceNames.length > 0) {
                    $(selectors.dynamicSliceTextContainer).append($('<div>').addClass(classes.dynamicWinRate));
                    $(selectors.dynamicWinRate).text(`WinRate: ${ self.calculateWinRate() }`);
                }
            };

            self.getSlicesLocal = () => {
                const slicesTextLocal = JSON.parse(localStorage.getItem('added-slices')) || [];

                if (slicesTextLocal.length > 0) {
                    $(selectors.dynamicSliceTextContainer).html('');

                    variables.addedSliceNames = [];

                    slicesTextLocal.forEach((entity) => {
                        variables.addedSliceNames.push(entity);
                    });

                    self.setSliceNameAtLists();
                    self.calculateTextFontSize();
                    self.generateSlices(slicesTextLocal.length);
                    self.remakeSlicesWidth();
                    self.dynamicSliceDeleteEvent();
                } else {
                    self.createFakeSlice();
                }
            };

            self.createFakeSlice = () => {
                const getRandomColor = self.getRandomColor();

                $(selectors.slices).append($('<div>').attr('data-name', 'dummy').addClass(classes.slice).css({
                    borderWidth: '360px 180px 0',
                    borderColor: `${ getRandomColor } transparent`,
                    background: `${ getRandomColor }`,
                    clipPath: 'none'
                }).append($('<div>').addClass(classes.fakeSliceText).text('Please Add Person').css({
                    color: self.findDarkColor(getRandomColor) ? '#000' : '#FFF',
                    margin: '-170px 0px',
                    transform: 'translateX(-50%) rotate(0deg)',
                    fontSize: '25px',
                })));

                $(selectors.spinStartButton).addClass(classes.startButtonDisabled);
            };

            self.deleteSelectedSlice = () => {
                const { dynamicSliceTextContainer, dynamicSliceText, slice, dynamicWinRate, sliceText } = selectors;
                const selectedSlice = variables.slicesText.indexOf(variables.selectedText);

                $(dynamicSliceTextContainer).html('');

                variables.slicesText.splice(selectedSlice, 1);
                variables.slicesRotate.splice(selectedSlice, 1);
                variables.addedSliceNames.splice(selectedSlice, 1);

                localStorage.setItem('added-slices', JSON.stringify(variables.addedSliceNames));

                $(dynamicSliceText).eq(selectedSlice).remove();
                $(slice).eq(selectedSlice).remove();
                $(dynamicWinRate).text(`WinRate: ${ self.calculateWinRate() }`);

                variables.addedSliceNames.forEach((entity, index) => {
                    const angle = (360 / variables.addedSliceNames.length) * index;

                    $(slice).eq(index).css({
                        transform: `rotate(${ angle }deg)`,
                        borderColor: `${ entity.color } transparent`,
                        borderWidth: `${ config.radius }px 
                            ${ self.calculateSliceWidth(variables.addedSliceNames.length) }px 0`,
                        transformOrigin: 'center bottom',
                    });

                    $(sliceText).eq(index).css({
                        color: self.findDarkColor(entity.color) ? '#000' : '#FFF',
                    });
                });

                self.setSliceNameAtLists();
                self.remakeSlicesWidth();
                self.dynamicSliceDeleteEvent();
                self.resetSlicesRotate();

                if (variables.addedSliceNames.length === 0) {
                    self.createFakeSlice();
                }
            };

            self.resetSlicesRotate = () => {
                $(selectors.sliceContainer).css('transition', 'none').css('transform', 'rotate(0deg)');

                variables.slicesRotate.length = 0;
                variables.slicesText.length = 0;
                variables.selectedText = '';
            };

            self.setConfigNameAtPopup = () => {
                const { spinSettingsPopup } = selectors;

                $(spinSettingsPopup).html('');

                $.each(changedConfigNames, (key, value) => {
                    if (value.inputType === 'text' || value.inputType === 'number') {
                        const inputHtml =
                        `<div class="${ classes.spinSettingsPopupText }">
                            <span>${ value.label }:</span>
                            <input class="${ classes.spinSettingsPopupInput } ${ key }" type="${ value.inputType }" 
                            value="${ config[key] }">
                        </div>`;

                        $(spinSettingsPopup).append(inputHtml);
                    } else if (value.inputType === 'checkbox') {
                        const inputHtml =
                        `<div class="${ classes.spinSettingsPopupText }">
                            <span>${ value.label }:</span>
                            <label class="${ classes.checkboxSwitch }">
                                <input class="${ classes.spinSettingsPopupInput } ${ key }" type="${ value.inputType }" 
                                value="${ config[key] }" ${ config[key] ? 'checked' : '' }>
                                <span class="${ classes.checkboxForSlider } ${ classes.checkboxForRound }"></span>
                            </label>
                        </div>`;

                        $(spinSettingsPopup).append(inputHtml);
                    } else if (value.inputType === 'color') {
                        const inputHtml =
                        `<div class="${ classes.spinSettingsPopupText }">
                            <span>${ value.label }:</span>
                            <input class="${ classes.spinSettingsPopupInput } ${ key }" type="${ value.inputType }" 
                            value="${ config[key] }">
                        </div>`;

                        $(spinSettingsPopup).append(inputHtml);
                    } else if (value.inputType === 'select') {
                        const options = value.options.map((option) => {
                            const selected = config[key] === option ? 'selected' : '';
                            const addedTextSecond = value.label === 'Spin Rotation Speed' || value.label === 'Spin Animation Speed' ? 's' : '';
                            const addedTextCount = value.label === 'Spin Rotate Count' ? 'x' : '';

                            return `<option value="${ option }" ${ selected }>
                                ${ option }${ addedTextSecond }${ addedTextCount }</option>`;
                        }).join('');

                        const inputHtml =
                        `<div class="${ classes.spinSettingsPopupText }">
                            <span>${ value.label }:</span>
                            <select class="${ classes.spinSettingsPopupInput } ${ key }" type="${ value.inputType }">
                                ${ options }
                            </select>
                        </div>`;

                        $(spinSettingsPopup).append(inputHtml);
                    }
                });

                $(spinSettingsPopup).append($('<button>').text('Save').addClass(classes.spinSettingsPopupButton));
                $(spinSettingsPopup).append($('<div>').addClass(classes.spinCloseContainer).addClass(classes.spinCloseContainer)
                    .append($(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${ classes.icons }"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`).addClass(classes.spinCloseButton)));

                self.setEventsToPopup();
            };

            self.setEventsToPopup = () => {
                const { spinSettingsPopupButton, spinCloseButton, spinSettingsPopupContainer, sliceContainer,
                    spinSettingsIcon, spinSettingsPopup } = selectors;

                $(spinSettingsPopupButton).on('click', () => {
                    self.saveConfigNameAtLocal();
                });

                $(spinCloseButton).on('click', () => {
                    $(spinSettingsPopupContainer).removeClass(classes.spinSettingsShow);

                    if ($(spinSettingsPopupContainer).hasClass(classes.spinSettingsShow)) {
                        $(sliceContainer).css('animationPlayState', 'paused');
                    } else {
                        $(sliceContainer).css('animationPlayState', 'running');
                    }
                });

                $(document).on('click', (e) => {
                    if (!$(e.target).closest(spinSettingsPopup).length && !$(e.target).is(spinSettingsIcon)) {
                        $(spinSettingsPopupContainer).removeClass(classes.spinSettingsShow);
                    }

                    if ($(spinSettingsPopupContainer).hasClass(classes.spinSettingsShow)) {
                        $(sliceContainer).css('animationPlayState', 'paused');
                    } else {
                        $(sliceContainer).css('animationPlayState', 'running');
                    }
                });
            };

            self.saveConfigNameAtLocal = () => {
                const newConfig = {};

                $.each(changedConfigNames, (key, value) => {
                    const $input = $(`.${ key }`);

                    if (value.inputType === 'number') {
                        newConfig[key] = parseInt($input.val(), 10);
                    } else if (value.inputType === 'checkbox') {
                        newConfig[key] = $input.is(':checked');
                    } else if (value.inputType === 'select' && (value.label === 'Spin Rotation Speed'
                        || value.label === 'Spin Animation Speed' || value.label === 'Spin Rotate Count')) {
                        newConfig[key] = parseInt($input.val(), 10);
                    } else {
                        newConfig[key] = $input.val();
                    }
                });

                localStorage.setItem('config', JSON.stringify(newConfig));

                self.changeConfig();
            };

            self.changeConfig = () => {
                const newConfigFile = JSON.parse(localStorage.getItem('config')) || {};

                $.each(newConfigFile, (key, value) => {
                    config[key] = value;
                });

                self.init(false);
            };

            self.init(true);
        });
    })(jQuery);
}).catch((error) => {
    console.error('Script Loading Error:', error);
});
