import {
  init_utils
} from "./chunk-HOFSDQWW.js";
import {
  useForkRef
} from "./chunk-3DZOB6CP.js";
import {
  clsx_default,
  init_clsx,
  require_jsx_runtime
} from "./chunk-DDVI4AIE.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  init_extends,
  init_objectWithoutPropertiesLoose
} from "./chunk-PL5Z63M3.js";
import {
  __toESM,
  require_react
} from "./chunk-6EPYQA3G.js";

// node_modules/@mui/base/utils/appendOwnerState.js
init_extends();

// node_modules/@mui/base/utils/isHostComponent.js
function isHostComponent(element) {
  return typeof element === "string";
}

// node_modules/@mui/base/utils/appendOwnerState.js
function appendOwnerState(elementType, otherProps, ownerState) {
  if (elementType === void 0 || isHostComponent(elementType)) {
    return otherProps;
  }
  return _extends({}, otherProps, {
    ownerState: _extends({}, otherProps.ownerState, ownerState)
  });
}

// node_modules/@mui/base/utils/useSlotProps.js
init_extends();
init_objectWithoutPropertiesLoose();
init_utils();

// node_modules/@mui/base/utils/mergeSlotProps.js
init_extends();
init_clsx();

// node_modules/@mui/base/utils/extractEventHandlers.js
function extractEventHandlers(object, excludeKeys = []) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}

// node_modules/@mui/base/utils/omitEventHandlers.js
function omitEventHandlers(object) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === "function")).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}

// node_modules/@mui/base/utils/mergeSlotProps.js
function mergeSlotProps(parameters) {
  const {
    getSlotProps,
    additionalProps,
    externalSlotProps,
    externalForwardedProps,
    className
  } = parameters;
  if (!getSlotProps) {
    const joinedClasses2 = clsx_default(additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
    const mergedStyle2 = _extends({}, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
    const props2 = _extends({}, additionalProps, externalForwardedProps, externalSlotProps);
    if (joinedClasses2.length > 0) {
      props2.className = joinedClasses2;
    }
    if (Object.keys(mergedStyle2).length > 0) {
      props2.style = mergedStyle2;
    }
    return {
      props: props2,
      internalRef: void 0
    };
  }
  const eventHandlers = extractEventHandlers(_extends({}, externalForwardedProps, externalSlotProps));
  const componentsPropsWithoutEventHandlers = omitEventHandlers(externalSlotProps);
  const otherPropsWithoutEventHandlers = omitEventHandlers(externalForwardedProps);
  const internalSlotProps = getSlotProps(eventHandlers);
  const joinedClasses = clsx_default(internalSlotProps == null ? void 0 : internalSlotProps.className, additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
  const mergedStyle = _extends({}, internalSlotProps == null ? void 0 : internalSlotProps.style, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
  const props = _extends({}, internalSlotProps, additionalProps, otherPropsWithoutEventHandlers, componentsPropsWithoutEventHandlers);
  if (joinedClasses.length > 0) {
    props.className = joinedClasses;
  }
  if (Object.keys(mergedStyle).length > 0) {
    props.style = mergedStyle;
  }
  return {
    props,
    internalRef: internalSlotProps.ref
  };
}

// node_modules/@mui/base/utils/resolveComponentProps.js
function resolveComponentProps(componentProps, ownerState, slotState) {
  if (typeof componentProps === "function") {
    return componentProps(ownerState, slotState);
  }
  return componentProps;
}

// node_modules/@mui/base/utils/useSlotProps.js
var _excluded = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function useSlotProps(parameters) {
  var _parameters$additiona;
  const {
    elementType,
    externalSlotProps,
    ownerState,
    skipResolvingSlotProps = false
  } = parameters, rest = _objectWithoutPropertiesLoose(parameters, _excluded);
  const resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps(externalSlotProps, ownerState);
  const {
    props: mergedProps,
    internalRef
  } = mergeSlotProps(_extends({}, rest, {
    externalSlotProps: resolvedComponentsProps
  }));
  const ref = useForkRef(internalRef, resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, (_parameters$additiona = parameters.additionalProps) == null ? void 0 : _parameters$additiona.ref);
  const props = appendOwnerState(elementType, _extends({}, mergedProps, {
    ref
  }), ownerState);
  return props;
}

// node_modules/@mui/base/utils/ClassNameConfigurator.js
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var defaultContextValue = {
  disableDefaultClasses: false
};
var ClassNameConfiguratorContext = React.createContext(defaultContextValue);
if (true) {
  ClassNameConfiguratorContext.displayName = "ClassNameConfiguratorContext";
}
function useClassNamesOverride(generateUtilityClass) {
  const {
    disableDefaultClasses
  } = React.useContext(ClassNameConfiguratorContext);
  return (slot) => {
    if (disableDefaultClasses) {
      return "";
    }
    return generateUtilityClass(slot);
  };
}

// node_modules/@mui/base/utils/useRootElementName.js
var React2 = __toESM(require_react());

// node_modules/@mui/base/utils/prepareForSlot.js
init_extends();
init_objectWithoutPropertiesLoose();
var React3 = __toESM(require_react());

export {
  appendOwnerState,
  useClassNamesOverride,
  extractEventHandlers,
  resolveComponentProps,
  mergeSlotProps,
  useSlotProps
};
//# sourceMappingURL=chunk-YNO26Z6L.js.map
