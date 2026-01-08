import VoteCardStack from '@/components/vote-card-stack';

interface Props {
    relicEffects: {
        data: RelicEffect[]
    },
}

export default function vote({
    relicEffects: { data: relicEffects }
}: Props) {
    return (
        <>
            <VoteCardStack relicEffects={relicEffects} />
        </>
    )
};
