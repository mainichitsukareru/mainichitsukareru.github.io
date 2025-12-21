// ==============================================
// VISUALIZATIONS - Chart.js & SVG
// ==============================================

// Chart instances
let calcChart = null;
let compareChartA = null;
let compareChartB = null;
let fractionChart = null;

// ==============================================
// TAB 1: GRID 100 (SVG)
// ==============================================
function createGrid100() {
    const svg = document.getElementById('grid100');
    if (!svg) {
        console.error('SVG grid100 not found!');
        return;
    }

    console.log('Creating grid 100...');

    // Clear existing content
    svg.innerHTML = '';

    const cellSize = 50;
    const gap = 2;

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const x = col * (cellSize + gap);
            const y = row * (cellSize + gap);

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', x);
            rect.setAttribute('y', y);
            rect.setAttribute('width', cellSize);
            rect.setAttribute('height', cellSize);
            rect.setAttribute('rx', 6);
            rect.setAttribute('class', 'grid-cell');
            rect.setAttribute('fill', '#F7F9FC');
            rect.setAttribute('stroke', '#DFE6E9');
            rect.setAttribute('stroke-width', '2');

            svg.appendChild(rect);
        }
    }

    console.log('Grid created with 100 cells');

    // Initial update
    updateGrid100(50);
}

function updateGrid100(percentage) {
    const svg = document.getElementById('grid100');
    if (!svg) {
        console.error('SVG grid100 not found in updateGrid100!');
        return;
    }

    const cells = svg.querySelectorAll('.grid-cell');
    const cellsToFill = Math.round(percentage);

    console.log(`Updating grid: ${cellsToFill} cells to fill out of ${cells.length}`);

    if (cells.length === 0) {
        console.error('No cells found in grid!');
        return;
    }

    // Detect mobile for simpler animation
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

    cells.forEach((cell, index) => {
        const fillColor = index < cellsToFill ? '#FF6B6B' : '#F7F9FC';

        if (anime && !isMobile) {
            // Animated with Anime.js (desktop only)
            anime({
                targets: cell,
                fill: fillColor,
                duration: 300,
                delay: index * 5, // Stagger effect
                easing: 'easeOutQuad'
            });
        } else {
            // Direct update (mobile or no anime)
            cell.setAttribute('fill', fillColor);
            // Force repaint on mobile
            if (isMobile) {
                cell.style.fill = fillColor;
            }
        }
    });
}

