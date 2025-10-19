// Utility functions
export function toRadians(deg: number) {
  return (deg * Math.PI) / 180;
}

export function toDegrees(rad: number) {
  return (rad * 180) / Math.PI;
}

export function roundResult(value: number, decimals = 10) {
  return parseFloat(value.toFixed(decimals));
}

// Basic trigonometric functions
export function sinValue(angle: number, unit = "deg") {
  const rad = unit === "deg" ? toRadians(angle) : angle;
  return roundResult(Math.sin(rad));
}
export function cosValue(angle: number, unit = "deg") {
  const rad = unit === "deg" ? toRadians(angle) : angle;
  return roundResult(Math.cos(rad));
}
export function tanValue(angle: number, unit = "deg") {
  const rad = unit === "deg" ? toRadians(angle) : angle;
  return roundResult(Math.tan(rad));
}
export function cotValue(angle: number, unit = "deg") {
  const rad = unit === "deg" ? toRadians(angle) : angle;
  return roundResult(1 / Math.tan(rad));
}
export function secValue(angle: number, unit = "deg") {
  const rad = unit === "deg" ? toRadians(angle) : angle;
  return roundResult(1 / Math.cos(rad));
}
export function cscValue(angle: number, unit = "deg") {
  const rad = unit === "deg" ? toRadians(angle) : angle;
  return roundResult(1 / Math.sin(rad));
}

// Inverse trigonometric functions
export function asinValue(x: number, unit = "deg") {
  const val = Math.asin(x);
  return unit === "deg" ? roundResult(toDegrees(val)) : roundResult(val);
}
export function acosValue(x: number, unit = "deg") {
  const val = Math.acos(x);
  return unit === "deg" ? roundResult(toDegrees(val)) : roundResult(val);
}
export function atanValue(x: number, unit = "deg") {
  const val = Math.atan(x);
  return unit === "deg" ? roundResult(toDegrees(val)) : roundResult(val);
}
export function acotValue(x: number, unit = "deg") {
  const val = Math.atan(1 / x);
  return unit === "deg" ? roundResult(toDegrees(val)) : roundResult(val);
}
export function asecValue(x: number, unit = "deg") {
  const val = Math.acos(1 / x);
  return unit === "deg" ? roundResult(toDegrees(val)) : roundResult(val);
}
export function acscValue(x: number, unit = "deg") {
  const val = Math.asin(1 / x);
  return unit === "deg" ? roundResult(toDegrees(val)) : roundResult(val);
}

// Hyperbolic functions
export function sinhValue(x: number) { return roundResult(Math.sinh(x)); }
export function coshValue(x: number) { return roundResult(Math.cosh(x)); }
export function tanhValue(x: number) { return roundResult(Math.tanh(x)); }
export function cothValue(x: number) { return roundResult(1 / Math.tanh(x)); }
export function sechValue(x: number) { return roundResult(1 / Math.cosh(x)); }
export function cschValue(x: number) { return roundResult(1 / Math.sinh(x)); }

// Unified dispatcher function
export function calculate(funcName: string, value: number, unit = "deg"): number | string {
  if (value === null || isNaN(value)) return "Invalid input";

  try {
    let result: number;
    switch (funcName) {
      // Basic
      case "sin": result = sinValue(value, unit); break;
      case "cos": result = cosValue(value, unit); break;
      case "tan": result = tanValue(value, unit); break;
      case "cot": result = cotValue(value, unit); break;
      case "sec": result = secValue(value, unit); break;
      case "csc": result = cscValue(value, unit); break;
      // Inverse
      case "asin": result = asinValue(value, unit); break;
      case "acos": result = acosValue(value, unit); break;
      case "atan": result = atanValue(value, unit); break;
      case "acot": result = acotValue(value, unit); break;
      case "asec": result = asecValue(value, unit); break;
      case "acsc": result = acscValue(value, unit); break;
      // Hyperbolic
      case "sinh": result = sinhValue(value); break;
      case "cosh": result = coshValue(value); break;
      case "tanh": result = tanhValue(value); break;
      case "coth": result = cothValue(value); break;
      case "sech": result = sechValue(value); break;
      case "csch": result = cschValue(value); break;
      default: return "Unknown function";
    }

    if (isNaN(result) || !isFinite(result)) {
        return "Math error (domain issue)";
    }
    return result;
  } catch {
    return "Math error (domain issue)";
  }
}
