"use client";
import {
  useRadioGroup
} from "./chunk-M7EX5CAE.js";
import {
  useFormControl
} from "./chunk-GQJ5TJHN.js";
import {
  ButtonBase_default
} from "./chunk-BGTJUWUO.js";
import "./chunk-7JQUBZSI.js";
import "./chunk-YIEACHPR.js";
import "./chunk-7EJK4MPF.js";
import {
  createChainedFunction_default,
  init_createChainedFunction
} from "./chunk-WK4TE5YM.js";
import {
  init_useControlled,
  useControlled_default
} from "./chunk-AXMVZYWE.js";
import {
  createSvgIcon,
  init_createSvgIcon
} from "./chunk-DZQ5EJ7U.js";
import "./chunk-IWP4ZWWC.js";
import "./chunk-4KQMGOGH.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-P35UWOYP.js";
import {
  init_styled,
  init_useThemeProps,
  rootShouldForwardProp_default,
  styled_default,
  useThemeProps
} from "./chunk-2KT6KIUA.js";
import {
  init_refType,
  refType_default
} from "./chunk-HOFSDQWW.js";
import "./chunk-3DZOB6CP.js";
import "./chunk-LZCEWLPT.js";
import {
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_clsx,
  init_composeClasses,
  init_generateUtilityClass,
  init_generateUtilityClasses,
  require_colorManipulator,
  require_jsx_runtime
} from "./chunk-DDVI4AIE.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  init_extends,
  init_objectWithoutPropertiesLoose,
  require_prop_types
} from "./chunk-PL5Z63M3.js";
import {
  __toESM,
  require_react
} from "./chunk-6EPYQA3G.js";

// node_modules/@mui/material/Radio/Radio.js
init_objectWithoutPropertiesLoose();
init_extends();
var React5 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());
init_clsx();
init_refType();
init_composeClasses();
var import_colorManipulator = __toESM(require_colorManipulator());

// node_modules/@mui/material/internal/SwitchBase.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_refType();
init_composeClasses();
init_capitalize();
init_styled();
init_useControlled();

// node_modules/@mui/material/internal/switchBaseClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getSwitchBaseUtilityClass(slot) {
  return generateUtilityClass("PrivateSwitchBase", slot);
}
var switchBaseClasses = generateUtilityClasses("PrivateSwitchBase", ["root", "checked", "disabled", "input", "edgeStart", "edgeEnd"]);

// node_modules/@mui/material/internal/SwitchBase.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded = ["autoFocus", "checked", "checkedIcon", "className", "defaultChecked", "disabled", "disableFocusRipple", "edge", "icon", "id", "inputProps", "inputRef", "name", "onBlur", "onChange", "onFocus", "readOnly", "required", "tabIndex", "type", "value"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    checked,
    disabled,
    edge
  } = ownerState;
  const slots = {
    root: ["root", checked && "checked", disabled && "disabled", edge && `edge${capitalize_default(edge)}`],
    input: ["input"]
  };
  return composeClasses(slots, getSwitchBaseUtilityClass, classes);
};
var SwitchBaseRoot = styled_default(ButtonBase_default)(({
  ownerState
}) => _extends({
  padding: 9,
  borderRadius: "50%"
}, ownerState.edge === "start" && {
  marginLeft: ownerState.size === "small" ? -3 : -12
}, ownerState.edge === "end" && {
  marginRight: ownerState.size === "small" ? -3 : -12
}));
var SwitchBaseInput = styled_default("input", {
  shouldForwardProp: rootShouldForwardProp_default
})({
  cursor: "inherit",
  position: "absolute",
  opacity: 0,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1
});
var SwitchBase = React.forwardRef(function SwitchBase2(props, ref) {
  const {
    autoFocus,
    checked: checkedProp,
    checkedIcon,
    className,
    defaultChecked,
    disabled: disabledProp,
    disableFocusRipple = false,
    edge = false,
    icon,
    id,
    inputProps,
    inputRef,
    name,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    required = false,
    tabIndex,
    type,
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const [checked, setCheckedState] = useControlled_default({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "SwitchBase",
    state: "checked"
  });
  const muiFormControl = useFormControl();
  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };
  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };
  const handleInputChange = (event) => {
    if (event.nativeEvent.defaultPrevented) {
      return;
    }
    const newChecked = event.target.checked;
    setCheckedState(newChecked);
    if (onChange) {
      onChange(event, newChecked);
    }
  };
  let disabled = disabledProp;
  if (muiFormControl) {
    if (typeof disabled === "undefined") {
      disabled = muiFormControl.disabled;
    }
  }
  const hasLabelFor = type === "checkbox" || type === "radio";
  const ownerState = _extends({}, props, {
    checked,
    disabled,
    disableFocusRipple,
    edge
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime2.jsxs)(SwitchBaseRoot, _extends({
    component: "span",
    className: clsx_default(classes.root, className),
    centerRipple: true,
    focusRipple: !disableFocusRipple,
    disabled,
    tabIndex: null,
    role: void 0,
    onFocus: handleFocus,
    onBlur: handleBlur,
    ownerState,
    ref
  }, other, {
    children: [(0, import_jsx_runtime.jsx)(SwitchBaseInput, _extends({
      autoFocus,
      checked: checkedProp,
      defaultChecked,
      className: classes.input,
      disabled,
      id: hasLabelFor ? id : void 0,
      name,
      onChange: handleInputChange,
      readOnly,
      ref: inputRef,
      required,
      ownerState,
      tabIndex,
      type
    }, type === "checkbox" && value === void 0 ? {} : {
      value
    }, inputProps)), checked ? checkedIcon : icon]
  }));
});
true ? SwitchBase.propTypes = {
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: import_prop_types.default.bool,
  /**
   * If `true`, the component is checked.
   */
  checked: import_prop_types.default.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: import_prop_types.default.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * @ignore
   */
  defaultChecked: import_prop_types.default.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: import_prop_types.default.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: import_prop_types.default.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: import_prop_types.default.oneOf(["end", "start", false]),
  /**
   * The icon to display when the component is unchecked.
   */
  icon: import_prop_types.default.node.isRequired,
  /**
   * The id of the `input` element.
   */
  id: import_prop_types.default.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: import_prop_types.default.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType_default,
  /*
   * @ignore
   */
  name: import_prop_types.default.string,
  /**
   * @ignore
   */
  onBlur: import_prop_types.default.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: import_prop_types.default.func,
  /**
   * @ignore
   */
  onFocus: import_prop_types.default.func,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: import_prop_types.default.bool,
  /**
   * If `true`, the `input` element is required.
   */
  required: import_prop_types.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.object,
  /**
   * @ignore
   */
  tabIndex: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
  /**
   * The input component prop `type`.
   */
  type: import_prop_types.default.string.isRequired,
  /**
   * The value of the component.
   */
  value: import_prop_types.default.any
} : void 0;
var SwitchBase_default = SwitchBase;

