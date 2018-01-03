// action types
export const SET_STYLE = 'SET_STYLE';
export const SET_DESIGN = 'SET_DESIGN';
export const SET_DESIGN_OPTIONS = 'SET_DESIGN_OPTIONS';
export const SET_CUSTOMIZATIONS = 'SET_CUSTOMIZATIONS';

export function setStyle(id) {
  return { type: SET_STYLE, id };
}
export function setDesign(id) {
  return { type: SET_DESIGN, id };
}
export function setDesignOptions(opts) {
  return { type: SET_DESIGN_OPTIONS, opts };
}
export function setCustomizations(customizations) {
  return { type: SET_CUSTOMIZATIONS, customizations };
}
