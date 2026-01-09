import VoteCardStack from '@/components/vote-card-stack';

interface Props {
    data: StackResponse;
}

export default function vote({ data }: Props) {
    return (
        <>
            <VoteCardStack {...data} />
        </>
    );
}
