import { IPosition } from "../Components/SongCard";
import { DocumentUtils } from "../Utils/DocumentUtils";

export class Animations {
  static songCardPlayer({ x, y }: IPosition) {
    const songSelector = `.song-card-${x}-${y}`;
    const songCardDiv = window.document.querySelector(songSelector);
    songCardDiv?.addEventListener("mouseover", () => {
      const playerDiv = window.document.querySelector(`.player-div-${x}-${y}`);
      if (playerDiv) {
        DocumentUtils.removeClass(playerDiv, "opacity-0");
        DocumentUtils.removeClass(playerDiv, "-translate-y-0");
        DocumentUtils.addClass(playerDiv, "opacity-100");
        DocumentUtils.addClass(playerDiv, "-translate-y-2");
      }
    });

    songCardDiv?.addEventListener("mouseleave", () => {
      const playerDiv = window.document.querySelector(`.player-div-${x}-${y}`);
      if (playerDiv) {
        DocumentUtils.addClass(playerDiv, "-translate-y-0");
        DocumentUtils.addClass(playerDiv, "opacity-0");
        DocumentUtils.removeClass(playerDiv, "opacity-100");
        DocumentUtils.removeClass(playerDiv, "-translate-y-2");
      }
    });
  }

  static turnCardInvisible({ x, y }: IPosition) {
    window.addEventListener("resize", () => {
      const card = document.querySelector(`.song-card-${x}-${y}`);
      if (card) {
        const cardXPosition = card.getBoundingClientRect().x;
        if (window.innerWidth - 192 < cardXPosition) {
          DocumentUtils.addClass(card, "invisible");
        } else {
          DocumentUtils.removeClass(card, "invisible");
        }
      }
    });
  }
}
