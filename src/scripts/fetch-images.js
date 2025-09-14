// scripts/fetch-images.js
import fs from 'fs';
import fetch from 'node-fetch';

const imageList = [
  // Main knicknack
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/FairFlyerPin.png',
    path: './src/assets/gallery/FairFlyerPin.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/Illustration55.png',
    path: './src/assets/gallery/SoireeStare.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/Mare_Fair_Cereal.webp',
    path: './src/assets/gallery/Mare_Fair_Cereal.webp',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/MatineePin.png',
    path: './src/assets/gallery/MatineePin.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/MatineeTakeThis.png',
    path: './src/assets/gallery/MatineeTakeThis.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/MorningMimosaPin.png',
    path: './src/assets/gallery/MorningMimosaPin.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/NahIdWinMimosa.png',
    path: './src/assets/gallery/NahIdWinMimosa.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/SoireePin.png',
    path: './src/assets/gallery/SoireePin.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/SquatDyxOnPaper.png',
    path: './src/assets/gallery/SquatDyxOnPaper.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/SquatNyxOnPaper.png',
    path: './src/assets/gallery/SquatNyxOnPaper.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/Swirly_Mimosa.png',
    path: './src/assets/gallery/Swirly_Mimosa.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/addicted_to_mares.png',
    path: './src/assets/gallery/addicted_to_mares.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/board extras.png',
    path: './src/assets/gallery/board_extras.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/fair_pinn.webp',
    path: './src/assets/gallery/fair_pinn.webp',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/hello_my_name_is-_sticker.png',
    path: './src/assets/gallery/hello_my_name_is-_sticker.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/milkmare_note.png',
    path: './src/assets/gallery/milkmare_note.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/main/sunbeam_filly_anon.png',
    path: './src/assets/gallery/sunbeam_filly_anon.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/schedules/schedule.png',
    path: './src/assets/schedules/schedule.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/schedules/schedule_ring.png',
    path: './src/assets/schedules/schedule_ring.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/map-venue/map.png',
    path: './src/assets/map-venue/map.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/vendors/YardSard.png',
    path: './src/assets/vendors/YardSard.png',
  },
  // Scrapbook (formerly gallery)
  {
    url: 'https://fair-filer.marefair.org/2025/mascot/dialog_fr.png',
    path: './src/assets/mascots/dialog_fr.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/mascot/dialog_mobile_fr.png',
    path: './src/assets/mascots/dialog_mobile_fr.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/Mascot_BG_full.png',
    path: './src/assets/gallery/Mascot_BG.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/scrapbook_complete.png',
    path: './src/assets/gallery/scrapbook.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/BabsConMF3-2025-PartyWIP6FinalReview.png',
    path: './src/assets/gallery/BABSbanner.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/Matinee_poster.png',
    path: './src/assets/gallery/Matinee_poster.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/Mimosa_poster.png',
    path: './src/assets/gallery/Mimosa_poster.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/Soiree_poster.png',
    path: './src/assets/gallery/Soiree_poster.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/FairFlyer_poster.png',
    path: './src/assets/gallery/FairFlyer_poster.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/EmbedImage.png',
    path: './src/assets/gallery/EmbedImage.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/MusicianApp.png',
    path: './src/assets/gallery/MusicianApp.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/MimosaMug.png',
    path: './src/assets/gallery/MimosaMug.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/RIPMLP1.png',
    path: './src/assets/gallery/RIPMLP1.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/RIPMLP2.png',
    path: './src/assets/gallery/RIPMLP2.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/MareFair3BannerFinalReview2.png',
    path: './src/assets/gallery/MareFairBanner1.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/SiteImage_graffiti_red.png',
    path: './src/assets/gallery/MareFairBanner2.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/news/spaghetti-and-tendie-dinner.png',
    path: './src/assets/gallery/spaghetti-and-tendie-dinner.png',
  },
  // Events
  {
    url: 'https://fair-filer.marefair.org/2025/events/auction_desktop.png',
    path: './src/assets/events/new/auction_desktop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/events/cruise_desktop.png',
    path: './src/assets/events/new/cruise_desktop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/events/maregallery_desktop.png',
    path: './src/assets/events/new/maregallery_desktop.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/events/tendie_desktop.png',
    path: './src/assets/events/new/tendies.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/events/cinema_brochure.png',
    path: './src/assets/events/new/cinema_brochure.png',
  },

  {
    url: 'https://fair-filer.marefair.org/2025/events/maregallery_desktop_NT.png',
    path: './src/assets/events/new/gallery.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/events/auction_desktop_NT1.png',
    path: './src/assets/events/new/auction.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/events/cruise_desktop_NT.png',
    path: './src/assets/events/new/cruise.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/events/maregallery_mobile_NT.png',
    path: './src/assets/events/new/gallery-mobile.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/events/cruise_mobile_NT1.png',
    path: './src/assets/events/new/cruise-mobile.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/events/tendie_mobile.png',
    path: './src/assets/events/new/tendies-mobile.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/events/auction_mobile_NT1.png',
    path: './src/assets/events/new/aunction-mobile.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/events/cinema_brochure_NT1.png',
    path: './src/assets/events/new/cinema.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/events/cinema_mobile_NT.png',
    path: './src/assets/events/new/cinema-mobile.png',
  },
    {
  url: 'https://fair-filer.marefair.org/2025/events/cinema_brochure_quote_edit.png',
    path: './src/assets/events/brochure_cinemare.png',
    isReplace: true,
  },
  {
    url: 'https://fair-filer.marefair.org/2025/events/cruise_brochure_quote_edit.png',
    path: './src/assets/events/brochure_cruise.png',
    isReplace: true,
  },
  {
    url: 'https://fair-filer.marefair.org/2025/events/Cosplay_contest.png',
    path: './src/assets/events/cosplay_contest.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/events/Cosplay_contest_mobile.png',
    path: './src/assets/events/cosplay_contest_mobile.png',
  },

  // Credits
  {
    url: 'https://fair-filer.marefair.org/2025/credits/top.png',
    path: './src/assets/credits/top.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/credits/bottom.png',
    path: './src/assets/credits/bottom.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/mascot/dialog_ma.png',
    path: './src/assets/mascots/dialog_ma.png',
    isReplace: true,
  },
  {
    url: 'https://fair-filer.marefair.org/2025/mascot/dialog_so.png',
    path: './src/assets/mascots/dialog_so.png',
    isReplace: true,
  },
  {
    url: 'https://fair-filer.marefair.org/2025/mascot/dialog_mobile_so.png',
    path: './src/assets/mascots/dialog_mobile_so.png',
    isReplace: true,
  },
  {
    url: 'https://fair-filer.marefair.org/2025/mascot/dialog_mobile_ma.png',
    path: './src/assets/mascots/dialog_mobile_ma.png',
    isReplace: true,
  },

  // Vendors
  {
    url: 'https://fair-filer.marefair.org/2025/vendors/vendor_hall_test.png',
    path: './src/assets/vendors/map1.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/vendors/vendor-ad.png',
    path: './src/assets/vendors/vendor-ad.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/vendors/matinee_neon.png',
    path: './src/assets/vendors/matinee_neon.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/vendors/soiree_neon.png',
    path: './src/assets/vendors/soiree_neon.png',
  },

  // Schedule
  {
    url: 'https://fair-filer.marefair.org/2025/contact/scheduling.png',
    path: './src/assets/contact/scheduling.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/contact/scheduling_pull.png',
    path: './src/assets/contact/scheduling_pull.png',
  },
  // Schedules
  {
    url: 'https://fair-filer.marefair.org/2025/schedules/RatingsVectorsExp.png',
    path: './src/assets/schedules/RatingsVectorsExp.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/schedules/RatingsVectorsQuestionable.png',
    path: './src/assets/schedules/RatingsVectorsQuestionable.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/schedules/RatingsVectorsSafe.png',
    path: './src/assets/schedules/RatingsVectorsSafe.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/schedules/RatingsVectorsSuggestive.png',
    path: './src/assets/schedules/RatingsVectorsSuggestive.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/schedules/RatingsVectorUnrated.png',
    path: './src/assets/schedules/RatingsVectorsUnrated.png',
  },
  // add more here if needed

  // Musicians
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/cassettes/trotmare.png',
    path: './src/assets/musicians/trotmare.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/punkmusicians.png',
    path: './src/assets/musicians/header.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/MimosaGuitar.png',
    path: './src/assets/musicians/guitar.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/MimosaGuitar_SilhouetteC.png',
    path: './src/assets/musicians/guitarSilhouette.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/MusiciansPage_Mimosa_Head.png',
    path: './src/assets/musicians/MusiciansPage_Mimosa_Head.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/MusiciansPage_Mimosa_hoof.png',
    path: './src/assets/musicians/MusiciansPage_Mimosa_hoof.png',
  },

  {
    url: 'https://fair-filer.marefair.org/2025/musicians/cassettes/cantersoft.png',
    path: './src/assets/musicians/CantersoftClosed.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/cassettes/canto.png',
    path: './src/assets/musicians/CantoAcrylicClosed.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/cassettes/cindykate.png',
    path: './src/assets/musicians/CindyKateClosed.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/cassettes/djweiner.png',
    path: './src/assets/musicians/DJWeinerSchnitzelClosed.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/cassettes/eksp.png',
    path: './src/assets/musicians/ElectroKaplosionClosed.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/cassettes/horseheresy.png',
    path: './src/assets/musicians/HorseHeresyClosed.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/cassettes/mcmlog.png',
    path: './src/assets/musicians/MCMIAGClosed.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/cassettes/manehattan.png',
    path: './src/assets/musicians/ManehattanJazzQuartet.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/cassettes/shuffleflo.png',
    path: './src/assets/musicians/ShuffleFl0Closed.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/cassettes/soundbandit.png',
    path: './src/assets/musicians/SoundBanditClosed.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/cassettes/spinscissor.png',
    path: './src/assets/musicians/SpinscissorClose.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/cassettes/totalspark.png',
    path: './src/assets/musicians/TotalsparkClosed.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/cassettes/trey.png',
    path: './src/assets/musicians/TreyHuskClosed.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/musicians/cassettes/dmc.png',
    path: './src/assets/musicians/PrincessChrysalis.png',
  },

  // MISCELLANEOUS
  {
    url: 'https://fair-filer.marefair.org/2025/misc/textured-paper.png',
    path: './src/assets/misc/textured-paper.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/misc/Tendie_asset.png',
    path: './src/assets/misc/TendieFrenzy.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/misc/balloon.png',
    path: './src/assets/misc/balloon.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/scrapbook/backgroundMF.png',
    path: './src/assets/misc/backgroundMF.png',
  },

  // MAPS
  {
    url: 'https://fair-filer.marefair.org/2025/maps/Map_2nd.png',
    path: './src/assets/map/Map_2nd.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/maps/Map_Ground.png',
    path: './src/assets/map/Map_Ground.png',
  },
  {
    url: 'https://fair-filer.marefair.org/2025/maps/fold_line.png',
    path: './src/assets/map/fold_line.png',
  },

  {
    url: 'https://fair-filer.marefair.org/2025/conbook/cover.png',
    path: './src/assets/conbook/cover.png',
  },

  // COMICS
  {
    url: 'https://fair-filer.marefair.org/2025/comics/Mare_Fair_3_Farewell_Comic_Black_Borders.png',
    path: './src/assets/comics/comics.png',
  },
];

