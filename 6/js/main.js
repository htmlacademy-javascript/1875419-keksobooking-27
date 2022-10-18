import {generateObjects, OBJECTS_TO_GENERATE} from './generate-objects.js';
import {generateMarkup, popupMap} from './popup.js';

const obj = generateObjects(OBJECTS_TO_GENERATE);
const markup = generateMarkup(obj[0]);
popupMap.appendChild(markup);
