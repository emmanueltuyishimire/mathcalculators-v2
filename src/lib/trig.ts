
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

// Right Triangle Solver
export function solveRightTriangle({ a = null, b = null, c = null, A = null, B = null }: { a?: number | null, b?: number | null, c?: number | null, A?: number | null, B?: number | null }) {
    const DEG = Math.PI / 180;
    let knownCount = [a, b, c, A, B].filter(v => v !== null).length;

    if (knownCount < 2) throw new Error("Need at least two known values");

    if (A) A = toRadians(A);
    if (B) B = toRadians(B);

    if (a !== null && b !== null) c = Math.sqrt(a**2 + b**2);
    else if (a !== null && c !== null) {
      if (c <= a) throw new Error("Hypotenuse c must be > side a");
      b = Math.sqrt(c**2 - a**2);
    }
    else if (b !== null && c !== null) {
       if (c <= b) throw new Error("Hypotenuse c must be > side b");
      a = Math.sqrt(c**2 - b**2);
    }
    else if (A !== null && c !== null) { a = c * Math.sin(A); b = c * Math.cos(A); }
    else if (A !== null && a !== null) { c = a / Math.sin(A); b = a / Math.tan(A); }
    else if (A !== null && b !== null) { c = b / Math.cos(A); a = b * Math.tan(A); }
    else if (B !== null && c !== null) { a = c * Math.cos(B); b = c * Math.sin(B); }
    else if (B !== null && a !== null) { c = a / Math.cos(B); b = a * Math.tan(B); }
    else if (B !== null && b !== null) { c = b / Math.sin(B); a = b / Math.tan(B); }
    
    if (a === null || b === null) throw new Error("Insufficient information to solve");
    
    A = Math.atan(a / b);
    B = Math.atan(b / a);

    return { a, b, c, A: toDegrees(A), B: toDegrees(B), C: 90 };
}


// Non-Right Triangle Solver
export function solveObliqueTriangle({ a = null, b = null, c = null, A = null, B = null, C = null }: { a?: number | null, b?: number | null, c?: number | null, A?: number | null, B?: number | null, C?: number | null }) {
    const toRad = (x: number) => x * Math.PI / 180;
    const toDeg = (x: number) => x * 180 / Math.PI;
    
    const knownSides = [a,b,c].filter(v=>v!==null).length;
    const knownAngles = [A,B,C].filter(v=>v!==null).length;

    if (knownSides + knownAngles < 3) throw new Error("Need at least three values.");

    // SSS case
    if (a !== null && b !== null && c !== null) {
        if (a+b<=c || a+c<=b || b+c<=a) throw new Error("Invalid triangle sides.");
        A = toDeg(Math.acos((b**2 + c**2 - a**2) / (2 * b * c)));
        B = toDeg(Math.acos((a**2 + c**2 - b**2) / (2 * a * c)));
        C = 180 - A - B;
    }
    // SAS case
    else if (a !== null && b !== null && C !== null) {
        c = Math.sqrt(a**2 + b**2 - 2*a*b*Math.cos(toRad(C)));
        A = toDeg(Math.asin((a * Math.sin(toRad(C))) / c));
        B = 180 - A - C;
    } else if (a !== null && c !== null && B !== null) {
        b = Math.sqrt(a**2 + c**2 - 2*a*c*Math.cos(toRad(B)));
        A = toDeg(Math.asin((a * Math.sin(toRad(B))) / b));
        C = 180 - A - B;
    } else if (b !== null && c !== null && A !== null) {
        a = Math.sqrt(b**2 + c**2 - 2*b*c*Math.cos(toRad(A)));
        B = toDeg(Math.asin((b * Math.sin(toRad(A))) / a));
        C = 180 - A - B;
    }
    // ASA or AAS case
    else if (knownAngles >= 2) {
        if(A === null) A = 180 - B! - C!;
        if(B === null) B = 180 - A! - C!;
        if(C === null) C = 180 - A! - B!;
        
        if (A<=0 || B<=0 || C<=0) throw new Error("Invalid angles.");

        const sinA = Math.sin(toRad(A));
        const sinB = Math.sin(toRad(B));
        const sinC = Math.sin(toRad(C));
        
        if (a !== null) {
            b = (a * sinB) / sinA;
            c = (a * sinC) / sinA;
        } else if (b !== null) {
            a = (b * sinA) / sinB;
            c = (b * sinC) / sinB;
        } else if (c !== null) {
            a = (c * sinA) / sinC;
            b = (c * sinB) / sinC;
        } else {
             throw new Error("Need at least one side for ASA/AAS case.");
        }
    } else {
        // SSA case - could have 0, 1, or 2 solutions. This is more complex and might not be fully supported here.
        throw new Error("SSA case is ambiguous and not fully supported. Please provide more information.");
    }
    
    if (a === null || b === null || c === null || A === null || B === null || C === null) {
        throw new Error("Could not solve the triangle with the given inputs.");
    }
    
    return { a, b, c, A, B, C };
}
