export const CONTENT_API = import.meta.env.PUBLIC_API_BASE_URL;

let mascotCount: number;

function base64Decoder(s: string): string
{
    return atob(s);
}

async function trackBoop(mareId: number) {
    try {
        const response = await fetch(`${CONTENT_API}/Boop/${mareId}`, {
            method: 'POST'
        });
        if (!response.ok) {
            console.error('Failed to track boop');
        }
    } catch (error) {
        console.error('Error tracking boop:', error);
    }
}

interface VideoPair {
    activeVideo: HTMLVideoElement;
    inactiveVideo: HTMLVideoElement;
    currentEndedHandler?: (event: Event) => void;
}

function preloadVideo(src: string): Promise<void> {
    return new Promise((resolve) => {
        const element = document.createElement('video');
        element.src = src;
        element.preload = 'auto';
        element.addEventListener('loadeddata', () => resolve(), { once: true });
    });
}

function preloadAudio(id: string): Promise<void>
{
    return new Promise((resolve) => {
        const element = new Audio(id);
        element.load();
        element.oncanplaythrough = () => resolve();
    });
}

function playAudio(src: string)
{
    const AudioElem: HTMLAudioElement = new Audio(src);
    AudioElem.volume = 0.5;
    AudioElem.play();
}

async function switchVideos(pair: VideoPair, newSrc: string, shouldLoop: boolean = false): Promise<void> {
    // Prepare inactive video
    pair.inactiveVideo.src = newSrc;
    pair.inactiveVideo.loop = shouldLoop;

    // Start playing before showing
    try {
        await pair.inactiveVideo.play();
    } catch (e) {
        if (e instanceof DOMException && e.message.includes("aborted")) {
        // Suppress expected abort errors
        } else {
        console.error("Unexpected error during video play:", e);
        }
    }
    // Wait one frame to ensure video is displaying
    await new Promise(requestAnimationFrame);

    // Crossfade swap
    pair.inactiveVideo.style.opacity = '1';
    pair.activeVideo.style.opacity = '0';

    // Swap references
    [pair.activeVideo, pair.inactiveVideo] = [pair.inactiveVideo, pair.activeVideo];
}

const contentWrapper = document.getElementById('content-wrapper');
let wasMobileView = window.innerWidth <= 640;

function scrollToOrigin() {
    const isMobileView = window.innerWidth <= 640;
    const backBackground = document.getElementById("back");

    // Only execute when transitioning from mobile to desktop
    if (wasMobileView && !isMobileView && contentWrapper) {
        contentWrapper.scrollTo({
            left: 0,
            behavior: 'auto'
        });

        // Hide modal when going from mobile to desktop
        backBackground?.click();
    }

    // Hide modal when going from desktop to mobile
    if (!wasMobileView && isMobileView)
    {
        backBackground?.click();
    }

    wasMobileView = isMobileView;
}

