
declare global {
    interface Window {
        __phoneInitialized: boolean;
        __CalculatorCleanup?: () => void;
    }
}

let nightCount = 4;
let ponyCount = 1;
let display = '_';
let splitEvenly = false;

export async function initializeCalculator() {
    // Clean up any existing initialization first
    if (window.__CalculatorCleanup)
        window.__CalculatorCleanup();

    const displayNights   = document.getElementById('calc-display2');
    const displayTotal    = document.getElementById('calc-display');
    const incrementButton = document.getElementById('increment');
    const decrementButton = document.getElementById('decrement');
    const splitButton     = document.getElementById('split');
    const resetButton     = document.getElementById('reset');
    const calcButtons = [
        document.getElementById('calc-1'),
        document.getElementById('calc-2'),
        document.getElementById('calc-3'),
        document.getElementById('calc-4')
    ];



    function updateNight() {
        if (displayNights)
            displayNights.innerText = nightCount.toString();
        updateTotal();
    }

    function setPonyCount(count: number) {
        ponyCount = count;
        updateTotal();
    }

    function updateTotal() {

        //display = ponyCount.toString() + " Ponies * " + nightCount.toString() + " Night = " + ponyCount;
        const extraPonies = ponyCount > 2 ? (ponyCount - 2) * 10 * nightCount : 0;
        const baseCost = nightCount * 129;
        const totalCost = baseCost + extraPonies;

        /* NO TAX UNTIL WE FIGURE HOW THIS WORKS
        const totalCostTaxed = totalCost * 1.135;

        const taxString = `Tax 13.5% = $${totalCostTaxed.toFixed(2)}`;
        let displayText = `${nightCount} Night = $${baseCost} ${ponyCount <= 2 ? '+ ' + taxString : ''} `;

        if (ponyCount > 2) {
            displayText += ` + Extra ${ponyCount - 2} ponies $${extraPonies} = $${totalCost} + ${taxString}`;
        }

        if (splitEvenly) {
            const splitCost = totalCostTaxed / ponyCount;
            displayText += ` / ${ponyCount} ${ponyCount < 2 ? 'Pony' : 'Ponies'} = $${splitCost.toFixed(2)}`;
        }
        */

        let displayText = `${nightCount} Night = $${baseCost}`;

        if (ponyCount > 2) {
            displayText += ` + Extra ${ponyCount - 2} ponies $${extraPonies} = $${totalCost}`;
        }

        if (splitEvenly) {
            const splitCost = totalCost / ponyCount;
            displayText += ` / ${ponyCount} ${ponyCount < 2 ? 'Pony' : 'Ponies'} = $${splitCost.toFixed(2)}`;
        }

        display = displayText;


        if (displayTotal)
            displayTotal.innerText = display.toString();
    }

    function increment() {
        if(nightCount <= 13)
            nightCount += 1;
        updateNight();
    }

    function decrement() {
        if(nightCount > 1)
            nightCount -= 1;
        updateNight();
    }

    function split() {
        if(splitButton)
            splitButton.classList.toggle('toggled');

        if(splitEvenly)
            splitEvenly = false;
        else
            splitEvenly = true;
        updateNight();
    }

    function reset() {
        nightCount = 1;
        ponyCount = 1;
        splitEvenly = false;
        updateNight();
        updateTotal();
        if (splitButton) {
            splitButton.classList.remove('toggled');
        }
    }


    if (resetButton)
        resetButton.addEventListener('click', reset);
    if (incrementButton)
        incrementButton.addEventListener('click', increment);
    if (decrementButton)
        decrementButton.addEventListener('click', decrement);
    if (splitButton)
        splitButton.addEventListener('click', split);

    calcButtons.forEach((button, index) => {
        if (button) {
            button.addEventListener('click', () => setPonyCount(index + 1));
        }
    });

    // Initialize display
    updateNight();
    updateTotal();

    const handlers = {
        increment,
        decrement,
        reset,
        split,
        ponyHandlers: calcButtons.map((_, index) => () => setPonyCount(index + 1))
    };

    window.__CalculatorCleanup = () => {
        if (incrementButton)
            incrementButton.removeEventListener('click', handlers.increment);
        if (decrementButton)
            decrementButton.removeEventListener('click', handlers.decrement);
        if (resetButton)
            resetButton.removeEventListener('click', handlers.reset);
        if (splitButton)
            splitButton.removeEventListener('click', handlers.split);

        calcButtons.forEach((button, index) => {
            if (button) {
                button.removeEventListener('click', handlers.ponyHandlers[index]);
            }
        });
        // Reset state
        reset();

        window.__phoneInitialized = false;
    };
};

export async function setupCalculator() {
    // Run on initial load and subsequent navigations
    document.addEventListener('astro:page-load', () => {
        initializeCalculator();
    });

    // Clean up before view transitions
    document.addEventListener('astro:before-swap', () => {
        if (window.__CalculatorCleanup) {
            window.__CalculatorCleanup();
        }
    });
}
