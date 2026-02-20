// Centralized anime image mapping for database entries
import anime1 from "@/assets/anime-1.jpg";
import anime2 from "@/assets/anime-2.jpg";
import anime3 from "@/assets/anime-3.jpg";
import anime4 from "@/assets/anime-4.jpg";
import anime5 from "@/assets/anime-5.jpg";
import anime6 from "@/assets/anime-6.jpg";
import soloLevelingBg from "@/assets/solo-leveling-bg.jpg";
import jujutsuKaisenBg from "@/assets/gojo-satoru-bg.jpg";
import attackOnTitanBg from "@/assets/attack-on-titan-bg.jpg";
import demonSlayerBg from "@/assets/demon-slayer-bg.jpg";
import fireForce from "@/assets/fire-force-bg.jpg";
import myHeroAcademia from "@/assets/my-hero-academia-bg.jpg";
import onePieceBg from "@/assets/one-piece-bg.jpg";
import mushokuTensei from "@/assets/anime-mushoku-tensei.jpg";
import reZero from "@/assets/anime-re-zero.jpg";
import sao from "@/assets/anime-sao.jpg";
import tokyoGhoul from "@/assets/anime-tokyo-ghoul.jpg";
import parasyte from "@/assets/anime-parasyte.jpg";
import yourLieApril from "@/assets/anime-your-lie-april.jpg";
import toradora from "@/assets/anime-toradora.jpg";
import horimiya from "@/assets/anime-horimiya.jpg";
import deathNote from "@/assets/anime-death-note.jpg";
import psychoPass from "@/assets/anime-psycho-pass.jpg";
import gintama from "@/assets/anime-gintama.jpg";
import konosuba from "@/assets/anime-konosuba.jpg";
import hunterXHunter from "@/assets/anime-hunter-x-hunter.jpg";
import madeInAbyss from "@/assets/anime-made-in-abyss.jpg";
import dragonsFlame from "@/assets/anime-dragons-flame.jpg";
import midnightBlade from "@/assets/anime-midnight-blade.jpg";
import spiritMageAcademy from "@/assets/anime-spirit-mage-academy.jpg";
import neonGhostProtocol from "@/assets/anime-neon-ghost-protocol.jpg";
import steelWingZero from "@/assets/anime-steel-wing-zero.jpg";
import summersEnd from "@/assets/anime-summers-end.jpg";

// Map anime IDs to their images
export const animeImageMap: Record<string, string> = {
  // Database anime
  "ab19eaf5-8457-4c5d-8556-4bda30f98e74": soloLevelingBg,
  "33333333-3333-3333-3333-333333333333": jujutsuKaisenBg,
  "11111111-1111-1111-1111-111111111111": onePieceBg,
  "22222222-2222-2222-2222-222222222222": attackOnTitanBg,
  "44444444-4444-4444-4444-444444444444": fireForce,
  "55555555-5555-5555-5555-555555555555": demonSlayerBg,
  "66666666-6666-6666-6666-666666666666": myHeroAcademia,
  // New anime
  "aaaa1111-1111-1111-1111-111111111111": mushokuTensei,
  "aaaa2222-2222-2222-2222-222222222222": reZero,
  "aaaa3333-3333-3333-3333-333333333333": sao,
  "bbbb1111-1111-1111-1111-111111111111": tokyoGhoul,
  "bbbb2222-2222-2222-2222-222222222222": parasyte,
  "cccc1111-1111-1111-1111-111111111111": yourLieApril,
  "cccc2222-2222-2222-2222-222222222222": toradora,
  "cccc3333-3333-3333-3333-333333333333": horimiya,
  "dddd1111-1111-1111-1111-111111111111": deathNote,
  "dddd2222-2222-2222-2222-222222222222": psychoPass,
  "eeee1111-1111-1111-1111-111111111111": gintama,
  "eeee2222-2222-2222-2222-222222222222": konosuba,
  "ffff1111-1111-1111-1111-111111111111": hunterXHunter,
  "ffff2222-2222-2222-2222-222222222222": madeInAbyss,
  // Mock anime
  "1": dragonsFlame,
  "2": midnightBlade,
  "3": spiritMageAcademy,
  "4": neonGhostProtocol,
  "5": steelWingZero,
  "6": summersEnd,
};

export const getAnimeImage = (id: string, thumbnailUrl?: string | null): string => {
  if (thumbnailUrl) return thumbnailUrl;
  return animeImageMap[id] || anime1;
};

export default animeImageMap;