// node_modules/@mui/material/Radio/Radio.js
init_useThemeProps();

// node_modules/@mui/material/Radio/RadioButtonIcon.js
init_extends();
var React4 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());

// node_modules/@mui/material/internal/svg-icons/RadioButtonUnchecked.js
var React2 = __toESM(require_react());
init_createSvgIcon();
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var RadioButtonUnchecked_default = createSvgIcon((0, import_jsx_runtime3.jsx)("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), "RadioButtonUnchecked");

// node_modules/@mui/material/internal/svg-icons/RadioButtonChecked.js
var React3 = __toESM(require_react());
init_createSvgIcon();
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var RadioButtonChecked_default = createSvgIcon((0, import_jsx_runtime4.jsx)("path", {
  d: "M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"
}), "RadioButtonChecked");

// node_modules/@mui/material/Radio/RadioButtonIcon.js
init_styled();
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var RadioButtonIconRoot = styled_default("span", {
  shouldForwardProp: rootShouldForwardProp_default
})({
  position: "relative",
  display: "flex"
});
var RadioButtonIconBackground = styled_default(RadioButtonUnchecked_default)({
  // Scale applied to prevent dot misalignment in Safari
  transform: "scale(1)"
});
var RadioButtonIconDot = styled_default(RadioButtonChecked_default)(({
  theme,
  ownerState
}) => _extends({
  left: 0,
  position: "absolute",
  transform: "scale(0)",
  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.shortest
  })
}, ownerState.checked && {
  transform: "scale(1)",
  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.shortest
  })
}));
function RadioButtonIcon(props) {
  const {
    checked = false,
    classes = {},
    fontSize
  } = props;
  const ownerState = _extends({}, props, {
    checked
  });
  return (0, import_jsx_runtime6.jsxs)(RadioButtonIconRoot, {
    className: classes.root,
    ownerState,
    children: [(0, import_jsx_runtime5.jsx)(RadioButtonIconBackground, {
      fontSize,
      className: classes.background,
      ownerState
    }), (0, import_jsx_runtime5.jsx)(RadioButtonIconDot, {
      fontSize,
      className: classes.dot,
      ownerState
    })]
  });
}
true ? RadioButtonIcon.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: import_prop_types2.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types2.default.object,
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   */
  fontSize: import_prop_types2.default.oneOf(["small", "medium"])
} : void 0;
var RadioButtonIcon_default = RadioButtonIcon;

// node_modules/@mui/material/Radio/Radio.js
init_capitalize();
init_createChainedFunction();

// node_modules/@mui/material/Radio/radioClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getRadioUtilityClass(slot) {
  return generateUtilityClass("MuiRadio", slot);
}
var radioClasses = generateUtilityClasses("MuiRadio", ["root", "checked", "disabled", "colorPrimary", "colorSecondary", "sizeSmall"]);
var radioClasses_default = radioClasses;

