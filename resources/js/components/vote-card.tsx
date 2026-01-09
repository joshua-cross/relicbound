import { Direction } from '@/components/vote-card-stack';
import { clsx } from 'clsx';
import { useCallback, useMemo, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Card from './ui/card';

type Transform = {
    x: number;
    y: number;
    rot: number;
    scale: number;
    transition: string;
};

interface Props {
    relicEffect: RelicEffect;
    handleSwipe: (direction: Direction) => void;
    idx: number;
}

// I don't foresee these changing at all
const maxRotation = 3;
const maxTranslateX = 165;
const maxTranslateY = 50;
const touchScale = 1.07;
const allowedSwipeDirections = ['left', 'right'];
const fadeOutDuration = 200; // animation duration before next card in stack is shown..

export default function VoteCard({
    relicEffect: { name, details },
    handleSwipe,
    idx,
}: Props) {
    const [transform, setTransform] = useState<Transform>({
        x: 0,
        y: 0,
        rot: 0,
        scale: 1,
        transition: 'transform 350ms cubic-bezier(0.22,0.8,0.36,1)',
    });
    const [swipeHandled, setSwipeHandled] = useState(false);

    const active = useMemo(() => idx === 0, [idx]);

    const onHandleSwipe = useCallback(
        (direction: Direction) => {
            if (!swipeHandled) {
                setSwipeHandled(true);

                setTimeout(() => {
                    handleSwipe(direction);
                }, fadeOutDuration);
            }
        },
        [handleSwipe, swipeHandled],
    );

    const handlers = useSwipeable({
        onTouchStartOrOnMouseDown: () => {
            if (!swipeHandled && active) {
                setTransform((prev) => ({
                    ...prev,
                    scale: touchScale,
                    transition: '',
                }));
            }
        },
        onSwiping: ({ deltaY, deltaX, dir: initialDir }) => {
            if (swipeHandled || !active) return; // can only swipe once per card..
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
                        transition: exceedsThreshold
                            ? 'transform 300ms ease-out'
                            : prev.transition,
                    }) as Transform,
            );

            // if raw delta exceeds threshold, trigger handler once
            if (exceedsThreshold && allowedSwipeDirections.includes(dir)) {
                onHandleSwipe(dir as Direction);
            }
        },
        onSwiped: () => {
            if (swipeHandled) return;
            // animate back if threshold not reached
            setTransform({
                x: 0,
                y: 0,
                rot: 0,
                scale: 1.0,
                transition: 'transform 300ms cubic-bezier(0.22,0.8,0.36,1)',
            } as Transform);
        },
        trackTouch: true,
        trackMouse: true,
    });

    const transformStyle = useMemo(() => {
        const { x, y, rot, scale, transition } = transform;
        return {
            transform: active
                ? `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${scale})`
                : `translate3d(0px, ${-350 * idx}px, 0) rotate(0deg) scaleX(${1 - idx / 10})`,
            transition: `${transition}, 200ms linear opacity`,
            willChange: 'transform',
            zIndex: active ? 10 : 10 - idx,
        };
    }, [transform]);

    const wrapperClasses = useMemo(
        () =>
            clsx([
                'w-full',
                'max-w-120',
                'position-relative',
                swipeHandled && 'opacity-0',
                swipeHandled && 'transition-opacity',
                swipeHandled && `duration-${fadeOutDuration}`,
                active && 'cursor-grab',
                active && 'active:cursor-grabbing',
                active && 'z-10',
            ]),
        [swipeHandled],
    );

    return (
        <div {...handlers} style={transformStyle} className={wrapperClasses}>
            <Card>
                {active && (
                    <>
                        <h1 className={'select-none'}>{name}</h1>
                        <p className={'select-none'}>{details}</p>
                    </>
                )}
            </Card>
        </div>
    );
}
