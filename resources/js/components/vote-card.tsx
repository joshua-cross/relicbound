import Card from "./ui/card";

interface Props {
    relicEffect: RelicEffect,
}

export default function VoteCard({ relicEffect: { name, details } }: Props) {


    return (
        <Card>
            <h1>{ name }</h1>
            <p>{ details }</p>
        </Card>
    );
}
