import { useMemo, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Card from './ui/card';

type Direction = 'left' | 'right';
type Transform = {
    x: number;
    y: number;
    rot: number;
    scale: number;
};

interface Props {
    relicEffect: RelicEffect;
    handleSwipe: (direction: Direction) => void;
}

// I don't foresee these changing at all
const maxRotation = 3;
const maxTranslateX = 165;
const maxTranslateY = 25;
const touchScale = 1.07;
const allowedSwipeDirections = ['left', 'right'];

export default function VoteCard({
    relicEffect: { name, details },
    handleSwipe,
}: Props) {
    const [transform, setTransform] = useState<Transform>({
        x: 0,
        y: 0,
        rot: 0,
        scale: 1,
    });
    const [transition, setTransition] = useState<string>(
        'transform 350ms cubic-bezier(0.22,0.8,0.36,1)',
    );
    const [swipeHandled, setSwipeHandled] = useState(false);

    const handlers = useSwipeable({
        onTouchStartOrOnMouseDown: () => {
            if (!swipeHandled) {
                setTransition('');
                setTransform((prev) => ({
                    ...prev,
                    scale: touchScale,
                }));
            }
        },
        onSwiping: ({ deltaY, deltaX, dir: initialDir }) => {
            if (swipeHandled) return; // can only swipe once per card..
            const dir = initialDir.toLowerCase();

            // clamp so card follows only up to ±maxTranslate
            const clampedX = Math.max(
                -maxTranslateX,
                Math.min(maxTranslateX, deltaX),
            );
            const clampedY = Math.max(
                -maxTranslateY,
                Math.min(maxTranslateY, deltaY),
            );
            const exceedsThreshold = Math.abs(deltaX) > maxTranslateX;
            setTransform(
                (prev) =>
                    ({
                        x: clampedX,
                        y: clampedY,
                        rot: Math.max(
                            -maxRotation,
                            Math.min(maxRotation, clampedX / 8),
                        ), // rotation logic
                        scale: prev.scale,
                    }) as Transform,
            );

            // if raw delta exceeds threshold, trigger handler once
            if (exceedsThreshold && allowedSwipeDirections.includes(dir)) {
                setSwipeHandled(true);
                setTransition('transform 300ms ease-out');
                handleSwipe(dir as Direction);
            }
        },
        onSwiped: () => {
            if (swipeHandled) return;
            // animate back if threshold not reached
            setTransition('transform 450ms cubic-bezier(0.22,0.8,0.36,1)');
            setTransform({
                x: 0,
                y: 0,
                rot: 0,
                scale: 1.0,
            } as Transform);
        },
        trackTouch: true,
        trackMouse: true,
    });

    const transformStyle = useMemo(() => {
        const { x, y, rot, scale } = transform;
        return {
            transform: `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${scale})`,
            transition,
            willChange: 'transform',
        };
    }, [transform, transition]);

    return (
        <div className="w-full max-w-120">
            <div {...handlers} style={transformStyle}>
                <Card>
                    <h1>{name}</h1>
                    <p>{details}</p>
                </Card>
            </div>
        </div>
    );
}
