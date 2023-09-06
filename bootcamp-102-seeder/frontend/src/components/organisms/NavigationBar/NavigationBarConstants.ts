import Home from "../../../../public/assets/images/home.svg";
import HomeActive from "../../../../public/assets/images/home-active.svg";
import Coin from "../../../../public/assets/images/coin.svg";
import CoinActive from "../../../../public/assets/images/coin-active.svg";
import Flash from "../../../../public/assets/images/flash.svg";

export const CONSTANTS = {
  title: "Seeder",
  logoAltText: "logo",
  navItemsData: [
    { src: Home, srcActive: HomeActive, alt: "home", text: "Home" },
    { src: Coin, srcActive: CoinActive, alt: "coin", text: "Cash Accleration" },
  ],
  navItemWatch: { src: Flash, alt: "flash", text: "Watch how to" },
};

export interface NavBarProps {
  switchNavTab?: number;
}
