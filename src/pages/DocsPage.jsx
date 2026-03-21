import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Zap, BarChart2, FileText, FlaskConical, Layers, ChevronRight, Search, ExternalLink } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import SEO from '../components/common/SEO';

const sidebar = [
    {
        section: 'Getting Started',
        items: [
            { id: 'intro', label: 'What is Hyperplott?' },
            { id: 'quickstart', label: 'Quick Start Guide' },
            { id: 'first-design', label: 'Your First Design' },
        ]
    },
    {
        section: 'Design Types',
        items: [
            { id: 'factorial', label: 'Factorial Designs' },
            { id: 'rsm', label: 'Response Surface (RSM)' },
        ]
    },
    {
        section: 'Analysis',
        items: [
            { id: 'anova', label: 'Understanding ANOVA' },
            { id: 'regression', label: 'Regression Models' },
            { id: 'plots', label: 'Interpreting Plots' },
        ]
    },
    {
        section: 'Export & Reports',
        items: [
            { id: 'pdf', label: 'PDF Reports' },
            { id: 'excel', label: 'Excel / CSV Export' },
            { id: 'word', label: 'Word / DOCX Export' },
        ]
    },
];

const docs = {
    intro: {
        title: 'What is Hyperplott?',
        content: `Hyperplott is an AI-powered Design of Experiments (DoE) platform that helps researchers, scientists, and students run better experiments with less effort.

**Design of Experiments (DoE)** is a systematic methodology for planning experiments to understand how different input factors affect an output response. Instead of testing one variable at a time (OFAT), DoE lets you study multiple factors simultaneously — saving you time, resources, and cost.

### Why Hyperplott?

Traditional DoE software (Minitab, JMP, Design-Expert) requires weeks of training and costs thousands per license. Hyperplott delivers the same statistical rigor with:

- **AI-guided setup** — describe your experiment and we suggest optimal factor ranges
- **Instant design matrix** — generate full/fractional factorial, CCD, and BBD designs in seconds
- **Automated analysis** — AI runs ANOVA, regression, and generates 3D response surfaces
- **Publication-ready exports** — one-click PDF, DOCX, and Excel reports

### Who is it for?

- PhD students and postdocs running process optimization studies
- Industrial chemists and engineers optimizing manufacturing processes
- Pharma researchers validating formulations
- Food scientists improving product quality`,
    },
    quickstart: {
        title: 'Quick Start Guide',
        content: `Get from zero to your first experimental design in under 5 minutes.

### Step 1 — Sign Up (30 seconds)
Create a free account at hyperplott.com/signup. No credit card required. All features are available during beta.

### Step 2 — Open the Workspace
From your Dashboard, click **"New Design"** or navigate to the **Workspace** tab. This opens the full DoE engine.

### Step 3 — Define Your Objective
In the **Dimension** tab, describe your experiment goal in plain English. Example:
> *"I want to optimize a tablet coating process. Temperature and spray rate affect coating thickness."*

Click **AI Suggest Variables** and Hyperplott will propose factors and ranges automatically.

### Step 4 — Generate the Design Matrix
Switch to the **Execution** tab. Click **Generate Design Matrix**. Your experimental runs appear as a table — each row is one experiment to run in your lab.

### Step 5 — Enter Your Results
After running the experiments, enter your response values in the Results column.

### Step 6 — Analyze
Click **Run AI Analysis** in the **Insight** tab. Get ANOVA tables, model equations, 3D surface plots, and optimization recommendations — instantly.

### Step 7 — Export
Use the **Synthesis** tab to export your full report as PDF or DOCX.`,
    },
    'first-design': {
        title: 'Your First Design',
        content: `Walk through creating a complete factorial design from scratch.

### Example: Optimizing Coffee Extraction

**Objective:** Find the best espresso extraction by studying the effect of grind size and water temperature on yield.

**Factors:**
- Grind Size: 200–400 µm
- Water Temperature: 88–96°C

**Response:**
- Extraction Yield (%): 18–22% is ideal

**Steps:**
1. In Workspace → Dimension tab, enter the two factors with their ranges
2. Select design type: **Full Factorial (2²)** — 4 runs
3. Click Generate → you get 4 experimental runs at different factor combinations
4. Run all 4 experiments in your lab and record yields
5. Enter values in the Results column
6. Click Analyze → Hyperplott shows which factor has more impact and the optimal combination`,
    },
    factorial: {
        title: 'Factorial Designs',
        content: `Factorial designs study the effect of multiple factors simultaneously.

### Full Factorial (2ᵏ)
Tests all combinations of factor levels. For k factors at 2 levels each:
- 2 factors → 4 runs (2²)
- 3 factors → 8 runs (2³)
- 4 factors → 16 runs (2⁴)

**Use when:** Screening 2–5 factors to identify which ones matter.

### Fractional Factorial (2^(k-p))
Tests a fraction of all combinations. Saves runs when you have many factors.
- 5 factors → 16 runs instead of 32 (Resolution V)
- 6 factors → 16 runs instead of 64 (Resolution IV)

**Use when:** You have 5–10 factors and need to screen efficiently.

### How to Set Up in Hyperplott
1. Select **Factorial** in the Design Type dropdown
2. Add your factors (name, min, max, units)
3. Choose Full or Fractional
4. Click Generate Matrix`,
    },
    rsm: {
        title: 'Response Surface Methodology (RSM)',
        content: `RSM builds a mathematical model of the relationship between factors and responses, allowing you to find optimal operating conditions.

### Central Composite Design (CCD)
The most popular RSM design. Extends a 2ᵏ factorial with center points and axial (star) points.
- Estimates linear, quadratic, and interaction effects
- Requires 3+ levels per factor
- 3 factors → ~20 runs

**Use when:** You've identified key factors and want to optimize them.

### Box-Behnken Design (BBD)
An efficient alternative to CCD with no corner points (axial runs).
- Requires exactly 3 factors (at minimum)
- Fewer runs than CCD for the same number of factors
- 3 factors → 15 runs

**Use when:** Extreme factor combinations are operationally infeasible or dangerous.

### When to Use RSM
- After factorial screening narrows factors to 2–5
- When you expect curved (non-linear) relationships
- When finding a global optimum matters`,
    },
    anova: {
        title: 'Understanding ANOVA Results',
        content: `ANOVA (Analysis of Variance) tells you which factors significantly affect your response.

### Reading the ANOVA Table
After running analysis, Hyperplott shows a table with these key columns:

| Column | Meaning |
|--------|---------|
| Source | Factor or interaction being tested |
| SS | Sum of Squares — magnitude of effect |
| DF | Degrees of freedom |
| MS | Mean Square (SS/DF) |
| F-value | Test statistic |
| p-value | Probability of observing this by chance |

### The p-value Rule
- **p < 0.05** → Factor is statistically significant (95% confidence)
- **p < 0.01** → Very significant (99% confidence)
- **p > 0.05** → Factor is NOT significant; consider removing it

### Model Fit Statistics
- **R²** — How much variance the model explains. R² > 0.90 is excellent.
- **Adj-R²** — R² adjusted for number of terms. Should be close to R².
- **Pred-R²** — How well model predicts new observations. Should be within 0.2 of Adj-R².`,
    },
    regression: {
        title: 'Regression Models',
        content: `Hyperplott fits polynomial regression models to your data, giving you an equation to predict responses.

### Model Forms
**First-Order (Linear):**
Y = b₀ + b₁X₁ + b₂X₂

**Second-Order (Quadratic):**
Y = b₀ + b₁X₁ + b₂X₂ + b₁₂X₁X₂ + b₁₁X₁² + b₂₂X₂²

### Coded vs. Uncoded Variables
Hyperplott works in coded units (−1 to +1) by default, so coefficients are directly comparable. The actual-factor equation uses real units and is provided in the export.

### Model Diagnostics
The **Model Diagnostic Plot** shows:
- **Predicted vs. Actual** — points should follow y=x line
- **Residual plots** — residuals should be random and normally distributed`,
    },
    plots: {
        title: 'Interpreting Plots',
        content: `Hyperplott generates four types of plots automatically.

### 3D Response Surface
A 3D mesh showing how two factors together affect the response. Look for:
- Peaks (maxima) — optimal operating points
- Saddle points — range of equally good conditions
- Steep slopes — factor has large effect

### 2D Contour Plot
Top-down view of the 3D surface. Contour lines connect equal response values. Use this to quickly read off optimal factor combinations.

### Perturbation Plot
Shows how each factor individually affects the response while others are held at their center. Steeper lines = more influential factors.

### Diagnostic: Predicted vs. Actual
Points should cluster tightly around the diagonal. Outliers may indicate experimental error or a missing factor.`,
    },
    pdf: {
        title: 'PDF Reports',
        content: `Generate professional, publication-ready PDF reports with one click.

### What's Included
- Executive summary of design and objectives
- Complete design matrix with all experimental runs
- ANOVA table with significance indicators
- Regression equation (coded and actual units)
- All 4 plot types (3D, Contour, Perturbation, Diagnostic)
- Optimized parameter recommendations
- Your laboratory seal/logo (configurable in Settings)

### How to Generate
1. Complete the analysis in the Insight tab
2. Navigate to the Synthesis tab
3. Click **Generate PDF Report**
4. The report downloads automatically as a formatted A4 PDF

### Tips
- Add your lab logo in Settings → Laboratory for branded reports
- The report is suitable for regulatory submissions and publications`,
    },
    excel: {
        title: 'Excel / CSV Export',
        content: `Export your design matrix and results for use in other tools.

### Design Matrix Export
Downloads the full run table with:
- Run number and order
- All factor values (coded and actual)
- Response values
- Notes column

### CSV Format
Compatible with:
- Microsoft Excel
- Google Sheets
- R (read.csv)
- Python (pandas.read_csv)
- MATLAB (csvread)

### How to Export
In the Design Viewer → Export tab, click **Download CSV** or **Download Excel (.xlsx)**`,
    },
    word: {
        title: 'Word / DOCX Export',
        content: `Export an editable Word document for manuscripts, reports, and regulatory filings.

### What's Included
- All sections from the PDF report
- Formatted tables (editable in Word)
- Regression equations with proper formatting
- Embedded high-resolution plots
- References section

### Use Cases
- Drafting journal paper sections
- GMP/GLP regulatory documentation
- Internal lab reports
- Thesis chapters

### How to Export
Synthesis tab → **Generate Word Report** → downloads as .docx`,
    },
};

