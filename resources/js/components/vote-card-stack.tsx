import { stack } from '@/actions/App/Http/Controllers/RelicEffectController';
import VoteCard from '@/components/vote-card';
import { useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export type Direction = 'left' | 'right';

const stackSize = 3; // The amount of cards to show in a stack.
const initialLoad = 10; // should have loaded at least this many as long as there's enough data

export default function VoteCardStack({ data, next_cursor }: StackResponse) {
    const [currIndex, setCurrIndex] = useState<number>(0);

    const initialiseStack = useCallback(() => {
        return data.slice(0, Math.min(stackSize, data.length));
    }, [data]);

    const initialiseBuffer = useCallback(() => {
        return data.slice(
            Math.min(stackSize, data.length),
            Math.min(initialLoad, data.length),
        );
    }, [data]);

    const [currStack, setCurrStack] = useState<RelicEffect[]>(initialiseStack);
    const [currBuffer, setCurrBuffer] =
        useState<RelicEffect[]>(initialiseBuffer);
    const [currHistory, setCurrHistory] = useState<RelicEffect[]>([]);
    const [currCursor, setCurrCursor] = useState<string>(next_cursor);
    const [currRelicEffects, setCurrRelicEffects] =
        useState<RelicEffect[]>(data);

    const fetchCards = useDebouncedCallback(async () => {
        try {
            const res = await fetch(
                new Request(`${stack().url}?cursor=${currCursor}`, {
                    method: stack().method,
                }),
            );

            if (res.ok) {
                const { data, next_cursor } =
                    (await res.json()) as StackResponse;

                console.log('Setting cursor to: ', next_cursor);

                setCurrCursor(next_cursor);

                // TODO: something with the data here...
                setCurrRelicEffects((prevState) => [...prevState, ...data]);
            }
        } catch (error) {
            console.error('Error fetching new relic effects: ', error);
        }
    }, 1000);

    const handleSwipe = useCallback(
        async (direction: Direction) => {
            fetchCards();
            setCurrHistory((prevState) => [...prevState, currStack[0]]);
            setCurrStack((prevState) => {
                const newStack = prevState.slice(1);

                if (currBuffer.length > 0) {
                    newStack.push(currBuffer[0]);
                }

                console.log({
                    prevState,
                    newStack,
                });

                return newStack;
            });
            setCurrBuffer((prevState) => prevState.slice(1));
        },
        [currBuffer, currStack, fetchCards],
    );

    return (
        <>
            <div className="container">
                <div className="flex flex-col items-center justify-center">
                    {currStack.map((effect, idx) => (
                        <VoteCard
                            key={effect.id}
                            relicEffect={effect}
                            handleSwipe={handleSwipe}
                            idx={idx}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
