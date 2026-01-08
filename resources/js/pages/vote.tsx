import VoteCard from "@/components/vote-card";

interface Props {
    relicEffect: {
        data: RelicEffect
    },
}

export default function vote({
    relicEffect: { data: relicEffect }
}: Props) {
    return (
        <>
            <div className="container">
                <div className="flex justify-center">
                    <VoteCard
                        relicEffect={relicEffect}
                        handleSwipe={() => {
                            // TODO: implement swipe, bring forward next card and move the stack along
                        }}
                    />
                </div>
            </div>
        </>
    )
};
