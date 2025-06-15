interface VideoPlayerProps {
  url: string;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
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
}

interface SectionProps {
  sectionTitle: string;
  screenShots: ScreenShot[];
}
