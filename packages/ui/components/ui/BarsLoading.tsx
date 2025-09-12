import {
    type LucideProps,
} from 'lucide-react';
type SpinnerVariantProps = Omit<SpinnerProps, 'variant'>;

export default function LoadingBars({ size = 24, ...props }: SpinnerVariantProps) {
    return <svg
        height={size}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <title>Loading...</title>
        <style>{`
      .spinner-bar {
        animation: spinner-bars-animation .8s linear infinite;
        animation-delay: -.8s;
      }
      .spinner-bars-2 {
        animation-delay: -.65s;
      }
      .spinner-bars-3 {
        animation-delay: -0.5s;
      }
      @keyframes spinner-bars-animation {
        0% {
          y: 1px;
          height: 22px;
        }
        93.75% {
          y: 5px;
          height: 14px;
          opacity: 0.2;
        }
      }
    `}</style>
        <rect
            className="spinner-bar"
            fill="currentColor"
            height="22"
            width="6"
            x="1"
            y="1"
        />
        <rect
            className="spinner-bar spinner-bars-2"
            fill="currentColor"
            height="22"
            width="6"
            x="9"
            y="1"
        />
        <rect
            className="spinner-bar spinner-bars-3"
            fill="currentColor"
            height="22"
            width="6"
            x="17"
            y="1"
        />
    </svg>
}

export type SpinnerProps = LucideProps & {
    variant?:
    | 'default'
    | 'circle'
    | 'pinwheel'
    | 'circle-filled'
    | 'ellipsis'
    | 'ring'
    | 'bars'
    | 'infinite';
};