async function init()
{
    // Fun Raiser // Soiree // FairFlyer // Mimosa  // Matinee
    const FunRaiser = "RnVuX1JhaXNlcg==" // FUN RAISER, REPLACE WITH LATTER ON RELEASE
    const Soiree = "U29pcmVl", FairFlyer = "RmFpckZseWVy", Mimosa = "TWltb3Nh", Matinee = "TWF0aW5lZQ==";

    // Clean up any existing initialization first
    if (window.__mascotCleanup) {
        window.__mascotCleanup();
    }

    // Get Mare Bartender click
    const bartender = document.getElementById("Mare-Bartender") as HTMLElement;
    if(bartender)
    {
        bartender.addEventListener("click", function (e) {
            trackBoop(5);
        });
    }

    const noJSElements = document.querySelectorAll<HTMLElement>('.noJS');
    noJSElements.forEach(element => element.remove());

    window.addEventListener('resize', scrollToOrigin);

    const backBackground = document.getElementById("back") as HTMLElement;
    const contentWrapper = document.getElementById("content-wrapper") as HTMLElement;
    const backButtonModals = document.querySelectorAll(".back-button");
    const backButton = [backBackground, ...backButtonModals];
    const modals = document.querySelectorAll(".modal");

    // Modal on mobile needs a little switcharoo to function properly
    let modalMobile = Array.from(document.querySelectorAll(".modal-mobile"));
    if (modalMobile.length >= 5) {
        const itemMobile = modalMobile[2];
        modalMobile[2] = modalMobile[3];
        modalMobile[3] = modalMobile[4];
        modalMobile[4] = itemMobile;
    }

    // Matinee, FairFlyer, Mimosa, Soiree, Fun Raiser
    const MascotDir = 'https://fair-filer.marefair.org/2025/mascot/';
    const Anims = {
        "Boop": [`${base64Decoder(Soiree)}_Boop`,`${base64Decoder(FairFlyer)}_Boop`,`${base64Decoder(Mimosa)}_Boop`,`${base64Decoder(Matinee)}_Boop`,`${base64Decoder(FunRaiser)}_Boop`],
        "Idle": [`${base64Decoder(Soiree)}_Idle`,`${base64Decoder(FairFlyer)}_Idle`,`${base64Decoder(Mimosa)}_Idle`,`${base64Decoder(Matinee)}_Idle`,`${base64Decoder(FunRaiser)}_Idle`],
        "Idle_Selected": [`${base64Decoder(Soiree)}_IdleSelected`,`${base64Decoder(FairFlyer)}_IdleSelected`,`${base64Decoder(Mimosa)}_IdleSelected`,`${base64Decoder(Matinee)}_IdleSelected`,`${base64Decoder(FunRaiser)}_IdleSelected`],
        "Back": [`${base64Decoder(Soiree)}_ShiftBack`,`${base64Decoder(FairFlyer)}_ShiftBack`,`${base64Decoder(Mimosa)}_ShiftBack`,`${base64Decoder(Matinee)}_ShiftBack`,`${base64Decoder(FunRaiser)}_ShiftBack`],
        "To": [`${base64Decoder(Soiree)}_ShiftTo`,`${base64Decoder(FairFlyer)}_ShiftTo`,`${base64Decoder(Mimosa)}_ShiftTo`,`${base64Decoder(Matinee)}_ShiftTo`,`${base64Decoder(FunRaiser)}_ShiftTo`]
    }

    // Preload videos
    // Check if we're on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const suffix = (isIOS || isSafari) ? ".mov" : ".webm";

    if (!isIOS) {
        await Promise.all(Object.values(Anims).flat().map(src => preloadVideo(`${MascotDir}${src}${suffix}`)));
        await preloadAudio("/mascots/Squee.ogg");
    }

    let isSelected = false;
    let currentPair: VideoPair | null = null;

    function removeEventListener() // Remove the specific stored event listener if it exists
    {
        if (currentPair)
            {
                if (currentPair.currentEndedHandler) {
                    currentPair.activeVideo.removeEventListener("ended", currentPair.currentEndedHandler);
                    currentPair.inactiveVideo.removeEventListener("ended", currentPair.currentEndedHandler);
                    currentPair.currentEndedHandler = undefined;
                }
            }
    }

    // Create video pairs
    const videoPairs: VideoPair[] = Array.from({ length: mascotCount }, (_, i) => ({
        activeVideo: document.getElementById(`vid${i + 1}A`) as HTMLVideoElement,
        inactiveVideo: document.getElementById(`vid${i + 1}B`) as HTMLVideoElement
    }));

    videoPairs.forEach((pair, index) => {
        // Dynamically set the video source at first launch
        const idleAnim = `${MascotDir}${Anims["Idle"][index]}${suffix}`;
        const boopAnim = `${MascotDir}${Anims["Boop"][index]}${suffix}`;
        const IdleSelectedAnim = `${MascotDir}${Anims["Idle_Selected"][index]}${suffix}`;

        if (isIOS) {
            pair.activeVideo.setAttribute('type', 'video/mp4;codecs=hvc1');
            pair.inactiveVideo.setAttribute('type', 'video/mp4;codecs=hvc1');
        }

        // Chrome-only vanguard
        if (!pair.activeVideo.src.endsWith(idleAnim))
            pair.activeVideo.src = idleAnim;
        if (!pair.inactiveVideo.src.endsWith(idleAnim))
            pair.inactiveVideo.src = idleAnim;

        const selector: HTMLElement | null = pair.activeVideo.parentElement!.querySelector('.characterSelector');

        // Click handler
        if(selector)
        {
            const container = pair.activeVideo.parentElement!;
            selector.addEventListener("click", async () => {
                if (isSelected)
                {
                    await switchVideos(pair, boopAnim, false);
                    playAudio("/mascots/Squee.ogg");

                    // Track the boop
                    /* // Yay the con is over, no more boop tracking! ~ Hoover
                    switch(index) {  // SO FF MM MA FR
                        case 0:
                            await trackBoop(4);
                            break;
                        case 1:
                            await trackBoop(1);
                            break;
                        case 2:
                            await trackBoop(2);
                            break;
                        case 3:
                            await trackBoop(3);
                            break;
                        case 4:
                            await trackBoop(5);
                            break;
                        default: //eventually...
                          //await trackBoop(4);
                    }
                    */

                    // Store the handler function
                    pair.currentEndedHandler = async () => {
                        await switchVideos(pair, IdleSelectedAnim, true);
                    };
                    pair.activeVideo.addEventListener("ended", pair.currentEndedHandler, { once: true });
                    return;
                }
                else {
                    // Remove the specific stored event listener if it exists
                    removeEventListener();

                    const toAnim = `${MascotDir}${Anims["To"][index]}${suffix}`;
                    await switchVideos(pair, toAnim, false);

                    // Store the handler function
                    pair.currentEndedHandler = async () => {
                        await switchVideos(pair, IdleSelectedAnim, true);
                    };
                    pair.activeVideo.addEventListener("ended", pair.currentEndedHandler, { once: true });
                    isSelected = true;
                    currentPair = pair;

                    let modal: HTMLElement;

                    backBackground.classList.add("back-show");
                    if(window.innerWidth < 640)
                    {
                        // Smooth scroll to the clicked container
                        // Chrome has a problem with this wher it's instantaneus
                        container.scrollIntoView({
                            behavior: "smooth",
                            block: 'nearest',
                            inline: "center"
                        });
                        modal = modalMobile[index] as HTMLElement;
                        // Shifting things around

                        modal.classList.add("modal-mobile-show");
                        container.style.transform = `translateY(-83%)`;
                    }
                    else
                    {
                        modal = modals[index] as HTMLElement;
                        if(index !== 4)
                            container.style.transform = `translateX(calc(${(((4 - (index + 1))) * 100) - 15}%)) translateY(-25%)`;
                        else
                            container.style.transform = `translateX(130%) translateY(-25%)`;
                    }

                    setTimeout(() => {
                        const scrollBarHeight = contentWrapper.offsetHeight - contentWrapper.clientHeight;
                        contentWrapper.classList.add("stop-scrolling"); // prevent users from scrolling while modal is open
                        contentWrapper.style.paddingBottom = `${scrollBarHeight}px`;
                    }, 500);

                    modal.classList.add("modal-show");
                    container.style.zIndex = "10";

                    container.classList.add("highlighted");
                }
            });
        }
    });

    // Modal close handlers
    backButton.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            isSelected = false;

            // Remove modal-show from all modals
            modalMobile.forEach((modal) => {
                modal.classList.remove("modal-show");
                modal.classList.remove("modal-mobile-show");
            });
            modals.forEach((modal) => {
                modal.classList.remove("modal-show");
            });

            contentWrapper.classList.remove("stop-scrolling");
            contentWrapper.style.paddingBottom = '';

            // Remove back-show from background
            backBackground.classList.remove("back-show");

            // Reset all video containers
            videoPairs.forEach((pair, index) => {
                const parentElem = pair.activeVideo.parentElement as HTMLElement
                if (index !== 4)
                {
                    parentElem!.style.transform = "translateX(0) translateY(0)";
                    parentElem!.style.zIndex = "1";
                }
                else
                {
                    parentElem!.style.transform = "translateX(0) translateY(-10%)";
                    parentElem!.style.zIndex = "0";
                }
                setTimeout(() => {
                    parentElem!.classList.remove("highlighted");
                }, 500);
            });

            if (currentPair)
            {
                // Find the index of the current pair
                const currentIndex = videoPairs.indexOf(currentPair);

                // Remove the specific stored event listener if it exists
                removeEventListener();

                // Immediately switch to shift-back animation using the correct index
                const backAnim = `${MascotDir}${Anims["Back"][currentIndex]}${suffix}`;
                await switchVideos(currentPair, backAnim, false);

                currentPair.currentEndedHandler = async () => {
                    if (currentPair) {
                        const idleAnim = `${MascotDir}${Anims["Idle"][currentIndex]}${suffix}`;
                        await switchVideos(currentPair, idleAnim, true);
                    }
                };
                currentPair.activeVideo.addEventListener("ended", currentPair.currentEndedHandler, { once: true });
            }
        });
    });

    window.__mascotCleanup = () => {
        // Clone and replace to remove event listeners
        backButton.forEach((btn) => {
            btn.replaceWith(btn.cloneNode(true));
        });

        videoPairs.forEach((pair) => {
            pair.activeVideo.replaceWith(pair.activeVideo.cloneNode(true));
            pair.inactiveVideo.replaceWith(pair.inactiveVideo.cloneNode(true));
        });

        window.removeEventListener('resize', scrollToOrigin);

        window.__mascotInitialized = false;
    };

    window.__mascotInitialized = true;
}

declare global {
    interface Window {
        __mascotInitialized: boolean;
        __mascotCleanup?: () => void;
    }
}

export async function setupMascot(count: number)
{
    //console.log("SETTING UP");
    document.addEventListener('astro:page-load', () => {
        //console.log("page-load fired");
        mascotCount = count;
        init();
    });

    // Clean up before view transitions
    document.addEventListener('astro:before-swap', () => {
        if (window.__mascotCleanup) {
            window.__mascotCleanup();
        }
    });
}