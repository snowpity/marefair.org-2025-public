// This is incredibly scuffed, but Astro's css is scoped and we are not supposed to add tailwind classes with js
export function injectTooltipStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .dialogue {
            position: relative;
            cursor: pointer;
        }

        .dialogue .tooltip {
            display: block;
            opacity: 0;
            position: absolute;
            bottom: -2rem;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: #fff;
            padding: 0.5rem;
            border-radius: 0.5rem;
            font-size: 1rem;
            white-space: nowrap;
            z-index: 100;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
            transition: opacity 0.3s ease-in-out;
        }

        .dialogue.show-tooltip .tooltip {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

export function showTooltipDialogueClick(elem: Element, context: string, time: number = 500) // default to 0.5s
{
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = context;
    elem.appendChild(tooltip);

    elem.addEventListener('click', (e) => {
        e.preventDefault();
        elem.classList.add('show-tooltip'); // Show the tooltip

        // Hide the tooltip
        setTimeout(() => {
            elem.classList.remove('show-tooltip');
        }, time);
    });

}