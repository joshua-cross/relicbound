import VoteCard from '@/components/vote-card';
import { useCallback, useMemo, useState } from 'react';

interface Props {
    relicEffects: RelicEffect[],
}

export type Direction = "left" | "right";

export default function VoteCardStack({relicEffects}: Props) {
    const [currIndex, setCurrIndex] = useState<number>(0);

    const percentageComplete = useMemo(
        () => (currIndex / relicEffects.length) * 100,
        [relicEffects, currIndex],
    );

    const handleSwipe = useCallback((direction: Direction) => {
        // TODO: implement swipe, bring forward next card and move the stack along
        setCurrIndex((prevState) => Math.min(prevState + 1, relicEffects.length - 1));
    }, [relicEffects]);

    const currentStack = useMemo((): RelicEffect[] => {
        return relicEffects.slice(currIndex, currIndex + 3);
    }, [currIndex, relicEffects]);

    return (
        <>
            <div className="container">
                <div className="flex flex-col items-center justify-center">
                    { currentStack.map((effect) => (
                        <VoteCard
                            key={effect.id}
                            relicEffect={effect}
                            handleSwipe={handleSwipe}
                        />
                    )) }
                </div>
            </div>
        </>
    );
}
