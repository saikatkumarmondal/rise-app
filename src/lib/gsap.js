import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap-trial/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollTrigger, SplitText);

export default gsap;