const vendorDir = './src/assets/vendors/';
const vendorIcons = [
    {
        url: "https://a.deviantart.net/avatars-big/q/t/qtpony.jpg?14",
        path: vendorDir + 'qtPony.png',
    },
    {
        url: 'https://i.etsystatic.com/10530958/r/isla/52c39b/66916442/isla_200x200.66916442_cnh2ktbh.jpg',
        path: vendorDir + 'earthponycreation.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/Outlaw%20Works.jpg',
        path: vendorDir + 'Outlaw_Works.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/Saphywithbuns_cleaner.png',
        path: vendorDir + 'Saphy_Moon.png',
    },
    {
        url: 'https://i.etsystatic.com/17530418/r/isla/3b647f/43034214/isla_200x200.43034214_dh25rb44.jpg',
        path: vendorDir + 'Taurson.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/Why_Square.png',
        path: vendorDir + 'StudioWhy.png',
    },
    {
        url: 'https://a.deviantart.net/avatars-big/a/z/azgchip.png?15',
        path: vendorDir + 'AZGchip.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/Bluefast_icon.png',
        path: vendorDir + 'Bluefast.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/thefungeon_icon.png',
        path: vendorDir + 'Fungeon.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/overthelulamooncrafts_icon.png',
        path: vendorDir + 'OverTheLulamoon.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/czubox-logo-1-300x138.png',
        path: vendorDir + 'czubox.png',
    },
    {
        url: 'https://cdn.bsky.app/img/avatar/plain/did:plc:lotkmi2rtorsux22a6ptaxdy/bafkreigjt6oshoxei3w6awzyl754lm7zup7xa2dkh4hoftge53cosiscdm@jpeg',
        path: vendorDir + 'Gifter.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/Twoshoesmcgee_icon.png',
        path: vendorDir + 'Twoshoesmcgee.png',
    },
    {
        url: 'https://cdn.ko-fi.com/cdn/useruploads/f3a9bf29-6d1b-4426-946d-54b0a11e4d53.png',
        path: vendorDir + 'Floral.png',
    },
    {
        url: 'https://derpicdn.net/avatars/2019/7/12/1940549575539575536071528647029384935840.jpg',
        path: vendorDir + 'Twipie.png',
    },
    {
        url: 'https://static.wixstatic.com/media/e3c381_9e7bb050843c469f9b52b5d702ea9bff~mv2.png/v1/fill/w_224,h_148,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/fannytastical%20logo%20trans%20with%20stroke.png',
        path: vendorDir + 'fannytastical.png',
    },
    {
        url: 'https://fallenoak.org/_astro/logo.De2q6rki_27ML4n.avif',
        path: vendorDir + 'fallenoaks.avif',
    },
    {
        url: 'https://pbs.twimg.com/profile_images/1608691355903234049/zbWyUSzd_400x400.jpg',
        path: vendorDir + 'Sigil.png',
    },
    {
        url: 'https://pbs.twimg.com/profile_images/1628868069970804738/Ewm_ODPH_400x400.jpg',
        path: vendorDir + 'zizzy.png',
    },
    {
        url: 'https://rocketlawnchart.wordpress.com/wp-content/uploads/2022/09/pfp-1.png',
        path: vendorDir + 'rocket.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/poxy_icon.png',
        path: vendorDir + 'poxyboxy.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/Dandy_Icon.png',
        path: vendorDir + 'Dandy.png',
    },
    {
        url: 'https://sekuponi.carrd.co/assets/images/image02.png?v=f44f7594',
        path: vendorDir + 'Seku.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/lenny_icon.jpg',
        path: vendorDir + 'Metal.png',
    },
    {
        url: 'https://i.etsystatic.com/28599777/r/isla/e39a0e/73759783/isla_200x200.73759783_e4mtlacx.jpg',
        path: vendorDir + 'FAP.png',
    },
    {
        url: 'https://pbs.twimg.com/profile_images/1776276322253197312/GAZJ5lF5_400x400.jpg',
        path: vendorDir + 'Manehattan.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/LytletheLemur_icon.png',
        path: vendorDir + 'Lytle.png',
    },
    {
        url: 'https://pbs.twimg.com/profile_images/1832644926074499072/uWrUJhEy_400x400.jpg',
        path: vendorDir + 'KuriNpony.png',
    },
    {
        url: 'https://pbs.twimg.com/profile_images/1206356087429115906/gBUHEX8c_400x400.jpg',
        path: vendorDir + 'Dakimakura.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/Oxfordinary_Icon.png',
        path: vendorDir + 'Oxfordinary.png',
    },
    {
        url: 'https://64.media.tumblr.com/avatar_3f631848a7f8_96.pnj',
        path: vendorDir + 'fleebites.png',
    },
    {
        url: 'https://pbs.twimg.com/profile_images/1845004620554268674/kx5IteQ-_400x400.jpg',
        path: vendorDir + 'Cora.png',
    },
    {
        url: 'https://64.media.tumblr.com/avatar_3f631848a7f8_96.pnj',
        path: vendorDir + 'effles.png',
    },
    {
        url: 'https://pbs.twimg.com/profile_images/1644550760846307332/RcLvt8FY_400x400.jpg',
        path: vendorDir + 'Nicklusious.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/bonepone_icon.png',
        path: vendorDir + 'bonepone.png',
    },
    {
        url: 'https://pbs.twimg.com/profile_images/1693663449836929037/wm_gIcGW_400x400.jpg',
        path: vendorDir + 'Ande.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/angel_icon.jpg',
        path: vendorDir + 'Angel.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/bcs_icon.jpg',
        path: vendorDir + 'ButtercupSaiyan.png',
    },
    {
        url: 'https://i.etsystatic.com/59018911/c/2066/2066/366/266/isla/cfe57b/76540076/isla_200x200.76540076_3sf588f0.jpg',
        path: vendorDir + 'DinoHorse.png',
    },
    {
        url: 'https://ugc.production.linktr.ee/aff289bd-c753-4fd8-8440-72d34d995f21_Untitled-Artwork.jpeg?io=true&size=avatar-v3_0',
        path: vendorDir + 'MidnightBerri.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/Oddities%20by%20egg.jpg',
        path: vendorDir + 'Oddities.png',
    },
    {
        url: 'https://ugc.production.linktr.ee/9cfbc321-a1f2-4036-ba20-d14864c1ff04_cofee.jpeg?io=true&size=avatar-v3_0',
        path: vendorDir + 'Ostarbito.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/pixxpal_logo.png',
        path: vendorDir + 'pixxpal.png',
    },
    {
        url: 'https://treebrary.pone.social/accounts/avatars/000/025/499/original/6a148ded5e92cd81.png',
        path: vendorDir + 'Darkdoomer.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/512x512%2BPixel%2BLogo.png',
        path: vendorDir + 'RedPalette.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/Equestrian%20Imports_Icon.png',
        path: vendorDir + 'EquestrianImports.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/RatsNest_ICON.png',
        path: vendorDir + 'RatsNest.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/nicklusions_icon.png',
        path: vendorDir + 'nicklusions.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/pixxpal%2Bbonepone_icon.png',
        path: vendorDir + 'pixxpalbonepone.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/aero_icon.png',
        path: vendorDir + 'aero.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/Equine%20Emporium_ICON.png',
        path: vendorDir + 'EquineEmporium.png',
    },
    {
        url: 'https://fair-filer.marefair.org/2025/vendors/vendor_icon/Equine%20Speakeasy_ICON.png',
        path: vendorDir + 'EquineSpeakeasy.png',
    },
];

async function fetchImages(imageList) {
  for (const { url, path, isReplace } of imageList) {
    if (!fs.existsSync(path) || isReplace)
    {
      if (fs.existsSync(path) && isReplace)
        console.log(`Already exists, will be replaced: ${path}`);

      console.log(`Downloading: ${url}`);
      const res = await fetch(url);
      const buffer = await res.arrayBuffer();
      fs.mkdirSync(path.split('/').slice(0, -1).join('/'), { recursive: true });
      fs.writeFileSync(path, Buffer.from(buffer));
    } else
    {
      console.log(`Already exists: ${path}`);
    }
  }
}

fetchImages(imageList);
fetchImages(vendorIcons);
