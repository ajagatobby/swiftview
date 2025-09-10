interface VideoPlayerProps {
  url: string;
  videoId: string;
  autoPlay: boolean;
}

interface PauseProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  color?: string;
}

interface PlayProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  color?: string;
}

interface ScreenShot {
  title: string;
  image: string;
  link: string;
  appName: string;
  videoUrl: string;
  isPro?: boolean;
}

interface SectionProps {
  sectionTitle: string;
  screenShots: ScreenShot[];
  rowLg?: number;
  rowMd?: number;
  rowSm?: number;
  className?: string;
  largeCard?: boolean;
}
