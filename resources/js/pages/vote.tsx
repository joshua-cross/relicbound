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
            <pre>{ JSON.stringify(relicEffect) }</pre>
            <VoteCard relicEffect={relicEffect} />
        </>
    )
};
