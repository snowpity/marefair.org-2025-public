declare global {
    interface Window {
        __CutsceneCleanup?: () => void;
    }
}

function cutscenePlayer()
{
    const enterButtons = document.querySelectorAll('.buyButton');
    const introContainer = document.getElementById('introContainer') as HTMLElement;
    const introVideo = document.getElementById('introVideo') as HTMLVideoElement;

    if (!introContainer || !introVideo) return; // Ensure elements exist

    introContainer.style.display = 'none';

    if(introVideo)
    {
        const sourcePath = "/teaser/intro.webm";
        introVideo.src = sourcePath;
        introVideo.load();
    }

    function resetVideo()
    {
        introVideo.currentTime = 0;
        introVideo.pause();
    }

    function handleButtonClick(e: Event) {
        e.preventDefault(); // Explicitly prevent the default action
        introContainer.style.display = 'flex';
        introVideo.muted = false;
        introVideo.play().catch(error => {
            console.error("Error playing:", error);
        });
    }

    function handleVideoEnd() {
        resetVideo();
        window.location.href = 'https://reg.marefair.org/';
    }

    // Attach event listeners
    enterButtons.forEach((button) => {
        button.addEventListener('click', handleButtonClick);
    });
    introVideo.addEventListener('ended', handleVideoEnd);

    // Cleanup function
    window.__CutsceneCleanup = () => {
        resetVideo();
        introContainer.style.display = 'none';

        // Remove event listeners to prevent duplication
        enterButtons.forEach((button) => {
            button.removeEventListener('click', handleButtonClick);
        });
        introVideo.removeEventListener('ended', handleVideoEnd);
    };
}

export async function setupCutscene() {
    document.addEventListener('astro:page-load', () => {
        cutscenePlayer();
    });

    // Clean up before view transitions
    document.addEventListener('astro:before-swap', () => {
        if (window.__CutsceneCleanup) {
            window.__CutsceneCleanup();
        }
    });

    // Reset introContainer when coming back from history navigation
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            const introContainer = document.getElementById('introContainer') as HTMLElement;
            if (introContainer) {
                introContainer.style.display = 'none';
            }
        }
    });
}
