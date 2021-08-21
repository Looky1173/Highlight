import { ArrowLeft, ArrowRight } from './keys';
import { match } from './match';

export const getNextIndex = (key, index, arrayLength) => {
	if (match(key, ArrowRight)) {
		return (index + 1) % arrayLength;
	}
	if (match(key, ArrowLeft)) {
		return (index + arrayLength - 1) % arrayLength;
	}
};

export const selectorTabbable = `
  a[href], area[href], input:not([disabled]):not([tabindex='-1']),
  button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']),
  textarea:not([disabled]):not([tabindex='-1']),
  iframe, object, embed, *[tabindex]:not([tabindex='-1']):not([disabled]), *[contenteditable=true]
`;

export const selectorFocusable = `
  a[href], area[href], input:not([disabled]),
  button:not([disabled]),select:not([disabled]),
  textarea:not([disabled]),
  iframe, object, embed, *[tabindex]:not([disabled]), *[contenteditable=true]
`;