const DocsPage = () => {
    const [activeId, setActiveId] = useState('intro');
    const [search, setSearch] = useState('');

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const doc = docs[activeId] || docs['intro'];

    const allItems = sidebar.flatMap(s => s.items);
    const filtered = search
        ? allItems.filter(i => i.label.toLowerCase().includes(search.toLowerCase()))
        : null;

    const renderContent = (text) => {
        return text.split('\n').map((line, i) => {
            if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-black text-slate-900 mt-8 mb-3 tracking-tight">{line.slice(4)}</h3>;
            if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-black text-slate-900 mt-10 mb-4 tracking-tight">{line.slice(3)}</h2>;
            if (line.startsWith('- ')) return <li key={i} className="text-slate-600 font-medium ml-4 mb-1 text-sm">{line.slice(2).replace(/\*\*(.*?)\*\*/g, '$1')}</li>;
            if (line.startsWith('| ')) {
                const cells = line.split('|').filter(Boolean).map(c => c.trim());
                const isHeader = cells.every(c => c);
                return <tr key={i} className="border-b border-slate-100">{cells.map((c, j) => isHeader && i > 0 ? <td key={j} className="py-2 px-4 text-sm text-slate-600 font-medium">{c}</td> : <th key={j} className="py-2 px-4 text-left text-xs font-black text-slate-500 uppercase tracking-widest">{c}</th>)}</tr>;
            }
            if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-primary-purple pl-4 italic text-slate-500 my-4 text-sm">{line.slice(2)}</blockquote>;
            if (line === '') return <div key={i} className="h-3" />;
            const bold = line.replace(/\*\*(.*?)\*\*/g, (_, m) => `<strong>${m}</strong>`);
            return <p key={i} className="text-slate-600 font-medium text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: bold }} />;
        });
    };

    return (
        <div className="bg-bg-primary min-h-screen text-text-primary font-sans overflow-x-hidden">
            <SEO
                title="Documentation — Hyperplott"
                description="Complete documentation for Hyperplott DoE platform. Learn about factorial designs, RSM, ANOVA analysis, and report generation."
                keywords="DoE documentation, design of experiments guide, factorial design tutorial, ANOVA guide, response surface methodology"
                url="https://hyperplott.com/docs"
            />
            <Navbar />

            <div className="pt-20 flex min-h-screen">
                {/* Sidebar */}
                <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-slate-100 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto bg-white">
                    <div className="p-6 border-b border-slate-100">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search docs..."
                                className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-purple/20 font-medium"
                            />
                        </div>
                    </div>
                    <nav className="p-4 flex-1">
                        {(filtered ? [{ section: 'Search Results', items: filtered }] : sidebar).map(({ section, items }) => (
                            <div key={section} className="mb-6">
                                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-slate-400 mb-2 px-3">{section}</p>
                                {items.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => { setActiveId(item.id); setSearch(''); }}
                                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all mb-0.5 ${activeId === item.id ? 'bg-primary-purple/10 text-primary-purple font-black' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Content */}
                <main className="flex-1 max-w-3xl mx-auto px-6 py-12">
                    <motion.div
                        key={activeId}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
                            <BookOpen className="w-3.5 h-3.5" />
                            Documentation
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-8">{doc.title}</h1>
                        <div className="prose-custom space-y-1">
                            {renderContent(doc.content)}
                        </div>

                        {/* CTA */}
                        <div className="mt-16 p-8 rounded-2xl bg-primary-purple/5 border border-primary-purple/20">
                            <p className="font-black text-slate-900 mb-2">Ready to try it yourself?</p>
                            <p className="text-sm text-slate-500 font-medium mb-4">Everything in these docs is available free during beta.</p>
                            <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-purple to-primary text-white text-sm font-black hover:scale-105 transition-transform shadow-lg shadow-primary-purple/20">
                                Start Free <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default DocsPage;
