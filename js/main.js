import {generateObjects, OBJECTS_TO_GENERATE} from './generate-objects.js';
import {generateMarkup, popupMap} from './popup.js';
import { turnActiveMode, turnInactiveMode } from './form.js';
import './validation.js';

const obj = generateObjects(OBJECTS_TO_GENERATE);
const markup = generateMarkup(obj[0]);
popupMap.appendChild(markup);

turnInactiveMode();
turnActiveMode();
