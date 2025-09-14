import { injectTooltipStyles, showTooltipDialogueClick } from "@components/DialogueOnClick";

function closeModals() {
        const modals = document.querySelectorAll('.contact');
        modals.forEach((modal) => {
            modal.setAttribute('href', 'javascript:window.history.back();');
        });

        const emails = document.querySelectorAll('.dialogue');
        emails.forEach((email) => {
            showTooltipDialogueClick(email, "Copied to Clipboard");

            // Add the click event for copying and showing the tooltip
            email.addEventListener('click', (e) => {
                e.preventDefault();
                const emailText = email.getAttribute('data-email');

                if (emailText)
                    navigator.clipboard.writeText(emailText);
            });
        });

        injectTooltipStyles();
    }


    const maxDigit = 18;
    let enteredDigits = "";
    let digitCount = 0; // Storing our own digitCount is cheaper than checking string length all the time

    const audioCtx = new (window.AudioContext)();

    // Controls the volume
    const gainNode = audioCtx.createGain();
    gainNode.connect(audioCtx.destination);

    function playTones(frequency1: number, frequency2: number, delayTime: number)
    {
        const oscillator1= audioCtx.createOscillator();
        const oscillator2= audioCtx.createOscillator();
        oscillator1.type = oscillator2.type ='sine';

        oscillator1.frequency.setValueAtTime(frequency1, audioCtx.currentTime);
        oscillator2.frequency.setValueAtTime(frequency2, audioCtx.currentTime);

        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);

        oscillator1.start();
        oscillator2.start();

        setTimeout(() => {
            oscillator1.stop();
            oscillator1.disconnect();
            oscillator2.stop();
            oscillator2.disconnect();
        }, delayTime);
    }

    // Function to set the volume
    function setVolume(volume: number) {
        // Volume should be between 0.0 (mute) and 1.0 (full volume)
        gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    }


    let audioElement: HTMLAudioElement = new Audio();

    function playHangUp()
    {
        const hangUpElement: HTMLAudioElement = new Audio("/contact/Hang-Up.ogg");
        if (hangUpElement)
            hangUpElement.play();
    }

    function preloadAudio(id: string): void
    {
        const element = new Audio(id);
        element.load();
    }


    function playAudio(id: string): void {
        const element = new Audio(id);
        if (element instanceof HTMLAudioElement) {
            audioElement = element;

            // Add an event listener for when the audio ends
            audioElement.onended = () => {
                playHangUp();
            };

            audioElement.play();
        }
    }

    function isAudioPlaying(): boolean {
        return !audioElement.paused && audioElement.currentTime > 0 && !audioElement.ended;
    }

    function stopAudio(): void {
        audioElement.currentTime = 0;
        audioElement.pause();
    }

    function enterDigit(value: string)
    {
        if (digitCount < maxDigit)
        {
            enteredDigits += value;
            ++digitCount;
        }
    }

    function triggerVibration(element: HTMLElement, duration: number) {
        // Create the animation string dynamically
        const animation = `vibrate 0.1s linear ${duration / 100}`;

        // Apply the animation to the element
        element.style.animation = animation;

        // Remove the animation after it's complete
        setTimeout(() => {
            element.style.animation = ""; // Reset animation
        }, duration);
    }

    async function makeHash(enteredDigits: string) {
        //console.log(enteredDigits);

        // @ts-ignore
        const digest = async ({ algorithm = "SHA-1", message }) =>
         Array.prototype.map
          .call(
           new Uint8Array(
            await crypto.subtle.digest(algorithm, new TextEncoder().encode(message))
           ),
           (x) => ("0" + x.toString(16)).slice(-2)
          )
          .join("");

        const result = await digest({message: enteredDigits})

        //console.log(result);

        return result
    }

    // Controlled audio player. Must be queued this time.
    class AudioController {
        private audioQueue: HTMLAudioElement[] = [];
        private currentAudio: HTMLAudioElement | null = null;
        private isStopped = false;

        // Add an audio element to the queue
        enqueue(audio: HTMLAudioElement): void {
            this.audioQueue.push(audio);
        }

        // Play the audio queue
        async playSequence(): Promise<void> {
            this.isStopped = false;

            while (this.audioQueue.length > 0 && !this.isStopped) {
                this.currentAudio = this.audioQueue.shift()!;
                try {
                    await this.playAudio(this.currentAudio);
                } catch (error) {
                    console.error("Error playing audio:", error);
                }
            }

            // Reset state when done
            this.currentAudio = null;
        }

        // Stop the sequence immediately
        stop(hasHangup:boolean = true): void {

            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio.currentTime = 0; // Reset to the start
                if (hasHangup && !this.isStopped)
                    playHangUp();
            }
            this.audioQueue = []; // Clear the queue
            this.isStopped = true;
        }

        // Helper to play a single audio element and wait for it to finish
        private playAudio(audio: HTMLAudioElement): Promise<void> {
            return new Promise((resolve, reject) => {
                audio.onended = () => resolve();
                audio.onerror = (e) => reject(e);
                audio.play().catch(reject);
            });
        }
    }

    const audioController = new AudioController();

    function playPonka(waitTime:number)
    {
        // WARNING! THERE IS NO INTEGER IN TYPESCRIPT/JAVASCRIPT! TREAT THEM AS FLOAT!
        const AudioDir = "/contact/ponka/";
        let isPM = false;

        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();

        let minState = "0";

        // Approximate the quarters for the min
        if(minutes > 10 && minutes <=20)
        {
            minState = "15";
        }
        else if (minutes > 20 && minutes <=35)
        {
            minState = "30";
        }
        else if (minutes > 35 && minutes <= 50)
        {
            minState = "45";
        }
        else
        {
            minState = "60";
        }

        // Process the hour
        if (hours > 23 && minState == "60") // If approximates to 1 AM
        {
            hours = 1;
        }
        if (hours < 1) // Ex: 12:30 AM (30 min past midnight)
        {
            isPM = false;
            hours = 12;
        }
        else if (hours > 11) // If over 12 i.e. 13 then is 1PM // if 12:30 then still AM
        {
            isPM = true;
            hours = hours - 12;
            if(hours < 1) // now.getHours() returns 12 for 12:00 noon, so if subtraction returns 0, then it's 12 PM
            {
                hours = 12;
            }
        }

        let tail: string = '';

        if (isPM)
        {
            if (hours >= 0 && hours < 2 || hours == 12)
            {
                tail = "lunch";
            }
            else if (hours >= 2 && hours <= 6)
            {
                tail = "party";
            }
            else if (hours > 6 && hours <= 8)
            {
                tail = "dinner";
            }
            else if (hours > 8 && hours <= 9)
            {
                tail = "company";
            }
            else if(hours > 9 )
            {
                tail = "sleep";
            }
        }
        else
        {
            if (hours >= 0 && hours < 6 || hours == 12)
            {
                tail = "sleep";
            }
            else if (hours >= 6 && hours < 8)
            {
                tail = "breakfast";
            }
            else if (hours >= 8 && hours < 9)
            {
                tail = "exercise";
            }
            else if (hours >= 9 && hours < 11)
            {
                tail = "company";
            }
            else if (hours >= 11 && hours < 12)
            {
                tail = "lunch";
            }
        }
        //console.log(hours);
        //console.log(minState);
        //console.log(tail);

        // Preloading intro
        const intro = new Audio(AudioDir + "intro.ogg");
        preloadAudio(AudioDir + "intro.ogg");

        // Preloading the hour
        const hourAudio = new Audio(AudioDir + hours + ".ogg");
        preloadAudio(AudioDir + hours + ".ogg");

        // Preloading the second, skip if no need
        let minAudio =  new Audio();
        if (minState != "0" && minState != "60")
        {
            preloadAudio(AudioDir + minState + ".ogg");
            minAudio = new Audio(AudioDir + minState + ".ogg");
        }

        // Preloading AM/PM response
        let AmPmAudio =  new Audio();
        if (isPM)
        {
            preloadAudio(AudioDir + "PM.ogg");
            AmPmAudio = new Audio(AudioDir + "PM.ogg");
        }
        else
        {
            preloadAudio(AudioDir + "AM.ogg");
            AmPmAudio = new Audio(AudioDir + "AM.ogg");
        }

        // Preloading the tail response
        const tailAudio = new Audio(AudioDir + tail + ".ogg");
        preloadAudio(AudioDir + tail + ".ogg")

        // Preloading the hang up sound
        const hangUp = new Audio("/contact/Hang-Up.ogg");
        preloadAudio("/contact/Hang-Up.ogg");

        /* Play the sound */
        // Enqueue audio
        audioController.enqueue(intro);
        audioController.enqueue(hourAudio);
        if (minState != "0" && minState != "60")
        {
            audioController.enqueue(minAudio);
        }
        audioController.enqueue(AmPmAudio);
        audioController.enqueue(tailAudio);
        audioController.enqueue(hangUp);

        // Play sequence
        setTimeout(() => {
            audioController.playSequence();
        }, waitTime);
    }

    let isPlayingGotMare = false;
    let chosenRandomNoise = "";

    function playGotMare(waitTime:number)
    {
        // Unlike others, this one will not auto end
        const AudioDir = "/contact/808-hot-mare/";

        preloadAudio("/contact/Hang-Up.ogg");
        preloadAudio(AudioDir + "MareIVR.ogg");
        const mareIVR = new Audio(AudioDir + "MareIVR.ogg");

        const randomNoises = [
            "Anonfilly.ogg",
            "BorderPatrol.ogg",
            "Cant_Touch_This_Mare.ogg",
            "EveryTimeTheySayMare.ogg",
            "FuckMeHard.ogg",
            "HSH_MARE.ogg",
            "Lyrafielf.ogg",
            "Mares and Snowpity.ogg",
            "Marespin.ogg",
            "Pinkie_IDK.ogg",
            "ScoutLaughsAtMares.ogg",
            "sunflower wife.ogg",
            "Thanks Tabitha, very cool.ogg"
        ]

        function getRandomNoise(): string {
            const randomIndex = Math.floor(Math.random() * randomNoises.length);
            return randomNoises[randomIndex];
        }

        chosenRandomNoise = AudioDir + getRandomNoise();
        preloadAudio(chosenRandomNoise);

        // Queueing the audio to play
        audioController.enqueue(mareIVR);

        setTimeout(() => {
            isPlayingGotMare = true;
            audioController.playSequence();
        }, waitTime);
    }

    export async function initializePhone() {
        // Clean up any existing initialization first
        if (window.__phoneCleanup) {
            window.__phoneCleanup();
        }

        closeModals();

        const display = document.getElementById("display") as HTMLElement;
        const phonePad = document.getElementById("phone-pad") as HTMLElement;
        const phoneContainer = document.getElementById("phoneContainer") as HTMLElement;

        // The fix for that pesky null error
        if (!display || !phonePad || !phoneContainer)
            return;


        display.textContent = '_';

        setVolume(0.05); // set it to half to not earrape

        phonePad.addEventListener("click", async (e) => {
            const target = e.target as HTMLElement | null;
            const button = target?.closest("button");

            if (button) {
                const value = button.getAttribute("data-value");


            if (value != "CAL" || display.textContent == "_")
            {
                // Trigger vibration
                triggerVibration(phoneContainer, 100);
            }

            switch(value)
            {
                case "1":
                {
                    playTones(1209,697,200);
                    enterDigit(value);
                    break;
                }
                case "2":
                {
                    playTones(1336,697,200);
                    enterDigit(value);
                    break;
                }
                case "3":
                {
                    playTones(1477,697,200);
                    enterDigit(value);
                    break;
                }
                case "4":
                {
                    playTones(1209,770,200);
                    enterDigit(value);
                    break;
                }
                case "5":
                {
                    playTones(1336,770,200);
                    enterDigit(value);
                    break;
                }
                case "6":
                {
                    playTones(1477,770,200);
                    enterDigit(value);
                    break;
                }
                case "7":
                {
                    playTones(1209,852,200);
                    enterDigit(value);
                    break;
                }
                case "8":
                {
                    playTones(1336,852,200);
                    enterDigit(value);
                    break;
                }
                case "9":
                {
                    playTones(1477,852,200);
                    enterDigit(value);
                    break;
                }
                case "*":
                {
                    playTones(1209,941,200);
                    enterDigit(value);
                    break;
                }
                case "0":
                {
                    playTones(1336,941,200);
                    enterDigit(value);
                    break;
                }
                case "#":
                {
                    playTones(1477,941,200);
                    enterDigit(value);
                    break;
                }
                case "CLR":
                {
                    if(isPlayingGotMare)
                    {
                        audioController.stop();
                        isPlayingGotMare = false;
                        digitCount = 0;
                        enteredDigits = "";
                    }
                    else
                    {
                        audioController.stop();
                        if(isAudioPlaying())
                        {
                            stopAudio();
                            playHangUp();
                        }
                        digitCount = 0;
                        enteredDigits = "";
                    }
                    break;
                }
                case "CAL":
                {
                    if (isPlayingGotMare) // Should do nothing when GotMare is playing
                    {
                        break;
                    }
                    stopAudio(); // force pause of whatever's currently playing
                    const waitTime = 1000;

                    if (enteredDigits != '')
                    {
                        // Trigger vibration
                        triggerVibration(phoneContainer, waitTime);
                        playTones(440, 480, waitTime);

                        let AudioUrl: string;
                        const AudioDir = "/contact/";

                        switch (enteredDigits) {
                            case "55562733247":
                            case "5556273324":
                            case "4742": // Corp // HPIC
                                AudioUrl = "Corp.ogg";
                                break;
                            case "4136121025": // CadBrad // Attendee Relation
                            case "1025":
                                AudioUrl = "Attendee-Relations.ogg";
                                break;
                            case "1034834677": // weege // Charity
                            case "4677":
                                AudioUrl = "Charity.ogg";
                                break;
                            case "55583241337":
                            case "1337":
                                AudioUrl = "Tech-Department.ogg";
                                break;
                            case "5559572025":
                                AudioUrl = "Public-Relations.ogg"
                                break;
                            case "55576652":
                                playPonka(waitTime);
                                return;
                            case "8084686273":
                                playGotMare(waitTime);
                                return;
                            default: // play secret phone number
                                const hash = await makeHash(enteredDigits);
                                AudioUrl = hash + ".ogg"
                                const res = await fetch(AudioDir + AudioUrl, {method: 'HEAD'})
                                if (res.status != 200) {
                                    // if ogg file does not exist, make one more attempt to check for a redirect txt
                                    const TextUrl = hash + ".txt";
                                    const TextRes = await fetch(AudioDir + TextUrl, { method: 'HEAD' });
                                    if (TextRes.status != 200)
                                    {
                                        AudioUrl = "Invalid-Number.ogg";
                                    }
                                    else {
                                        fetch(AudioDir + TextUrl)
                                            .then((res) => res.text())
                                            .then((text) => {
                                                const lines = text.split("\n").map(line => line.trim()).filter(line => line !== "");

                                                if (lines.length > 1) {
                                                    // Randomly select one of the lines if there are multiple
                                                    const randomIndex = Math.floor(Math.random() * lines.length);
                                                    AudioUrl = lines[randomIndex];
                                                } else if (lines.length === 1) {
                                                    // If there's only one line, use that one
                                                    AudioUrl = lines[0];
                                                }
                                            })
                                            .catch((e) => console.error(e));
                                    }
                                }
                                break;
                            }

                        preloadAudio(AudioDir + AudioUrl);
                        preloadAudio(AudioDir + "Hang-Up.ogg");

                        setTimeout(() => {
                            playAudio(AudioDir + AudioUrl);
                        }, waitTime);
                    }
                    break;
                }
                case "BCK":
                {
                    enteredDigits = enteredDigits.slice(0, -1);
                    if(digitCount > 1)
                        --digitCount;
                    break;
                }
            }

            if(isPlayingGotMare) // if has pressed any of the trigger number for Got Mare
            {
                if (value == "1" || value == "2" || value == "3" || value == "4" || value == "5" || value == "6" || value == "7" || value == "8" || value == "9" || value == "*" || value == "0" || value == "#")
                {
                    audioController.stop(false); // has no hangup
                    isPlayingGotMare = false;
                    playAudio(chosenRandomNoise);
                }
            }


            display.textContent = enteredDigits || "_";


        }
        });

        //console.log('Phone initialized');

        // Store any cleanup logic
        window.__phoneCleanup = () => {
            //console.log('Phone cleanup');

            // Reset state
            enteredDigits = "";
            digitCount = 0;

            // Stop any playing audio
            stopAudio();

            // Remove click listeners from email elements
            const emails = document.querySelectorAll('.email');
            emails.forEach((email) => {
                email.replaceWith(email.cloneNode(true));
            });

            // Get phonePad element
            const phonePad = document.getElementById("phone-pad");
            if (phonePad) {
                // Clone and replace to remove event listeners
                phonePad.replaceWith(phonePad.cloneNode(true));
            }

            // Reset display
            const display = document.getElementById("display");
            if (display) {
                display.textContent = '_';
            }

            window.__phoneInitialized = false;
        };

        window.__phoneInitialized = true;
    }

    declare global {
        interface Window {
            __phoneInitialized: boolean;
            __phoneCleanup?: () => void;
        }
    }

    // Combined initialization function that handles both scenarios
    export async function setupPhone() {
        // Run on initial load and subsequent navigations
        document.addEventListener('astro:page-load', () => {
            initializePhone();
        });

        // Clean up before view transitions
        document.addEventListener('astro:before-swap', () => {
            if (window.__phoneCleanup) {
                window.__phoneCleanup();
            }
        });
    }

    /*
    document.addEventListener("astro:page-load", () => {
        phone();
        closeModals();
    });
    */
