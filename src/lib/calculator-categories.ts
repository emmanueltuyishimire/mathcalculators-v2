
import { Calculator, FunctionSquare, BarChartHorizontal, FlaskConical, Square, Table, Type, Sigma, Replace, Star, TrendingUp, Move3d, Triangle, Divide, Percent, Shuffle, AlertTriangle, Superscript, Binary, Code, Atom, Proportions, Radical, Gavel, Hand, CheckCircle, InfinityIcon, Waves, Volume, ShieldCheck, Milestone, Circle } from 'lucide-react';

export const calculatorCategories = [
    {
        title: "Basic & Algebra Calculators",
        slug: "basic-algebra",
        tools: [
            { href: '/algebra', label: 'Algebra Calculator', icon: Type },
            { href: '/basic', label: 'Basic Calculator', icon: Calculator },
            { href: '/scientific', label: 'Scientific Calculator', icon: FlaskConical },
            { href: '/fraction', label: 'Fraction Calculator', icon: Divide },
            { href: '/percentage', label: 'Percentage Calculator', icon: Percent },
            { href: '/exponent', label: 'Exponent Calculator', icon: Superscript },
            { href: '/log', label: 'Logarithm Calculator', icon: FunctionSquare },
            { href: '/root', label: 'Root Calculator', icon: Radical },
            { href: '/rounding', label: 'Rounding Calculator', icon: CheckCircle },
            { href: '/factor', label: 'Factor Calculator', icon: Gavel },
            { href: '/gcf', label: 'GCF Calculator', icon: Hand },
            { href: '/lcm', label: 'LCM Calculator', icon: Proportions },
            { href: '/binary', label: 'Binary Calculator', icon: Binary },
            { href: '/hex', label: 'Hexadecimal Calculator', icon: Code },
            { href: '/big-number', label: 'Big Number Calculator', icon: InfinityIcon },
        ]
    },
    {
        title: "Geometry & Trigonometry Calculators",
        slug: "geometry-trigonometry",
        tools: [
            { href: '/geometry', label: 'Geometry Calculator', icon: Square },
            { href: '/pythagorean', label: 'Pythagorean Theorem Calculator', icon: Sigma },
            { href: '/right-triangle', label: 'Right Triangle Calculator', icon: Triangle },
            { href: '/slope', label: 'Slope Calculator', icon: TrendingUp },
            { href: '/distance', label: 'Distance Calculator', icon: Move3d },
            { href: '/geometry/area', label: 'Area Calculator', icon: Square },
            { href: '/geometry/volume', label: 'Volume Calculator', icon: Volume },
            { href: '/geometry/surface-area', label: 'Surface Area Calculator', icon: Waves },
            { href: '/geometry/circle', label: 'Circle Calculator', icon: Circle },
        ]
    },
    {
        title: "Statistics & Probability Calculators",
        slug: "statistics-probability",
        tools: [
            { href: '/statistics', label: 'Statistics Calculator', icon: BarChartHorizontal },
            { href: '/statistics/mean-median-mode', label: 'Mean, Median, Mode Calculator', icon: BarChartHorizontal },
            { href: '/statistics/standard-deviation', label: 'Standard Deviation Calculator', icon: Sigma },
            { href: '/statistics/sample-size', label: 'Sample Size Calculator', icon: Percent },
            { href: '/statistics/probability', label: 'Probability Calculator', icon: Percent },
            { href: '/statistics/permutation-combination', label: 'Permutation & Combination Calculator', icon: FunctionSquare },
            { href: '/statistics/z-score', label: 'Z-Score Calculator', icon: Sigma },
            { href: '/statistics/confidence-interval', label: 'Confidence Interval Calculator', icon: ShieldCheck },
            { href: '/statistics/sequences', label: 'Sequence Calculator', icon: Milestone },
            { href: '/random', label: 'Random Number Generator', icon: Shuffle },
        ]
    },
    {
        title: "Advanced & Specialty Calculators",
        slug: "advanced-specialty",
        tools: [
            { href: '/calculus', label: 'Calculus Calculator', icon: Sigma },
            { href: '/matrix', label: 'Matrix Calculator', icon: Table },
            { href: '/rref', label: 'RREF Calculator', icon: Sigma },
            { href: '/desmos-matrix', label: 'Desmos Matrix Calculator', icon: Table },
            { href: '/diagonalize-matrix', label: 'Diagonalize Matrix Calculator', icon: Table },
            { href: '/half-life', label: 'Half-Life Calculator', icon: Atom },
            { href: '/percent-error', label: 'Percent Error Calculator', icon: AlertTriangle },
            { href: '/ratio', label: 'Ratio Calculator', icon: Proportions },
            { href: '/destiny-matrix', label: 'Destiny Matrix Calculator', icon: Star },
            { href: '/unit-converter', label: 'Unit Converter', icon: Replace },
        ]
    }
];

export const findCategory = (pathname: string) => {
    for (const category of calculatorCategories) {
        if (category.tools.some(tool => pathname.startsWith(tool.href) && tool.href !== '/')) {
            // Special handling for nested routes like /geometry/area
            if (pathname.includes(tool.href)) {
                 return category;
            }
        }
    }
    return null;
};
