
// Utility functions
export const toRadians = (deg: number) => (deg * Math.PI) / 180;
export const toDegrees = (rad: number) => (rad * 180) / Math.PI;

const trigFunctions: { [key: string]: (val: number) => number } = {
  sin: (rad) => Math.sin(rad),
  cos: (rad) => Math.cos(rad),
  tan: (rad) => Math.tan(rad),
  cot: (rad) => 1 / Math.tan(rad),
  sec: (rad) => 1 / Math.cos(rad),
  csc: (rad) => 1 / Math.sin(rad),
  sinh: (val) => Math.sinh(val),
  cosh: (val) => Math.cosh(val),
  tanh: (val) => Math.tanh(val),
  coth: (val) => 1 / Math.tanh(val),
  sech: (val) => 1 / Math.cosh(val),
  csch: (val) => 1 / Math.sinh(val),
};

const inverseTrigFunctions: { [key: string]: (val: number) => number } = {
  asin: (val) => Math.asin(val),
  acos: (val) => Math.acos(val),
  atan: (val) => Math.atan(val),
  acot: (val) => Math.atan(1 / val),
  asec: (val) => Math.acos(1 / val),
  acsc: (val) => Math.asin(1 / val),
};

// Unified dispatcher function
export function calculate(funcName: string, value: number, unit = "deg"): number | string {
  if (value === null || isNaN(value)) return "Invalid input";

  const isInverse = funcName.startsWith('a');
  const isHyperbolic = ['sinh', 'cosh', 'tanh', 'coth', 'sech', 'csch'].includes(funcName);

  try {
    let result: number;
    if (isInverse) {
      result = inverseTrigFunctions[funcName](value);
      if (unit === 'deg') result = toDegrees(result);
    } else {
      const angleInRadians = isHyperbolic ? value : (unit === 'deg' ? toRadians(value) : value);
      result = trigFunctions[funcName](angleInRadians);
    }

    if (isNaN(result) || !isFinite(result)) {
        return "Math error (e.g., domain issue)";
    }
    
    // Round to avoid floating point inaccuracies
    return parseFloat(result.toPrecision(15));
  } catch {
    return "Math error";
  }
}


// Right Triangle Solver
export function solveRightTriangle({ a = null, b = null, c = null, A = null, B = null }: { a?: number | null, b?: number | null, c?: number | null, A?: number | null, B?: number | null }) {
    const knownCount = [a, b, c, A, B].filter(v => v !== null).length;
    if (knownCount < 2) throw new Error("Need at least two known values");
    
    const sideCount = [a, b, c].filter(v => v !== null).length;
    if (sideCount === 0) throw new Error("Need at least one side length.");
    
    let resA = a, resB = b, resC = c, resAngleA = A, resAngleB = B;

    if (A !== null) resAngleA = toRadians(A);
    if (B !== null) resAngleB = toRadians(B);
    
    // Iteratively solve until all values are known
    for (let i=0; i<5; i++) { // Max 5 iterations to prevent infinite loops
        if (resAngleA !== null && resAngleB === null) resAngleB = Math.PI/2 - resAngleA;
        if (resAngleB !== null && resAngleA === null) resAngleA = Math.PI/2 - resAngleB;

        if (resA !== null && resB !== null && resC === null) resC = Math.sqrt(resA**2 + resB**2);
        else if (resA !== null && resC !== null && resB === null) {
             if (resC <= resA) throw new Error("Hypotenuse c must be > side a");
             resB = Math.sqrt(resC**2 - resA**2);
        }
        else if (resB !== null && resC !== null && resA === null) {
            if (resC <= resB) throw new Error("Hypotenuse c must be > side b");
            resA = Math.sqrt(resC**2 - resB**2);
        }
        else if (resAngleA !== null && resC !== null && resA === null) resA = resC * Math.sin(resAngleA);
        else if (resAngleA !== null && resC !== null && resB === null) resB = resC * Math.cos(resAngleA);
        else if (resAngleA !== null && resA !== null && resC === null) resC = resA / Math.sin(resAngleA);
        else if (resAngleA !== null && resA !== null && resB === null) resB = resA / Math.tan(resAngleA);
        else if (resAngleA !== null && resB !== null && resC === null) resC = resB / Math.cos(resAngleA);
        else if (resAngleA !== null && resB !== null && resA === null) resA = resB * Math.tan(resAngleA);
        
        if (resA !== null && resB !== null && resAngleA === null) resAngleA = Math.atan(resA / resB);
    }
    
    if ([resA, resB, resC, resAngleA, resAngleB].some(v => v === null)) {
      throw new Error("Could not solve with the given inputs.");
    }

    return { a: resA!, b: resB!, c: resC!, A: toDegrees(resAngleA!), B: toDegrees(resAngleB!), C: 90 };
}


