
"use client";

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function AlgebraGuidePage() {
    return (
        <div className="flex flex-1 flex-col">
            <PageHeader title="Algebra Calculator User Guide" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="mx-auto max-w-4xl space-y-8">
                    <section className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                            User Guide: How to Use the Algebra Calculator
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Welcome to the Algebra Calculator — a smart tool that lets you simplify, solve, and analyze algebraic expressions step-by-step.
                        </p>
                    </section>

                    <Card>
                        <CardHeader>
                            <CardTitle>🧮 1. Getting Started</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <h3 className="font-semibold text-lg">▶️ Turning On and Resetting</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                <li>Press <kbd className="font-mono bg-muted p-1 rounded-md">ON</kbd> to power up the calculator.</li>
                                <li>Press <kbd className="font-mono bg-muted p-1 rounded-md">AC</kbd> to clear all input and reset the calculator.</li>
                                <li>Use <kbd className="font-mono bg-muted p-1 rounded-md">DEL</kbd> to delete the last character entered.</li>
                            </ul>
                            <h3 className="font-semibold text-lg">⚙️ Setting Up</h3>
                             <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                <li>Press <kbd className="font-mono bg-muted p-1 rounded-md">MODE</kbd> to select: ALG, EQU, FUNC, etc.</li>
                                <li>Use <kbd className="font-mono bg-muted p-1 rounded-md">SHIFT</kbd> + <kbd className="font-mono bg-muted p-1 rounded-md">MODE</kbd> (SETUP) to adjust angle units, display format, and more.</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>🔢 2. Entering Numbers and Variables</CardTitle></CardHeader>
                        <CardContent className="space-y-2 text-muted-foreground">
                            <p>Use number keys <kbd className="font-mono bg-muted p-1 rounded-md">0-9</kbd> to type numbers.</p>
                            <p>Use <kbd className="font-mono bg-muted p-1 rounded-md">x</kbd>, <kbd className="font-mono bg-muted p-1 rounded-md">y</kbd>, or <kbd className="font-mono bg-muted p-1 rounded-md">z</kbd> for variables.</p>
                            <p>For powers, press <kbd className="font-mono bg-muted p-1 rounded-md">xʸ</kbd>, then enter the exponent. Example: To type x², press x, then x².</p>
                            <p className="mt-2 p-2 bg-muted rounded-md font-semibold">🧠 Tip: You can enter full algebraic expressions like <code className="font-mono">(x + 2)(x - 3)</code> using parentheses to ensure the correct order of operations.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>➕ 3. Performing Basic Algebra</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold">✳️ Simplifying Expressions</h3>
                                <p className="text-muted-foreground">Enter your expression: <code className="font-mono bg-muted p-1 rounded-md">2x + 3x - 4</code> → Press <kbd className="font-mono bg-muted p-1 rounded-md">SIMPLIFY</kbd> → Result: <code className="font-mono bg-muted p-1 rounded-md">5x - 4</code></p>
                            </div>
                            <div>
                                <h3 className="font-semibold">🔄 Expanding Brackets</h3>
                                <p className="text-muted-foreground">Enter <code className="font-mono bg-muted p-1 rounded-md">(x + 2)(x + 3)</code> → Press <kbd className="font-mono bg-muted p-1 rounded-md">EXPAND</kbd> → Result: <code className="font-mono bg-muted p-1 rounded-md">x² + 5x + 6</code></p>
                            </div>
                             <div>
                                <h3 className="font-semibold">🧩 Factoring Polynomials</h3>
                                <p className="text-muted-foreground">Enter <code className="font-mono bg-muted p-1 rounded-md">x² + 5x + 6</code> → Press <kbd className="font-mono bg-muted p-1 rounded-md">FACTOR</kbd> → Result: <code className="font-mono bg-muted p-1 rounded-md">(x + 2)(x + 3)</code></p>
                            </div>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader><CardTitle>🧠 4. Solving Equations</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                             <div>
                                <h3 className="font-semibold">🔹 Linear or Polynomial Equations</h3>
                                <p className="text-muted-foreground">Enter the equation: <code className="font-mono bg-muted p-1 rounded-md">3x + 5 = 14</code> → Press <kbd className="font-mono bg-muted p-1 rounded-md">SOLVE</kbd> → Result: <code className="font-mono bg-muted p-1 rounded-md">x = 3</code></p>
                            </div>
                             <div>
                                <h3 className="font-semibold">🔹 Quadratic Equations</h3>
                                <p className="text-muted-foreground">Enter <code className="font-mono bg-muted p-1 rounded-md">x² + 5x + 6 = 0</code> → Press <kbd className="font-mono bg-muted p-1 rounded-md">SOLVE(x)</kbd> → Result: <code className="font-mono bg-muted p-1 rounded-md">x = -2 or x = -3</code></p>
                            </div>
                            <p className="p-2 bg-muted rounded-md font-semibold">🧠 Tip: Use parentheses to avoid input errors, e.g. <code className="font-mono">(x + 2)(x + 3) = 0</code>.</p>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader><CardTitle>🔁 5. Substitution and Evaluation</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                             <div>
                                <h3 className="font-semibold">🔸 Substituting a Value</h3>
                                <p className="text-muted-foreground">Enter expression: <code className="font-mono bg-muted p-1 rounded-md">x² + 3x</code> → Press <kbd className="font-mono bg-muted p-1 rounded-md">SUBS</kbd> → Enter <code className="font-mono bg-muted p-1 rounded-md">x = 4</code> → Result: <code className="font-mono bg-muted p-1 rounded-md">28</code></p>
                            </div>
                             <div>
                                <h3 className="font-semibold">🔸 Using Stored Values</h3>
                                <p className="text-muted-foreground">Store a value: <code className="font-mono bg-muted p-1 rounded-md">5 STO A</code> → saves 5 into variable A. Use it later: <code className="font-mono bg-muted p-1 rounded-md">2A + 3</code> → evaluates to 13</p>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader><CardTitle>💡 10. Useful Examples</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                                <p className="font-semibold">Task</p>
                                <p className="font-semibold">Input</p>
                                <p className="font-semibold">Result</p>
                            </div>
                            <Separator/>
                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm items-center">
                                <p>Simplify</p><p><code className="font-mono bg-muted p-1 rounded-md">3x + 5x - 2</code></p><p><code className="font-mono bg-muted p-1 rounded-md">8x - 2</code></p>
                                <p>Expand</p><p><code className="font-mono bg-muted p-1 rounded-md">(x + 1)²</code></p><p><code className="font-mono bg-muted p-1 rounded-md">x² + 2x + 1</code></p>
                                <p>Factor</p><p><code className="font-mono bg-muted p-1 rounded-md">x² - 9</code></p><p><code className="font-mono bg-muted p-1 rounded-md">(x - 3)(x + 3)</code></p>
                                <p>Solve</p><p><code className="font-mono bg-muted p-1 rounded-md">x² - 5x + 6 = 0</code></p><p><code className="font-mono bg-muted p-1 rounded-md">x = 2, 3</code></p>
                                <p>Substitute</p><p><code className="font-mono bg-muted p-1 rounded-md">x² + 2x, x=3</code></p><p><code className="font-mono bg-muted p-1 rounded-md">15</code></p>
                                <p>Derivative</p><p><code className="font-mono bg-muted p-1 rounded-md">d/dx(x³)</code></p><p><code className="font-mono bg-muted p-1 rounded-md">3x²</code></p>
                                <p>Integral</p><p><code className="font-mono bg-muted p-1 rounded-md">∫2x dx</code></p><p><code className="font-mono bg-muted p-1 rounded-md">x² + C</code></p>
                             </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>⚙️ 11. Tips for Effective Use</CardTitle></CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>✅ Always use parentheses when entering complex expressions.</li>
                                <li>✅ Press SIMPLIFY before solving to avoid syntax errors.</li>
                                <li>✅ Use ALPHA to input variable names.</li>
                                <li>✅ Save frequent expressions using STO.</li>
                                <li>✅ For decimals or fractions, toggle display mode in SETUP.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