// ==============================================
// TAB 2: CALCULATE CHART (Chart.js)
// ==============================================
function createCalcChart() {
    const canvas = document.getElementById('chartCalc');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    calcChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Percentuale', 'Rimanente'],
            datasets: [{
                data: [25, 75],
                backgroundColor: ['#FF6B6B', '#F7F9FC'],
                borderColor: ['#FF6B6B', '#DFE6E9'],
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 16,
                            family: 'Quicksand',
                            weight: 600
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#2D3436',
                    titleFont: {
                        size: 16,
                        family: 'Quicksand'
                    },
                    bodyFont: {
                        size: 14,
                        family: 'Quicksand'
                    },
                    padding: 12,
                    cornerRadius: 8
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

function updateCalcChart(percentage, total) {
    if (!calcChart) return;

    const result = Math.round((percentage / 100) * total);
    const remainder = total - result;

    calcChart.data.datasets[0].data = [result, remainder];
    calcChart.data.labels = [`${percentage}% (${result})`, `Rimanente (${remainder})`];
    calcChart.update('active');
}

// ==============================================
// TAB 3: COMPARE CHARTS (Chart.js)
// ==============================================
function createCompareCharts() {
    createCompareChartA();
    createCompareChartB();
}

function createCompareChartA() {
    const canvas = document.getElementById('chartCompA');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    compareChartA = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['A', 'Vuoto'],
            datasets: [{
                data: [30, 70],
                backgroundColor: ['#FF6B6B', '#F7F9FC'],
                borderColor: ['#FF6B6B', '#DFE6E9'],
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

function createCompareChartB() {
    const canvas = document.getElementById('chartCompB');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    compareChartB = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['B', 'Vuoto'],
            datasets: [{
                data: [70, 30],
                backgroundColor: ['#4ECDC4', '#F7F9FC'],
                borderColor: ['#4ECDC4', '#DFE6E9'],
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

function updateCompareCharts(a, b) {
    if (compareChartA) {
        compareChartA.data.datasets[0].data = [a, 100 - a];
        compareChartA.update('active');
    }

    if (compareChartB) {
        compareChartB.data.datasets[0].data = [b, 100 - b];
        compareChartB.update('active');
    }
}

// ==============================================
// TAB 4: FRACTION CHART (Chart.js)
// ==============================================
function createFractionChart() {
    const canvas = document.getElementById('chartFraction');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    fractionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Frazione', 'Rimanente'],
            datasets: [{
                data: [50, 50],
                backgroundColor: ['#C7B3E9', '#F7F9FC'],
                borderColor: ['#C7B3E9', '#DFE6E9'],
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 16,
                            family: 'Quicksand',
                            weight: 600
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#2D3436',
                    titleFont: {
                        size: 16,
                        family: 'Quicksand'
                    },
                    bodyFont: {
                        size: 14,
                        family: 'Quicksand'
                    },
                    padding: 12,
                    cornerRadius: 8
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 800
            }
        }
    });
}

function updateFractionChart(percentage) {
    if (!fractionChart) return;

    const remaining = 100 - percentage;

    fractionChart.data.datasets[0].data = [percentage, remaining];
    fractionChart.data.labels = [`${percentage}%`, `${remaining.toFixed(2)}%`];
    fractionChart.update('active');
}

// ==============================================
// GAMES: GLASS SVG (Liquid fill effect)
// ==============================================
function createGlassSVG() {
    const svg = document.getElementById('glassSvg');
    if (!svg) return;

    // Clear existing
    svg.innerHTML = '';

    // Glass container (trapezoid shape) - RIDOTTO per mobile
    const glass = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    glass.setAttribute('d', 'M 80 100 L 220 100 L 200 400 L 100 400 Z');
    glass.setAttribute('fill', 'none');
    glass.setAttribute('stroke', '#4ECDC4');
    glass.setAttribute('stroke-width', '6');
    glass.setAttribute('stroke-linecap', 'round');
    glass.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(glass);

    // Liquid (will be updated dynamically)
    const liquid = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    liquid.setAttribute('id', 'glassLiquid');
    liquid.setAttribute('d', 'M 100 400 L 200 400 L 200 400 L 100 400 Z');
    liquid.setAttribute('fill', 'url(#liquidGradient)');
    liquid.setAttribute('opacity', '0.9');
    svg.appendChild(liquid);

    // Gradient for liquid
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'liquidGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y2', '100%');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#4ECDC4');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#95E1D3');

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
}

function updateGlassLiquid(percentage) {
    const liquid = document.getElementById('glassLiquid');
    if (!liquid) return;

    // Calculate liquid height (0-300px range, from bottom) - RIDOTTO
    const maxHeight = 300;
    const height = (percentage / 100) * maxHeight;
    const topY = 400 - height;

    // Calculate trapezoid width at this height
    const bottomWidth = 100; // width at y=400
    const topWidth = 140; // width at y=100
    const ratio = (400 - topY) / 300;
    const widthAtHeight = bottomWidth + (topWidth - bottomWidth) * ratio;

    const leftX = 150 - widthAtHeight / 2;
    const rightX = 150 + widthAtHeight / 2;

    const path = `M 100 400 L 200 400 L ${rightX} ${topY} L ${leftX} ${topY} Z`;

    if (anime) {
        anime({
            targets: liquid,
            d: path,
            duration: 600,
            easing: 'easeOutElastic(1, 0.6)'
        });
    } else {
        liquid.setAttribute('d', path);
    }
}

// ==============================================
// GAMES: PIE SVG (Colorable slices)
// ==============================================
function createPieSVG(slices) {
    const svg = document.getElementById('pieSvg');
    if (!svg) return;

    // Clear existing
    svg.innerHTML = '';

    const centerX = 200;
    const centerY = 200;
    const radius = 150;

    const angleStep = (2 * Math.PI) / slices;

    for (let i = 0; i < slices; i++) {
        const startAngle = i * angleStep - Math.PI / 2;
        const endAngle = (i + 1) * angleStep - Math.PI / 2;

        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
        path.setAttribute('d', d);
        path.setAttribute('fill', '#F7F9FC');
        path.setAttribute('stroke', '#DFE6E9');
        path.setAttribute('stroke-width', '3');
        path.setAttribute('class', 'pie-slice');
        path.setAttribute('data-index', i);
        path.setAttribute('data-colored', 'false');

        // Click handler
        path.style.cursor = 'pointer';
        path.addEventListener('click', () => {
            togglePieSlice(path);
        });

        svg.appendChild(path);
    }
}

function togglePieSlice(slice) {
    const isColored = slice.getAttribute('data-colored') === 'true';

    if (isColored) {
        slice.setAttribute('fill', '#F7F9FC');
        slice.setAttribute('data-colored', 'false');
    } else {
        slice.setAttribute('fill', '#FFE66D');
        slice.setAttribute('data-colored', 'true');
    }

    // Update counter
    updatePieCounter();
}

function updatePieCounter() {
    const slices = document.querySelectorAll('.pie-slice');
    const colored = document.querySelectorAll('.pie-slice[data-colored="true"]').length;
    const total = slices.length;
    const percent = Math.round((colored / total) * 100);

    document.getElementById('pieColored').textContent = colored;
    document.getElementById('pieTotal').textContent = total;
    document.getElementById('piePercent').textContent = percent;
}

// ==============================================
// UTILITY: Feature Detection
// ==============================================
function checkFeatureSupport() {
    const svg = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
    const chartjs = typeof Chart !== 'undefined';
    const animejs = typeof anime !== 'undefined';

    console.log('Feature Support:', {
        SVG: svg,
        ChartJS: chartjs,
        AnimeJS: animejs
    });

    if (!svg || !chartjs) {
        console.error('Browser non supportato! Mancano funzionalità essenziali.');
    }

    return svg && chartjs;
}

// Export checkFeatureSupport to be called from app.js
// (Removed DOMContentLoaded to avoid timing issues)

console.log('visualizations.js loaded successfully');