// Non-Right Triangle Solver
export function solveObliqueTriangle({ a = null, b = null, c = null, A = null, B = null, C = null }: { a?: number | null, b?: number | null, c?: number | null, A?: number | null, B?: number | null, C?: number | null }) {
    const knownSides = [a, b, c].filter(v => v !== null && !isNaN(v)).length;
    const knownAngles = [A, B, C].filter(v => v !== null && !isNaN(v)).length;

    if (knownSides + knownAngles < 3) throw new Error("Need at least three values.");

    let resA = a, resB = b, resC = c, resAngleA = A, resAngleB = B, resAngleC = C;

    const solveAngle = (s1:number, s2:number, s3:number) => toDegrees(Math.acos((s2**2 + s3**2 - s1**2) / (2 * s2 * s3)));
    
    // SSS case
    if (knownSides === 3) {
        if (resA! + resB! <= resC! || resA! + resC! <= resB! || resB! + resC! <= resA!) throw new Error("Invalid triangle sides.");
        resAngleA = solveAngle(resA!, resB!, resC!);
        resAngleB = solveAngle(resB!, resA!, resC!);
        resAngleC = 180 - resAngleA - resAngleB;
    }
    // SAS case
    else if (resA !== null && resB !== null && resAngleC !== null) {
        resC = Math.sqrt(resA**2 + resB**2 - 2 * resA * resB * Math.cos(toRadians(resAngleC)));
        resAngleA = solveAngle(resA, resB, resC);
        resAngleB = 180 - resAngleA - resAngleC;
    } else if (resA !== null && resC !== null && resAngleB !== null) {
        resB = Math.sqrt(resA**2 + resC**2 - 2 * resA * resC * Math.cos(toRadians(resAngleB)));
        resAngleA = solveAngle(resA, resB, resC);
        resAngleC = 180 - resAngleA - resAngleB;
    } else if (resB !== null && resC !== null && resAngleA !== null) {
        resA = Math.sqrt(resB**2 + resC**2 - 2 * resB * resC * Math.cos(toRadians(resAngleA)));
        resAngleB = solveAngle(resB, resA, resC);
        resAngleC = 180 - resAngleA - resAngleB;
    }
    // ASA or AAS case
    else if (knownAngles >= 2) {
        if (resAngleA === null) resAngleA = 180 - resAngleB! - resAngleC!;
        if (resAngleB === null) resAngleB = 180 - resAngleA! - resAngleC!;
        if (resAngleC === null) resAngleC = 180 - resAngleA! - resAngleB!;

        if (resAngleA <= 0 || resAngleB <= 0 || resAngleC <= 0) throw new Error("Invalid angles.");
        
        const sinA = Math.sin(toRadians(resAngleA));
        const sinB = Math.sin(toRadians(resAngleB));
        const sinC = Math.sin(toRadians(resAngleC));
        
        if (resA !== null) {
            resB = (resA * sinB) / sinA;
            resC = (resA * sinC) / sinA;
        } else if (resB !== null) {
            resA = (resB * sinA) / sinB;
            resC = (resB * sinC) / sinB;
        } else if (resC !== null) {
            resA = (resC * sinA) / sinC;
            resB = (resC * sinB) / sinC;
        } else {
             throw new Error("Need at least one side for ASA/AAS case.");
        }
    } else {
        throw new Error("SSA case is ambiguous and not yet supported. Please provide another angle or side.");
    }

    if ([resA, resB, resC, resAngleA, resAngleB, resAngleC].some(v => v === null || isNaN(v))) {
        throw new Error("Could not solve the triangle with the given inputs.");
    }
    
    return { a: resA!, b: resB!, c: resC!, A: resAngleA!, B: resAngleB!, C: resAngleC! };
}