// node_modules/@mui/material/Radio/Radio.js
init_styled();
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var _excluded2 = ["checked", "checkedIcon", "color", "icon", "name", "onChange", "size", "className"];
var useUtilityClasses2 = (ownerState) => {
  const {
    classes,
    color,
    size
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize_default(color)}`, size !== "medium" && `size${capitalize_default(size)}`]
  };
  return _extends({}, classes, composeClasses(slots, getRadioUtilityClass, classes));
};
var RadioRoot = styled_default(SwitchBase_default, {
  shouldForwardProp: (prop) => rootShouldForwardProp_default(prop) || prop === "classes",
  name: "MuiRadio",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.size !== "medium" && styles[`size${capitalize_default(ownerState.size)}`], styles[`color${capitalize_default(ownerState.color)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  color: (theme.vars || theme).palette.text.secondary
}, !ownerState.disableRipple && {
  "&:hover": {
    backgroundColor: theme.vars ? `rgba(${ownerState.color === "default" ? theme.vars.palette.action.activeChannel : theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : (0, import_colorManipulator.alpha)(ownerState.color === "default" ? theme.palette.action.active : theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, ownerState.color !== "default" && {
  [`&.${radioClasses_default.checked}`]: {
    color: (theme.vars || theme).palette[ownerState.color].main
  }
}, {
  [`&.${radioClasses_default.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled
  }
}));
function areEqualValues(a, b) {
  if (typeof b === "object" && b !== null) {
    return a === b;
  }
  return String(a) === String(b);
}
var defaultCheckedIcon = (0, import_jsx_runtime7.jsx)(RadioButtonIcon_default, {
  checked: true
});
var defaultIcon = (0, import_jsx_runtime7.jsx)(RadioButtonIcon_default, {});
var Radio = React5.forwardRef(function Radio2(inProps, ref) {
  var _defaultIcon$props$fo, _defaultCheckedIcon$p;
  const props = useThemeProps({
    props: inProps,
    name: "MuiRadio"
  });
  const {
    checked: checkedProp,
    checkedIcon = defaultCheckedIcon,
    color = "primary",
    icon = defaultIcon,
    name: nameProp,
    onChange: onChangeProp,
    size = "medium",
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const ownerState = _extends({}, props, {
    color,
    size
  });
  const classes = useUtilityClasses2(ownerState);
  const radioGroup = useRadioGroup();
  let checked = checkedProp;
  const onChange = createChainedFunction_default(onChangeProp, radioGroup && radioGroup.onChange);
  let name = nameProp;
  if (radioGroup) {
    if (typeof checked === "undefined") {
      checked = areEqualValues(radioGroup.value, props.value);
    }
    if (typeof name === "undefined") {
      name = radioGroup.name;
    }
  }
  return (0, import_jsx_runtime7.jsx)(RadioRoot, _extends({
    type: "radio",
    icon: React5.cloneElement(icon, {
      fontSize: (_defaultIcon$props$fo = defaultIcon.props.fontSize) != null ? _defaultIcon$props$fo : size
    }),
    checkedIcon: React5.cloneElement(checkedIcon, {
      fontSize: (_defaultCheckedIcon$p = defaultCheckedIcon.props.fontSize) != null ? _defaultCheckedIcon$p : size
    }),
    ownerState,
    classes,
    name,
    checked,
    onChange,
    ref,
    className: clsx_default(classes.root, className)
  }, other));
});
true ? Radio.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: import_prop_types3.default.bool,
  /**
   * The icon to display when the component is checked.
   * @default <RadioButtonIcon checked />
   */
  checkedIcon: import_prop_types3.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types3.default.object,
  /**
   * @ignore
   */
  className: import_prop_types3.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: import_prop_types3.default.oneOfType([import_prop_types3.default.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types3.default.string]),
  /**
   * If `true`, the component is disabled.
   */
  disabled: import_prop_types3.default.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: import_prop_types3.default.bool,
  /**
   * The icon to display when the component is unchecked.
   * @default <RadioButtonIcon />
   */
  icon: import_prop_types3.default.node,
  /**
   * The id of the `input` element.
   */
  id: import_prop_types3.default.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: import_prop_types3.default.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType_default,
  /**
   * Name attribute of the `input` element.
   */
  name: import_prop_types3.default.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: import_prop_types3.default.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: import_prop_types3.default.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   * @default 'medium'
   */
  size: import_prop_types3.default.oneOfType([import_prop_types3.default.oneOf(["medium", "small"]), import_prop_types3.default.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types3.default.oneOfType([import_prop_types3.default.arrayOf(import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object, import_prop_types3.default.bool])), import_prop_types3.default.func, import_prop_types3.default.object]),
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: import_prop_types3.default.any
} : void 0;
var Radio_default = Radio;
export {
  Radio_default as default,
  getRadioUtilityClass,
  radioClasses_default as radioClasses
};
//# sourceMappingURL=@mui_material_Radio.js.map
